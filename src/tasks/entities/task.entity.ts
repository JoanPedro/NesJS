import { UserEntity } from "src/auth/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../protocols/tasks.protocols";

@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title:string

  @Column()
  description: string

  @Column()
  status: TaskStatus

  @ManyToOne(type => UserEntity, user => user.tasks, { eager: false })
  user: UserEntity
}
