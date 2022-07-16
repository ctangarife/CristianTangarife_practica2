import { Metrics } from '../../metrics/interface/metrics.intergace';
import { CommonProperties } from '../../commoms/common.interface';
import { Tribe } from '../../tribe/interface/tribe.interface';

export enum State {
  ENABLED = 'E',
  DISABLED = 'D',
  ARCHIVED = 'A',
}

export enum Status {
  ACTIVE = 'A',
  INACTIVE = 'I',
}

export interface Repositories extends CommonProperties {
  name: string;
  state: State;
  status: Status;

  //Relaciones
  tribe: Tribe;
}
