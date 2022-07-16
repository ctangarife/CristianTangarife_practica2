import { CommonProperties } from '../../commoms/common.interface';

export interface Metrics extends CommonProperties {
  coverage: number;
  bugs: number;
  vulnerabilities: number;
  hotspot: number;
  code_smells: number;
}
