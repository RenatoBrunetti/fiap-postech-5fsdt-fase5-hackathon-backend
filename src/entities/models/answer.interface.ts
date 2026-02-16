export interface IAnswer {
  id: string;
  outcome: number;
  active: boolean;
  questionId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
