import 'reflect-metadata';
import { RepositoryEntity } from '../../repositories/entities/repository.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonColumn } from '../../commoms/commom.columns';
import { Metrics } from '../interface/metrics.interface';

@Entity('metrics')
export class MetricEntity extends CommonColumn implements Metrics {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('double precision', { nullable: false, default: 0 })
  coverage: number;
  @Column('int', { nullable: false, default: 0 })
  bugs: number;
  @Column('int', { nullable: false, default: 0 })
  vulnerabilities: number;
  @Column('int', { nullable: false, default: 0 })
  hotspot: number;
  @Column('int', { nullable: false, default: 0 })
  code_smells: number;
  @OneToOne(() => RepositoryEntity, (repo) => repo.metric)
  @JoinColumn([{ name: 'id_repository', referencedColumnName: 'id' }])
  repository: RepositoryEntity;
}
