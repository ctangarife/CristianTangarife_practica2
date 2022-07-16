import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationsModule } from './organizations/organizations.module';
import { DatabaseModule } from './database/database.module';
import { TribeModule } from './tribe/tribe.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { MetricsModule } from './metrics/metrics.module';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        DATABASE_EXTRA: Joi.string().required(),
        URL_MOCK: Joi.string().required(),
      }),
    }),
    OrganizationsModule,
    DatabaseModule,
    TribeModule,
    RepositoriesModule,
    MetricsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
