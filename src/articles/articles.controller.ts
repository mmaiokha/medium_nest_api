import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ArticlesService } from "@app/articles/articles.service";
import { CreateArticleDto } from "@app/articles/dto/createArticle.dto";
import { ArticleResponseInterface } from "@app/articles/interfaces/articleResponse.interface";
import { User } from "@app/users/decorators/user.decorator";
import { UserEntity } from "@app/users/users.entity";
import { JwtGuard } from "@app/users/guards/jwt.guard";
import { UpdateArticleDto } from "@app/articles/dto/updateArticle.dto";
import { DeleteResult } from "typeorm";
import { ArticlesFeedQueryDto } from "@app/articles/dto/articlesQuery.dto";
import { ArticlesResponseInterface } from "@app/articles/interfaces/articlesResponse.interface";

@Controller("articles")
export class ArticlesController {
    constructor(
        private readonly articlesService: ArticlesService
    ) {
    }

    @UseGuards(JwtGuard)
    @Post()
    async create(
        @Body("article") createArticleDto: CreateArticleDto,
        @User() currentUser: UserEntity
    ): Promise<ArticleResponseInterface> {
        const article = await this.articlesService.create(currentUser, createArticleDto);
        return this.articlesService.getArticleResponse(article);
    }

    @UseGuards(JwtGuard)
    @Get("feed")
    async feed(
        @Query() query: ArticlesFeedQueryDto,
        @User("id") currentUserId: number
    ): Promise<ArticlesResponseInterface> {
        return await this.articlesService.feed(query, currentUserId);
    }

    @UseGuards(JwtGuard)
    @Put(":slug")
    async update(
        @Param("slug") slug: string,
        @Body("article") createArticleDto: UpdateArticleDto,
        @User("id") currentUserId: number
    ): Promise<ArticleResponseInterface> {
        const article = await this.articlesService.update(slug, currentUserId, createArticleDto);
        return this.articlesService.getArticleResponse(article);
    }

    @UseGuards(JwtGuard)
    @Delete(":slug")
    async delete(
        @Param("slug") slug: string,
        @User("id") currentUserId: number
    ): Promise<DeleteResult> {
        return await this.articlesService.delete(slug, currentUserId);
    }

    @Get(":slug")
    async getBySlug(
        @Param("slug") slug: string
    ): Promise<ArticleResponseInterface> {
        const article = await this.articlesService.getBySlug(slug);
        return this.articlesService.getArticleResponse(article);
    }

    @UseGuards(JwtGuard)
    @Post(":slug/favorite")
    async favoriteArticle(@Param("slug") slug: string, @User("id") currentUserId: number):
        Promise<ArticleResponseInterface> {
        const article = await this.articlesService.favoriteArticle(slug, currentUserId);
        return this.articlesService.getArticleResponse(article);
    }

    @UseGuards(JwtGuard)
    @Delete(":slug/favorite")
    async unfavoriteArticle(@Param("slug") slug: string, @User("id") currentUserId: number):
        Promise<ArticleResponseInterface> {
        const article = await this.articlesService.unfavoriteArticle(slug, currentUserId);
        return this.articlesService.getArticleResponse(article);
    }

    @Get()
    async getAll(
        @Query() query: ArticlesFeedQueryDto,
        @User("id") currentUserId: number | null
    ): Promise<ArticlesResponseInterface> {
        return await this.articlesService.getAll(query, currentUserId);
    }


}
