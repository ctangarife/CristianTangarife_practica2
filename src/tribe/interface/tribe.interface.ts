import { CommonProperties } from '../../commoms/common.interface';
import { Organization } from '../../organizations/interface/organization.interface';
import { Repositories } from '../../repositories/interface/repositories.interface';

export interface Tribe extends CommonProperties {
  name: string;
  status: number;

  //Relaciones
  organization: Organization;
  repositories?: Repositories[];
}
