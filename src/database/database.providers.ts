import { DataSource } from 'typeorm';
import { ConfigType } from '@nestjs/config';
import config from '../config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigType<typeof config>) => {
      const dataSource = new DataSource({
        type: 'cockroachdb',
        url: configService.database.url,
        ssl: true,
        extra: {
          options: configService.database.extra,
        },
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
        migrationsRun: false,
        migrationsTableName: 'migration',
        logging: false,
      });

      return dataSource.initialize();
    },
    inject: [config.KEY],
  },
];
