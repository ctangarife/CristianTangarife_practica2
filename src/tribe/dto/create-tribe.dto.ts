import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTribeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsPositive()
  status: number;
}
