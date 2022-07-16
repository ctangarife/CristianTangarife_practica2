import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateMetricDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  coverage: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  bugs: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  vulnerabilitis: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  hotspot: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  code_smells: number;
}
