import * as dgram from 'dgram';

// const server = dgram.createSocket('udp4');

// server.on('error', (err) => {
//   console.log('server error: ', err);
//   server.close();
// });

// server.on('message', (msg, rinfo) => {
//   console.log(`recieved message with length ${msg.length} from ${rinfo.address}:${rinfo.port}`);
// });

// server.on('listening', () => {
//   const address = server.address();
//   console.log(`server listening ${address.address}:${address.port}`);
// });

// server.bind(69420);

// server.close();

type MessageHandler = (msg: Buffer, rinfo: dgram.RemoteInfo) => void;

class Collector {
  private server = dgram.createSocket('udp4');

  constructor(private port: number, messageHandler: MessageHandler) {
    this.server.on('error', (err) => {
      console.log('server error: ', err);
      this.server.close();
    });
    this.server.on('message', messageHandler);
    this.server.on('listening', () => {
      this.running = true;
      const address = this.server.address();
      console.log(`Collector listening on ${address.address}:${address.port}`);
    })
    this.server.on('close', () => {
      this.running = false;
      console.log('Collector stopped');
    })
  }

  private running = false;

  isRunning() {
    return this.running;
  }

  async start() {
    return new Promise<void>((resolve, reject) => {
      try {
        this.server.bind(this.port, resolve);
      } catch (error) {
        reject(error);
      }
    })
  }

  async stop() {
    return new Promise<void>((resolve, reject) => {
      try {
        this.server.close(resolve);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default Collector;
