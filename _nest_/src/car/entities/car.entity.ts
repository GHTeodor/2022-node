import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../user/entities/user.entity';

@Table({ tableName: 'cars' })
export class Car extends Model<Car> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Mercedes-Benz', required: true })
  @Column({ type: DataType.STRING, allowNull: false })
  model: string;

  @ApiProperty({ example: 'White', required: true })
  @Column({ type: DataType.STRING, allowNull: false })
  color: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  client: User;
}
