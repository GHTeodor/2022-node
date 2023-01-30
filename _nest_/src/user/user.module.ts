import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Car } from '../car/entities/car.entity';
import { Role } from '../role/entities/role.entity';
import { UserRoles } from '../role/entities/user-role.entity';
import { RoleService } from '../role/role.service';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Car, Role, UserRoles]),
    RoleModule,
  ],
  controllers: [UserController],
  providers: [UserService, RoleService],
  exports: [UserService],
})
export class UserModule {}
