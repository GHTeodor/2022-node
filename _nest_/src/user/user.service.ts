import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.userRepository.create(createUserDto);
      const role = await this.roleService.findOne('CLIENT');
      await createdUser.$set('roles', [role.id]);
      return createdUser;
    } catch (e) {
      throw new BadRequestException({ message: e.message || 'Bad request' });
    }
  }

  async findAll() {
    return this.userRepository.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    return await user.update({ ...updateUserDto });
  }

  async remove(id: number) {
    return await this.userRepository.destroy({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
