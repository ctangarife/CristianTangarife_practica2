import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoriesService } from '../repositories/repositories.service';
import { Repository } from 'typeorm';
import { CreateTribeDto } from './dto/create-tribe.dto';
import { UpdateTribeDto } from './dto/update-tribe.dto';
import { TribeEntity } from './entities/tribe.entity';

@Injectable()
export class TribeService {
  constructor(
    @Inject('TRIBE_REPOSITORY') private tribeProvider: Repository<TribeEntity>,
    private repositoryService: RepositoriesService,
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
  async findRepositories(id: number) {
    const tribe = await this.tribeProvider.findOne({
      where: { id: id },
      relations: ['repositories'],
    });
    if (!tribe) {
      throw new NotFoundException(`La Tribu no se encuentra registrada`);
    }
    const repositories = await Promise.all(
      tribe.repositories.map(async (rp) => {
        rp = await this.repositoryService.afterFindOne(rp);
        console.log(rp, 'RP');
        return {
          id: rp.id, // identificador del repositorio
          name: rp.name, // nombre del repositorio
          tribe: tribe.name, // nombre de la tribu
          organization: tribe.organization.name, // nombre de la organización
          coverage: '35%', // cobertura de pruebas unitarias
          codeSmells: 0,
          bugs: 0,
          vulnerabilities: 0,
          hotspots: 0,
          verificationState: 'Verificado', // Estado de verificación (Mock)
          state: rp.state, // Estado del repositorio (state)
        };
      }),
    );
    return repositories;
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
