import { IClass } from './class.interface.js';

export interface IGrade {
  id: string;
  name: string;
  category: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  classes?: IClass[];
}
