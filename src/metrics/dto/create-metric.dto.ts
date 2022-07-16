import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';
import { CreateRepositoryDto } from '../../repositories/dto/create-repository.dto';

export class CreateMetricDto {
  @IsNumber({ maxDecimalPlaces: 3 })
  @IsNotEmpty()
  @Min(0)
  @ApiProperty()
  coverage: number;
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty()
  bugs: number;
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty()
  vulnerabilitis: number;
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty()
  hotspot: number;
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty()
  code_smells: number;
  @IsPositive()
  @IsNotEmpty()
  repository: CreateRepositoryDto;
}
