import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/user.create.dto";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }

  async createUser(userDto: CreateUserDto) {
    const user = await this.userRepository.save(userDto);
    return user;
  }

  async findAllUsers() {
    return await this.userRepository.find();
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException({message: "Данный пользователь не найден"});
    }
    return user;
  }

  async findUserByEmail(email: string) {
    const user: User = await this.userRepository.findOneBy({ email });
    return user;
  }

}
