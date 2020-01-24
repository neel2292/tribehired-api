import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cluster from 'cluster';
import * as os from 'os';
import { Logger } from '@nestjs/common';

const workers = {};
const cores = process.env.WEB_CONCURRENCY || os.cpus().length;
let worker;

if (cluster.isMaster) {
  // fork a worker
  for (let i = 0; i < cores; i++) { spawnWorker(); }

  cluster.on('online', ({process}) => {
    Logger.log('Worker ' + process.pid + ' is online');
  });

  cluster.on('exit', ({id, process}, code, signal) =>  {
    Logger.log( 'worker ' + process.pid + ' died. Spawning new worker.' );
    delete workers[id];
    while (Object.keys(workers).length < cores) { spawnWorker(); }
  });

} else {
  bootstrap().then(() => {
    Logger.log('Application started.');
  });
}

async function spawnWorker() {
  worker = await cluster.fork();
  workers[worker.id] = worker;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
