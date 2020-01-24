import {Controller, Logger, Get, Param, Query} from '@nestjs/common';
import {CommentsService} from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Get()
    async getComments(@Query() query) {
        if (Object.keys(query).length) {
            return await this.commentsService.filter(query.id, query.postId, query.name, query.email, query.body);
        } else {
            return await this.commentsService.getAll();
        }
    }

    @Get(':id')
    async getPost(@Param('id') id) {
        return await this.commentsService.getOne(id);
    }
}
