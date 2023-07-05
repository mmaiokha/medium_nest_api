import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsOptional()
  description: string

  @IsString()
  @IsOptional()
  body: string

  @IsOptional()
  @IsArray()
  tagList?: string[]
}