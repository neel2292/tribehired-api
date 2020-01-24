import { Injectable } from '@nestjs/common';
import { Comment } from '../comment.interface';
import * as workerpool from 'workerpool';
import {Post} from '../post.interface';

const pool = workerpool.pool(__dirname + '/../worker.js');

@Injectable()
export class CommentsService {
    async getAll(): Promise<Post[]> {
        return pool.exec('getComments');
    }

    async getOne(id): Promise<Post[]> {
        return pool.exec('findComment', [id]);
    }

    async filter(
        id: number = null,
        postId: number = null,
        name: string = null,
        email: string = null,
        body: string = null,
    ): Promise<Post> {
        return pool.exec('filterComments', [id, postId, name, email, body]);
    }
}
