export class PostModel {
  id?: number;
  title: string;
  author: string;
  description: string;
  owner_id: number;
  views?: number;
  createdAt?: Date;
  updatedAt?: Date;
}