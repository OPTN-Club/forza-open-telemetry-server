import * as dgram from 'dgram';

type MessageHandler = (msg: Buffer, rinfo: dgram.RemoteInfo) => void;

export class Collector {
  private server = dgram.createSocket('udp4');
  private running = false;

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
    });
    this.server.on('close', () => {
      this.running = false;
      console.log('Collector stopped');
    });
  }

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
    });
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
