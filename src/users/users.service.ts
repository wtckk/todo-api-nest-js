import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/user.create.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roleService: RolesService
  ) {
  }

  async createUser(userDto: CreateUserDto) {
    const user = this.userRepository.create(userDto);
    const role = await this.roleService.getRoleByValue("USER");
    user.roles = [role];
    await this.userRepository.save(user);
    return user;
  }

  async findAllUsers() {
    return await this.userRepository.find({ relations: ["roles"] });
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ["roles"] });
    if (!user) {
      throw new NotFoundException({ message: "Данный пользователь не найден" });
    }
    return user;
  }

  async findUserByEmail(email: string) {
    const user: User = await this.userRepository.findOne({ where: { email }, relations: ["roles"] });
    if (!user) {
      throw new NotFoundException({ message: "Пользователь не найден" });
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user: User = await this.userRepository.findOne({ where: { email }, relations: ["roles"] });
    return user;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const id: string = addRoleDto.userId
    const user = await this.userRepository.findOne({ where: {id}, relations: ['roles']});
    const role = await this.roleService.getRoleByValue(addRoleDto.value);
    console.log(user)
    if (role && user) {
      user.roles = [...user.roles, role];
      await this.userRepository.save(user);
      return addRoleDto;
    }
    throw new NotFoundException({ message: "Пользователь или роль не найдены" });
  }
}
