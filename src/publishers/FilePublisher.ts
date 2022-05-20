import fs from 'fs';
import { IPublisher } from './types';

export class FilePublisher implements IPublisher {
  private fileHandle = 0;

  private getFileHandle() {
    if (!this.fileHandle) {
      this.fileHandle = fs.openSync('telemetrycapture.json', 'w+');
    }
    return this.fileHandle;
  }

  publish(data: unknown) {
    const handle = this.getFileHandle();
    fs.writeSync(handle, `${JSON.stringify(data)}\n`);
  }
}
