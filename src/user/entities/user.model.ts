export class UserModel {
  id?: number;
  username: string;
  password?: string;
  email: string;
  role?: string;
  surname?: string;
  name?: string;
  rating?: number;
  ratingCount?: number;
  ratingAmount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}