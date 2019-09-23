import program from 'commander';
import HttpServer from './server';


program
  .option('-p, --port [value]', '输入一个端口号')
  .parse(process.argv);

const server = new HttpServer(program);

server.start();

export default program;