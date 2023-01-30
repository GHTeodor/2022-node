import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { User } from '../user/entities/user.entity';
import { UserRoles } from './entities/user-role.entity';
import { Role } from './entities/role.entity';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles])],
  exports: [RoleService],
})
export class RoleModule {}
