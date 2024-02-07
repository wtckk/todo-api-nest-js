import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/user.create.dto";
import { UserAddRole } from "./dto/user-add-role.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
  }

  async createUser(userDto: CreateUserDto) {
    const user = this.userRepository.create(userDto);
    await this.userRepository.save(user);
    return user;
  }

  async findAllUsers() {
    return await this.userRepository.find({relations: {tasks: true}});
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOne(
      {where: { id } },
      );
    if (!user) {
      throw new NotFoundException({ message: "Данный пользователь не найден" });
    }
    return user
  }

  async findUserByEmail(email: string) {
    const user: User = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException({ message: "Пользователь не найден" });
    }
    return user
  }

  async getUserByEmail(email: string) {
    const user: User = await this.userRepository.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: email })
      .getOne();
    return user;
  }

  async addRole(dto: UserAddRole) {
    let id: string = dto.userId;
    const userDto = await this.findUserById(id);

    if (!userDto.roles.includes(dto.role)) {
      userDto.roles.push(dto.role);
      await this.userRepository.save(userDto);
    }

    return userDto;
  }
}
