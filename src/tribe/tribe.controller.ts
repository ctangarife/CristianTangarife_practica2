import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  Res,
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

  @Get(':id/repositories')
  findRepositories(@Param('id', ParseIntPipe) id: number) {
    return this.tribeService.findRepositories(id);
  }

  @Get(':id/repositories/csv')
  async findRepositoriesCsv(@Res() res, @Param('id', ParseIntPipe) id: number) {
    res.set('Content-Type', 'text/csv');
    return await this.tribeService
      .findRepositoriesCsv(id)
      .then((resp) => {
        res.set(
          'Content-Disposition',
          `attachment; filename="${resp.name}.csv"`,
        );

        res.send(resp.file);
      })
      .catch((err) => console.error(err, 'Error al generar el archivo'));
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
