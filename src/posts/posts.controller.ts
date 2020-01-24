import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    async getPosts() {
        return await this.postsService.getAll();
    }

    @Get(':id')
    async getPost(@Param('id') id) {
        return await this.postsService.getOne(id);
    }
}
