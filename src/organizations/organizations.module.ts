import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { organizationProviders } from './entities/organization.provider';

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService, ...organizationProviders],
})
export class OrganizationsModule {}
