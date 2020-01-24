import { Injectable } from '@nestjs/common';
import { Post } from '../post.interface';
import * as workerpool from 'workerpool';

const pool = workerpool.pool(__dirname + '/../worker.js');

@Injectable()
export class PostsService {
    async getAll(): Promise<Post[]> {
        return pool.exec('getPosts');
    }

    async getOne(id: string): Promise<Post> {
        return pool.exec('findPost', [id]);
    }
}
