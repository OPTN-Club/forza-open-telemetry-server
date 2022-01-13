import Collector from './Collector';

const server = new Collector(11000, (msg, rinfo) => {
  console.log('Received message', msg.length, 'bytes long, rinfo.size=', rinfo.size);
  console.log(msg);
});

server.start();
