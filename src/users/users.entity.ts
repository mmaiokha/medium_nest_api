import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import * as bcrypt from 'bcrypt'
import { BCRYPT_SALT } from "@app/config/env.config";
import { ArticleEntity } from "@app/articles/articles.entity";

@Entity({name: 'users'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  username: string

  @Column({default: ""})
  bio: string

  @Column({default: ""})
  image: string

  @Column({select: false})
  password: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, parseInt(BCRYPT_SALT))
  }

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[]
}