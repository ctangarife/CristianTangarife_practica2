import { CommonProperties } from '../../commoms/common.interface';
export interface Organization extends CommonProperties {
  name: string;
  status: number;
}
