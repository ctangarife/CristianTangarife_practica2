import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { CreateRepositoryDto } from '../../repositories/dto/create-repository.dto';

export class CreateMetricDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  coverage: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  bugs: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  vulnerabilitis: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  hotspot: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  code_smells: number;
  @IsPositive()
  @IsNotEmpty()
  repository: CreateRepositoryDto;
}
