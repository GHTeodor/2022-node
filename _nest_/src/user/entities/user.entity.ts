import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Car } from '../../car/entities/car.entity';
import { Role } from '../../role/entities/role.entity';
import { UserRoles } from '../../role/entities/user-role.entity';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Boris', required: false })
  @Column({ type: DataType.STRING, allowNull: true })
  firstName: string;

  @ApiProperty({ example: 'JohnsonUK', required: true })
  @Column({ type: DataType.STRING, allowNull: false })
  surName: string;

  @ApiProperty({ example: 'MALE', required: false })
  @Column({ type: DataType.STRING, allowNull: true })
  gender: string;

  @ApiProperty({
    example: 'boris-johnson@org.uk',
    uniqueItems: true,
    required: true,
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @ApiProperty({ example: 'p@sS_w_0rd', required: true })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    example: Math.ceil(Math.random() * 100) + 16,
    required: false,
  })
  @Column({ type: DataType.INTEGER, allowNull: true })
  age: number;

  @ApiProperty({ example: 'New York City', required: false })
  @Column({ type: DataType.STRING, allowNull: true })
  city: string;

  @ApiProperty({ example: true, required: false })
  @Column({ type: DataType.BOOLEAN, allowNull: true })
  isConfirm: boolean;

  @HasMany(() => Car)
  cars: Car[];

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
