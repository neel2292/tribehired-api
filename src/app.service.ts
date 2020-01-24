import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    //simulate crashing
    // setTimeout(function () {
    //   throw new Error('We crashed!!!!!');
    // }, 10);

    return 'All is good';
  }
}
