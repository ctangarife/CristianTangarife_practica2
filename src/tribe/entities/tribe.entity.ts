import { CommonColumn } from '../../commoms/commom.columns';
import { OrganizationEntity } from '../../organizations/entities/organization.entity';
import { RepositoryEntity } from '../../repositories/entities/repository.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tribe } from '../interface/tribe.interface';

@Entity('tribe')
export class TribeEntity extends CommonColumn implements Tribe {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50 })
  name: string;
  @Column({ type: 'int' })
  status: number;
  @ManyToOne(() => OrganizationEntity)
  @JoinColumn([{ name: 'id_organization', referencedColumnName: 'id' }])
  organization: OrganizationEntity;
  @OneToMany(() => RepositoryEntity, (repository) => repository.tribe)
  repositories: RepositoryEntity[];
}
