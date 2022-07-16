import { TribeEntity } from '../../tribe/entities/tribe.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CommonColumn } from '../../commoms/commom.columns';
import { Organization } from '../interface/organization.interface';

@Entity('organization')
export class OrganizationEntity extends CommonColumn implements Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('int')
  status: number;

  //Relaciones
  @OneToMany(() => TribeEntity, (tribe) => tribe.organization)
  tribe: TribeEntity[];
}
