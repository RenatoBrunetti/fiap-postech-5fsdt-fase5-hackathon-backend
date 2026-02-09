export interface ISchoolUser {
  id: string;
  startDate: Date;
  endDate?: Date;
  status: 'TEACHER' | 'STUDENT';
  active: boolean;
  schoolId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
