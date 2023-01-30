import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CarService } from './car.service';
import { CarController } from './car.controller';
import { Car } from './entities/car.entity';

@Module({
  controllers: [CarController],
  providers: [CarService],
  imports: [SequelizeModule.forFeature([Car])],
})
export class CarModule {}
