import fs from 'fs';
import { Collector } from './Collector';
import { Parser } from './Parser/Parser';
import { IPublisher, FilePublisher, WebSocketPublisher } from './publishers';

const outfile = fs.openSync('telemetrycapture.json', 'w+');

const parser = new Parser('ForzaHorizon5');
const publishers: IPublisher[] = [
  new WebSocketPublisher({
    port: 5555,
    serverOptions: {
      cors: {
        origin: "http://localhost:3333",
        methods: ["GET", "POST"]
      }
    },
  }),
  new FilePublisher(),
];

let count = 0;

const server = new Collector(11000, (buf) => {
  const data = parser.toArray(buf);
  if (data[1]) {
    publishers.forEach((publisher) => {
      publisher.publish(data);
    });
  }
  count += 1;
});

server.start();
