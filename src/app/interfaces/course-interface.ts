import { IDays } from "./days-interface";
import { IProfessor } from "./professor-interface";

export interface ICourse {
  id: number;
  name: string;
  professor: IProfessor;
  roomNumber: string;
  days : IDays;
  listDays? : string;
}
