import { Injectable } from "@nestjs/common";
import { RoleCreateDto } from "./dto/role.create.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./entity/roles.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {
  }

  async createRole(roleDto: RoleCreateDto) {
    const role = this.roleRepository.save(roleDto);
    return role;
  }

  async getRoleByValue(value: string) {
    const role = this.roleRepository.findOneBy({ value });
    return role;
  }
}
