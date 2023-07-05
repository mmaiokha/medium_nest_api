import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateArticleDto } from "@app/articles/dto/createArticle.dto";
import { ArticleEntity } from "@app/articles/articles.entity";
import { DeleteResult, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@app/users/users.entity";
import { ArticleResponseInterface } from "@app/articles/interfaces/articleResponse.interface";
import slugify from "slugify";
import { UpdateArticleDto } from "@app/articles/dto/updateArticle.dto";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articlesRepository: Repository<ArticleEntity>
  ) {
  }

  async getBySlug(slug: string): Promise<ArticleEntity> {
    return await this.articlesRepository.findOneBy({ slug });
  }

  async create(currentUser: UserEntity, createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    const newArticle = new ArticleEntity();
    Object.assign(newArticle, createArticleDto);

    newArticle.slug = this.generateSlug(createArticleDto.title);

    if (!newArticle.tagList) {
      newArticle.tagList = [];
    }

    newArticle.author = currentUser;

    return await this.articlesRepository.save(newArticle);
  }

  async delete(slug: string, currentUserId: number): Promise<DeleteResult> {
    const article = await this.getBySlug(slug);
    if (!article) {
      throw new HttpException("Article does not exist", HttpStatus.NOT_FOUND);
    }
    if (article.author.id !== currentUserId) {
      throw new HttpException("You are not an author", HttpStatus.FORBIDDEN);
    }

    return await this.articlesRepository.delete({ slug });
  }

  async update(
    slug: string,
    currentUserId: number,
    updateArticleDto: UpdateArticleDto
  ): Promise<ArticleEntity> {
    const article = await this.getBySlug(slug);
    if (!article) {
      throw new HttpException("Article does not exist", HttpStatus.NOT_FOUND);
    }
    if (article.author.id !== currentUserId) {
      throw new HttpException("You are not an author", HttpStatus.FORBIDDEN);
    }

    Object.assign(article, updateArticleDto);

    return await this.articlesRepository.save(article);
  }

  getArticleResponse(article: ArticleEntity): ArticleResponseInterface {
    return { article };
  }

  private generateSlug(title: string): string {
    return slugify(title, { lower: true }) +
      "-" +
      (Math.random() * Math.pow(36, 6) | 0).toString(36);
  }
}
