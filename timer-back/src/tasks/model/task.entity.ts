import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../../user/model/user.entity";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  title: string;

  @Column({nullable: true})
  project: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  duration: string;

  @ManyToOne(type => User, user => user.tasks, { eager: false })
  user: User;
}