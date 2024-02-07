export class CommentDto {
  id: string;
  content: string;
  userId: string;
  taskId: string;
  createdAt?: Date;
}