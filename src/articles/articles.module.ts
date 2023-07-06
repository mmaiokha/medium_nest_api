import { Module } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { ArticlesController } from "./articles.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleEntity } from "@app/articles/articles.entity";
import { UsersModule } from "@app/users/users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity]),
    UsersModule
  ],
  providers: [ArticlesService],
  controllers: [ArticlesController]
})
export class ArticlesModule {
}
