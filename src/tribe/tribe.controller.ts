import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { TribeService } from './tribe.service';
import { CreateTribeDto } from './dto/create-tribe.dto';
import { UpdateTribeDto } from './dto/update-tribe.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tribe')
@Controller('tribes')
export class TribeController {
  constructor(private readonly tribeService: TribeService) {}

  @Post()
  create(@Body() createTribeDto: CreateTribeDto) {
    return this.tribeService.create(createTribeDto);
  }

  @Get()
  findAll() {
    return this.tribeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tribeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTribeDto: UpdateTribeDto,
  ) {
    return this.tribeService.update(+id, updateTribeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tribeService.remove(+id);
  }
}
