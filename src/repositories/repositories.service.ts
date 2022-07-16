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
    return this.repositoryProvided.find();
  }

  async findOne(id: number) {
    const repository = await this.repositoryProvided.findOneBy({ id: id });
    if (!repository) {
      throw new NotFoundException(`Repository #${id} not found`);
    }
    return repository;
  }

  async update(id: number, updateRepositoryDto: UpdateRepositoryDto) {
    const repository = await this.findOne(id);
    this.repositoryProvided.merge(repository, updateRepositoryDto);
    return this.repositoryProvided.save(repository);
  }

  async remove(id: number) {
    const repository = await this.findOne(id);
    return this.repositoryProvided.delete(id);
  }
}
