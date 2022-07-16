import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Status, State } from '../interface/repositories.interface';
import { CreateTribeDto } from '../../tribe/dto/create-tribe.dto';

export class CreateRepositoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty({ enum: State, default: State.ENABLED })
  state: State;
  @IsString()
  @ApiProperty()
  @ApiProperty({ enum: Status, default: Status.ACTIVE })
  status: Status;
  @IsPositive()
  @IsNotEmpty()
  tribe: CreateTribeDto;
}
