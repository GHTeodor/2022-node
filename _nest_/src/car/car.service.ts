import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarService {
  constructor(@InjectModel(Car) private readonly carRepository: typeof Car) {}

  async create(createCarDto: CreateCarDto) {
    return this.carRepository.create(createCarDto);
  }

  async findAll() {
    return this.carRepository.findAll({});
  }

  async findOne(id: number) {
    return this.carRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const user = await this.findOne(id);
    return await user.update({ ...updateCarDto });
  }

  async remove(id: number) {
    return this.carRepository.destroy({ where: { id } });
  }
}
