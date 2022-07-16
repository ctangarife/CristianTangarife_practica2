import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoriesService } from '../repositories/repositories.service';
import { Repository } from 'typeorm';
import { CreateTribeDto } from './dto/create-tribe.dto';
import { UpdateTribeDto } from './dto/update-tribe.dto';
import { TribeEntity } from './entities/tribe.entity';
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { HttpService } from '@nestjs/axios';
import { MetricsService } from '../metrics/metrics.service';

@Injectable()
export class TribeService {
  constructor(
    @Inject('TRIBE_REPOSITORY') private tribeProvider: Repository<TribeEntity>,
    private repositoryService: RepositoriesService,
    private metricsService: MetricsService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private readonly httpService: HttpService,
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
    const verificationState = await this.getUrlData(this.configService.url);
    const repositories = await Promise.all(
      tribe.repositories.map(async (rp) => {
        rp = await this.repositoryService.afterFindOne(rp);
        const metricsData = await this.metricsService.findByRepository(rp.id);
        const statusVerify = await this.getStatus(
          verificationState,
          metricsData.vulnerabilities,
        );
        return {
          id: rp.id, // identificador del repositorio
          name: rp.name, // nombre del repositorio
          tribe: tribe.name, // nombre de la tribu
          organization: tribe.organization.name, // nombre de la organización
          coverage: this.toPercenage(metricsData.coverage), // cobertura de pruebas unitarias
          codeSmells: metricsData.code_smells,
          bugs: metricsData.bugs,
          vulnerabilities: metricsData.vulnerabilities,
          hotspots: metricsData.hotspot,
          verificationState: statusVerify['state'], // Estado de verificación (Mock)
          state: rp.state, // Estado del repositorio (state)
        };
      }),
    );
    return { repositories };
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

  getUrlData(url: string) {
    return this.httpService.axiosRef
      .get(url)
      .then((resp) => resp.data)
      .catch((err) => []);
  }

  async getStatus(arrayState = [], vulnerabilities: number) {
    console.log(arrayState, 'Array State');
    let state = {};
    let item: number;
    if (vulnerabilities > 0) {
      item = arrayState.findIndex((s) => s.state === 605);
    } else if (vulnerabilities > 5) {
      item = arrayState.findIndex((s) => s.state === 606);
    } else {
      item = arrayState.findIndex((s) => s.state === 604);
    }
    state = arrayState[item];

    return state;
  }

  toPercenage(num: number) {
    return `${Math.round(num * 100)}%`;
  }
}
