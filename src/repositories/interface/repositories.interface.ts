import { CommonProperties } from '../../commoms/common.interface';

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
}
