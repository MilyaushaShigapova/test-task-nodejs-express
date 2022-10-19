import ShortUniqueId from "short-unique-id";
import { LinksCreateDto, LinksQueryDto, RedisClientLinks } from "./link.dto";
import { LinksModel } from "./link.model";
import { HttpException } from "../utils/http-exception";
import { redisClient } from "../config/redis.config";
import { Console } from "console";

export class LinksService {
  constructor(
    private linkRepository: typeof LinksModel,
    private redis: typeof redisClient
  ) {}

  public async getAll(query: LinksQueryDto, owner: string) {
    const page = query.page || 1;
    const limit = query.limit || 20;

    const total = await this.linkRepository.find({ owner });
    const totalPage = Math.ceil(total.length / limit);

    const linkQuery = this.linkRepository
      .find({ owner })
      .skip((page < 1 ? 1 : page - 1) * limit)
      .limit(limit < 1 ? 20 : limit);

    const links = await linkQuery;

    const items = links.map((link) => {
      return { ...JSON.parse(JSON.stringify(link)) };
    });

    return {
      paging: {
        totalCount: total.length,
        totalPage,
        page,
        limit,
      },
      items,
    };
  }

  public async create(par: LinksCreateDto, userId: string) {
    const urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

    if (!urlRegex.test(par.link)) {
      throw new HttpException({ message: "Невалидная ссылка" }, 400);
    }
    let uid,
      params = {
        link: par.link,
        short: "",
        owner: userId,
      };
    if (par.linkName && par.linkName != "") {
      const link = await this.linkRepository.findOne({ short: par.linkName });
      if (link) {
        throw new HttpException(
          "Наименование уже существует, введите другое!",
          404
        );
      }
      uid = par.linkName;
      params.short = uid;
    } else {
      uid = new ShortUniqueId({ length: 6 });
      params.short = uid();
    }
    const newLink = new this.linkRepository(params);

    return newLink.save();
  }

  public async getOne(key: string): Promise<string> {
    const link = await this.linkRepository.findOne({ short: key });

    if (!link) {
      throw new HttpException("Ссылка не найдена", 404);
    }

    await this.redis.connect();

    const redisLinks = await this.getLinksFromRedis();

    const params: RedisClientLinks = {
      linkId: link._id.toString(),
      short: link.short,
      link: link.link,
      owner: link?.owner?.toString() || "",
    };

    redisLinks.push(params);

    await this.setLinksToRedis(redisLinks);

    await this.redis.disconnect();

    return link.link;
  }

  private async getLinksFromRedis(): Promise<RedisClientLinks[]> {
    const links = await this.redis.get("links");

    if (links) {
      return JSON.parse(links) as RedisClientLinks[];
    }

    return [] as RedisClientLinks[];
  }

  private async setLinksToRedis(value: RedisClientLinks[]): Promise<void> {
    await this.redis.set("links", JSON.stringify(value));
  }
}

export const linksService = new LinksService(LinksModel, redisClient);
