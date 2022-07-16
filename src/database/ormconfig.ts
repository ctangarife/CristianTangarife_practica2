import { config } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';
config({ path: '.env' });

export default new DataSource({
  name: 'default',
  type: 'cockroachdb',
  url: process.env.DATABASE_URL,
  ssl: true,
  extra: {
    options: process.env.DATABASE_EXTRA,
  },
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'migration',
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  logging: ['warn', 'error'],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
});
