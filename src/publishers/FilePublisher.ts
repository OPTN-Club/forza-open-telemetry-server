import * as fs from 'fs';
import { IPublisher } from './types';

export interface FilePublisherOptions {
  filepath: string;
}

const defaultOptions: FilePublisherOptions = {
  filepath: 'telemetrycapture.json',
}

export class FilePublisher implements IPublisher {
  private options: FilePublisherOptions;
  private fileHandle = 0;

  constructor(options?: Partial<FilePublisherOptions>) {
    this.options = {
      ...defaultOptions,
      ...(options || {}),
    };
  }

  private getFileHandle() {
    if (!this.fileHandle) {
      this.fileHandle = fs.openSync(this.options.filepath, 'w+');
    }
    return this.fileHandle;
  }

  publish(data: number[]) {
    const handle = this.getFileHandle();
    fs.writeSync(handle, `${JSON.stringify(data)}\n`);
  }

  close() {
    if (this.fileHandle) {
      fs.closeSync(this.fileHandle);
    }
  }
}
