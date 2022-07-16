import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateMetricDto } from './dto/create-metric.dto';
import { UpdateMetricDto } from './dto/update-metric.dto';
import { MetricEntity } from './entities/metric.entity';

@Injectable()
export class MetricsService {
  constructor(
    @Inject('METRICS_PROVIDED')
    private metricProvided: Repository<MetricEntity>,
  ) {}
  async create(createMetricDto: CreateMetricDto) {
    const newMetric = this.metricProvided.create(createMetricDto);
    return this.metricProvided.save(newMetric);
  }

  async findAll(): Promise<MetricEntity[]> {
    return this.metricProvided.find({ relations: ['repository'] });
  }

  async findOne(id: number) {
    const metric = this.metricProvided.findOne({
      where: { id: id },
      relations: ['repository'],
    });
    if (!metric) {
      throw new NotFoundException(
        `Metrics identificate with #${id} is not found`,
      );
    }
    return metric;
  }
  async findByRepository(id: number) {
    const metric = this.metricProvided.findOne({
      where: { repository: { id: id } },
    });
    if (!metric) {
      throw new NotFoundException(`Repository #${id} is not found`);
    }
    return metric;
  }

  async update(id: number, updateMetricDto: UpdateMetricDto) {
    const metric = await this.findOne(id);
    this.metricProvided.merge(metric, updateMetricDto);
    return this.metricProvided.save(metric);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.metricProvided.delete(id);
  }
}
