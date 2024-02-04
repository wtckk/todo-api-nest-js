import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../tasks/tasks.entity";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.entity";

@Entity('task_comments')
export class TaskComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'text', nullable: false})
  content: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'uuid', nullable: false })
  taskId: string;

  @ManyToOne(() => Task, (task) => task.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user: Task;

  @ApiProperty({ description: "Дата создания комментария" })
  @CreateDateColumn()
  createdAt?: Date;

}