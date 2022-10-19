export class LinksQueryDto {
  page?: number;
  limit?: number;
}

export class LinksCreateDto {
  link: string;
  linkName?: string;
}

export interface RedisClientLinks {
  linkId: string;
  short: string;
  link: string;
  owner: string;
}
