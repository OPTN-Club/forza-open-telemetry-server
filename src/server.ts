import Collector from './Collector';
import Parser from './Parser';

const parser = new Parser('ForzaHorizon4');
const server = new Collector(11000, (buf, rinfo) => {
  console.log('Received message', buf.length, 'bytes long, rinfo.size=', rinfo.size);
  const data = parser.toArray(buf);
  console.log(data);
  const row = parser.toTelemetryRow(buf);
  console.log(JSON.stringify(row));
});

server.start();
