import { RepositoryEntity } from '../../repositories/entities/repository.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonColumn } from '../../commoms/commom.columns';
import { Metrics } from '../interface/metrics.intergace';

@Entity('metrics')
export class MetricEntity extends CommonColumn implements Metrics {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('double precision')
  coverage: number;
  @Column('int')
  bugs: number;
  @Column('int')
  vulnerabilities: number;
  @Column('int')
  hotspot: number;
  @Column('int')
  code_smells: number;
  @OneToOne(() => RepositoryEntity)
  @JoinColumn([{ name: 'id_repository', referencedColumnName: 'id' }])
  repository: RepositoryEntity;
}
