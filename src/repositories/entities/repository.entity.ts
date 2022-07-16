import { TribeEntity } from '../../tribe/entities/tribe.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonColumn } from '../../commoms/commom.columns';
import {
  Repositories,
  State,
  Status,
} from '../interface/repositories.interface';
import { MetricEntity } from '../../metrics/entities/metric.entity';

@Entity('repository')
export class RepositoryEntity extends CommonColumn implements Repositories {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 50 })
  name: string;
  @Column({ type: 'varchar', enum: State, default: State.ENABLED, length: 1 })
  state: State;
  @Column({ type: 'varchar', enum: Status, default: Status.ACTIVE, length: 1 })
  status: Status;
  @ManyToOne(() => TribeEntity, (tribe) => tribe.repositories, { eager: true })
  @JoinColumn([{ name: 'id_tribe', referencedColumnName: 'id' }])
  tribe: TribeEntity;
  @OneToOne(() => MetricEntity)
  metric: MetricEntity;
}
