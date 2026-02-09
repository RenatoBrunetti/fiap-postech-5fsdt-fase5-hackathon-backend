export interface IAnswer {
  id: string;
  outcome: string;
  active: boolean;
  questionId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
