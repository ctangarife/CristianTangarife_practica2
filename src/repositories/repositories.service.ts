import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { UpdateRepositoryDto } from './dto/update-repository.dto';
import { RepositoryEntity } from './entities/repository.entity';

@Injectable()
export class RepositoriesService {
  constructor(
    @Inject('REPOSITORY_PROVIDER')
    private repositoryProvided: Repository<RepositoryEntity>,
  ) {}
  async create(createRepositoryDto: CreateRepositoryDto) {
    const newRepository = this.repositoryProvided.create(createRepositoryDto);
    return this.repositoryProvided.save(newRepository);
  }

  async findAll(): Promise<RepositoryEntity[]> {
    return this.repositoryProvided.find({ relations: ['tribe', 'metric'] });
  }

  async findOne(id: number) {
    let repository = await this.repositoryProvided.findOne({
      where: { id: id },
      relations: ['tribe', 'metric'],
    });
    if (!repository) {
      throw new NotFoundException(`Repository #${id} not found`);
    }
    repository = await this.afterFindOne(repository);
    return repository;
  }

  async update(id: number, updateRepositoryDto: UpdateRepositoryDto) {
    const repository = await this.findOne(id);
    this.repositoryProvided.merge(repository, updateRepositoryDto);
    return this.repositoryProvided.save(repository);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repositoryProvided.delete(id);
  }

  mapState = ({ find = 'E', reverse = false } = {}) => {
    const state = {
      E: 'ENABLED',
      D: 'DISABLED',
      A: 'ARCHIVED',
    };
    if (reverse) {
      const stateReverse = (Object.keys(state) as (keyof typeof state)[]).find(
        (key) => {
          return state[key] === find;
        },
      );
      return stateReverse;
    }

    return state[find];
  };
  mapStatus = async ({ find = 'A', reverse = false } = {}) => {
    const status = {
      A: 'ACTIVE ',
      I: 'INACTIVE ',
    };
    if (reverse) {
      const statusReverse = (
        Object.keys(status) as (keyof typeof status)[]
      ).find((key) => {
        return status[key] === find;
      });
      return statusReverse;
    }

    return status[find];
  };

  afterFindOne = async (result: any) => {
    result.state = await this.mapState({ find: result.state });
    result.status = await this.mapStatus({ find: result.status });
    return result;
  };
}
