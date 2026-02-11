export interface IRefreshToken {
  id: string;
  token: string;
  expiresAt: Date;
  userId: string;
  createdAt: Date;
}
