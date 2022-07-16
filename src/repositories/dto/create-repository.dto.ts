import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Status, State } from '../interface/repositories.interface';

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
}
