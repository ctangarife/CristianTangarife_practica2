import { CommonProperties } from '../../commoms/common.interface';
import { Tribe } from '../../tribe/interface/tribe.interface';
export interface Organization extends CommonProperties {
  name: string;
  status: number;

  //relaciones
  tribe?: Tribe[];
}
