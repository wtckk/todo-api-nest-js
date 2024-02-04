import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { TaskStatusEnum } from "./enum/task-status.enum";
import { User } from "../users/users.entity";
import { TaskComment } from "../task-comments/task-comment.entity";

@Entity("tasks")
export class Task{
  @ApiProperty({ example: "1b8cfbc9-b380-4e16-9012-292acea3c8f8", description: "Уникальный идентификатор задачи" })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({example: "Починить кран в ванной", description: "Название задачи"})
  @Column({type: "varchar", nullable: false})
  @IsString()
  title: string

  @ApiProperty({example: "Починить кран в ванной", description: "Описание задачи"})
  @Column({type: "varchar"})
  @IsString()
  description: string

  @ApiProperty({example: TaskStatusEnum.NEW, description: "Статус задачи"})
  @Column({type: "enum", enum: TaskStatusEnum, default: TaskStatusEnum.NEW})
  status: TaskStatusEnum

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @OneToMany(() => TaskComment, (comment) => comment.task, { cascade: true })
  comments: TaskComment[];

  @ApiProperty({ description: "Дата создания" })
  @CreateDateColumn()
  createdAt?: Date;
}