import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as process from 'process';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { CarModule } from './car/car.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { Car } from './car/entities/car.entity';
import { Role } from './role/entities/role.entity';
import { UserRoles } from './role/entities/user-role.entity';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [User, Car, Role, UserRoles],
      // autoLoadModels: true,
    }),
    CarModule,
    RoleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
