import {
  Column,
  CreateDateColumn,
  Entity, ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { UserEntity } from "@app/users/users.entity";

@Entity({ name: "articles" })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  body: string;

  @Column({default: 0})
  favoritesCount: number;

  @Column({ type: "simple-array" })
  tagList: string[];

  @Column()
  slug: string;

  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.articles, {eager: true})
  author: UserEntity;
}