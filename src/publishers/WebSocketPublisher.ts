import { Server, ServerOptions } from 'socket.io';
import { IPublisher } from './types';

export interface WebSocketPublisherOptions {
  port: number;
  eventName: string;
  serverOptions?: Partial<ServerOptions>;
}

const defaultOptions: WebSocketPublisherOptions = {
  port: 5555,
  eventName: 'telemetry',
}

export class WebSocketPublisher implements IPublisher {
  private server: Server;
  private options: WebSocketPublisherOptions;
  private shouldPublish = false;

  constructor(options: Partial<WebSocketPublisherOptions>) {
    this.options = {
      ...defaultOptions,
      ...options,
    };
    this.server = new Server(this.options.serverOptions);

    this.server.on('connection', (socket) => {
      this.shouldPublish = true;
      socket.on('disconnect', () => {
        this.shouldPublish = this.server.sockets.sockets.size > 0;
      });
    });
    this.server.listen(this.options.port);
    console.log(`WebSocketPublisher listening on port ${this.options.port}`);
  }

  publish(data: number[]) {
    if (this.shouldPublish) {
      this.server.sockets.emit(this.options.eventName, data);
    }
  }

  close() {
    this.server.close();
  }
}
