import { Module } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { RepositoriesController } from './repositories.controller';
import { repositoryProviders } from './entities/repository.provider';

@Module({
  controllers: [RepositoriesController],
  providers: [RepositoriesService, ...repositoryProviders],
})
export class RepositoriesModule {}
