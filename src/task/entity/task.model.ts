export class TaskModel {
  id?: number;
  title: string;
  description: string;
  group_id: number;
  group_title: string;
  completed:  boolean;
  complete_user?: string;
}