import { DataSource } from 'typeorm';
import { TribeEntity } from './tribe.entity';

export const tribeProviders = [
  {
    provide: 'TRIBE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TribeEntity),
    inject: ['DATA_SOURCE'],
  },
];
