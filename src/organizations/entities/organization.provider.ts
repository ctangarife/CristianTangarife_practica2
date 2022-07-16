import { DataSource } from 'typeorm';
import { OrganizationEntity } from './organization.entity';

export const organizationProviders = [
  {
    provide: 'ORGANIZATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(OrganizationEntity),
    inject: ['DATA_SOURCE'],
  },
];
