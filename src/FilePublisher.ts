import fs from 'fs';
import { Publisher } from './Publisher';

class FilePublisher implements Publisher {
  private fileHandle = 0;

  constructor() {
  }

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

export default FilePublisher;
