import { ParserFormat } from './ParserFormat';
import { ParseType } from './ParseType';
import { LittleEndianReader, TelemetryFormat, TelemetryObject } from './types';

const parseTypeMap: Record<ParseType, LittleEndianReader> = {
  [ParseType.double]: (buf: Buffer, offset: number) => buf.readDoubleLE(offset),
  [ParseType.float]: (buf: Buffer, offset: number) => buf.readFloatLE(offset),
  [ParseType.int32]: (buf: Buffer, offset: number) => buf.readInt32LE(offset),
  [ParseType.uint32]: (buf: Buffer, offset: number) => buf.readUInt32LE(offset),
  [ParseType.int16]: (buf: Buffer, offset: number) => buf.readInt16LE(offset),
  [ParseType.uint16]: (buf: Buffer, offset: number) => buf.readUInt16LE(offset),
  [ParseType.int8]: (buf: Buffer, offset: number) => buf.readInt8(offset),
  [ParseType.uint8]: (buf: Buffer, offset: number) => buf.readUInt8(offset),
  [ParseType.ignore]: () => null,
};

export class Parser {
  format: ParserFormat;

  constructor(private formatName: TelemetryFormat) {
    this.format = new ParserFormat(formatName);
  }

  toArray(msg: Buffer): number[] {
    const data = Array<number>(this.format.fields.length)
    let position = 0;
    this.format.fields.forEach(({ size, type }) => {
      const value = parseTypeMap[type](msg, position);
      if (value) data.push(value);
      position += size;
    });

    return data;
  }

  toTelemetryRow(msg: Buffer): TelemetryObject {
    const row: TelemetryObject = { epochMs: Date.now() };
    let position = 0;
    this.format.fields.forEach(({ name, size, type }) => {
      const value = parseTypeMap[type](msg, position);
      if (value !== null) {
        row[name] = value as any;
      }
      position += size;
    });
    return row;
  }
}
