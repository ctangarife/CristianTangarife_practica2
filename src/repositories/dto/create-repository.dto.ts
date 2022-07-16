import { IsNotEmpty, IsString } from 'class-validator';
import { Status, State } from '../interface/repositories.interface';

export class CreateRepositoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  state: State;
  @IsString()
  status: Status;
}
