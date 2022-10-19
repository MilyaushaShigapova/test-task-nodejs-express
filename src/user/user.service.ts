import { UserModel } from "./user.model";
import { UsersDto } from "./user.dto";

export class UsersService {
  constructor(private userRepository: typeof UserModel) {}

  public async create(session: string): Promise<void> {
    await this.userRepository.create({
      session,
    });
  }

  public async getOne(session: string): Promise<UsersDto | null> {
    return this.userRepository.findOne({ session });
  }
}

export const userService = new UsersService(UserModel);
