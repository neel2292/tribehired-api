import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [],
  controllers: [AppController, CommentsController, PostsController],
  providers: [AppService, CommentsService, PostsService],
})
export class AppModule {}
