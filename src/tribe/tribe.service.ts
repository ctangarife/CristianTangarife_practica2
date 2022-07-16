import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTribeDto } from './dto/create-tribe.dto';
import { UpdateTribeDto } from './dto/update-tribe.dto';
import { TribeEntity } from './entities/tribe.entity';

@Injectable()
export class TribeService {
  constructor(
    @Inject('TRIBE_REPOSITORY') private tribeProvider: Repository<TribeEntity>,
  ) {}
  async create(createTribeDto: CreateTribeDto) {
    const newTribe = this.tribeProvider.create(createTribeDto);
    return this.tribeProvider.save(newTribe);
  }

  async findAll(): Promise<TribeEntity[]> {
    return this.tribeProvider.find({ relations: ['organization'] });
  }

  async findOne(id: number) {
    const tribe = await this.tribeProvider.findOne({
      where: { id: id },
      relations: ['organization'],
    });
    if (!tribe) {
      throw new NotFoundException(`La Tribu no se encuentra registrada`);
    }
    return tribe;
  }

  async update(id: number, updateTribeDto: UpdateTribeDto) {
    const tribe = await this.findOne(id);
    this.tribeProvider.merge(tribe, updateTribeDto);
    return this.tribeProvider.save(tribe);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.tribeProvider.delete(id);
  }
}
