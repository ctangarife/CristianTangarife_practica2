import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OrganizationEntity } from './entities/organization.entity';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @Inject('ORGANIZATION_REPOSITORY')
    private organizationRepository: Repository<OrganizationEntity>,
  ) {}
  async create(createOrganizationDto: CreateOrganizationDto) {
    const newOrganization = this.organizationRepository.create(
      createOrganizationDto,
    );
    return this.organizationRepository.save(newOrganization);
  }

  async findAll(): Promise<OrganizationEntity[]> {
    return this.organizationRepository.find({ relations: ['tribe'] });
  }

  async findOne(id: number) {
    const organization = await this.organizationRepository.findOne({
      where: { id: id },
      relations: ['tribe'],
    });
    if (!organization) {
      throw new NotFoundException(`organization #${id} not found`);
    }
    return organization;
  }
  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const organization = await this.findOne(id);
    this.organizationRepository.merge(organization, updateOrganizationDto);
    return this.organizationRepository.save(organization);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.organizationRepository.delete(id);
  }
}
