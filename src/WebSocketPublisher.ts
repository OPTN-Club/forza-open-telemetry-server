import { Server } from 'socket.io';
import { Publisher } from './Publisher';

class WebSocketPublisher implements Publisher {
  private server = new Server({
    cors: {
      origin: "http://localhost:3333",
      methods: ["GET", "POST"]
    }
  });

  private shouldPublish = false;

  constructor(private port: number, private eventName = 'telemetry') {
    this.server.on('connection', (socket) => {
      this.shouldPublish = true;
      socket.on('disconnect', () => {
        this.shouldPublish = this.server.sockets.sockets.size > 0;
      });
    });
    this.server.listen(port);
  }

  publish(data: unknown) {
    if (this.shouldPublish) {
      this.server.sockets.emit(this.eventName, data);
    }
  }
}

export default WebSocketPublisher;
