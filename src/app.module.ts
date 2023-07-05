import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import typeormConfig from "@app/config/orm.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "@app/users/users.module";
import { JwtAuthMiddleware } from "@app/users/middlewares/jwtAuth.middleware";
import { ArticlesModule } from "@app/articles/articles.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UsersModule,
    ArticlesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .forRoutes({
        path: "*",
        method: RequestMethod.ALL
      });
  }
}
