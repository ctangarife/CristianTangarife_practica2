import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { CreateOrganizationDto } from '../../organizations/dto/create-organization.dto';

export class CreateTribeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  status: number;
  @IsNumber()
  @IsPositive()
  organization: CreateOrganizationDto;
}
