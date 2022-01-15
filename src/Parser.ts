import fs from 'fs';
import { TelemetryRow } from './TelemetryRow';

enum ParseType {
  double = 'double',
  float = 'float',
  boolean = 'boolean',
  int32 = 'int32',
  uint32 = 'uint32',
  int16 = 'int16',
  uint16 = 'uint16',
  int8 = 'int8',
  uint8 = 'uint8',
  ignore = 'ignore',
}

type LittleEndianReader = (buf: Buffer, offset: number) => number | boolean | null;
const parseTypeMap: Record<ParseType, LittleEndianReader> = {
  [ParseType.double]: (buf: Buffer, offset: number) => buf.readDoubleLE(offset),
  [ParseType.float]: (buf: Buffer, offset: number) => buf.readFloatLE(offset),
  [ParseType.int32]: (buf: Buffer, offset: number) => buf.readInt32LE(offset),
  [ParseType.uint32]: (buf: Buffer, offset: number) => buf.readUInt32LE(offset),
  [ParseType.int16]: (buf: Buffer, offset: number) => buf.readInt16LE(offset),
  [ParseType.uint16]: (buf: Buffer, offset: number) => buf.readUInt16LE(offset),
  [ParseType.int8]: (buf: Buffer, offset: number) => buf.readInt8(offset),
  [ParseType.uint8]: (buf: Buffer, offset: number) => buf.readUInt8(offset),
  [ParseType.boolean]: (buf: Buffer, offset: number) => buf.readFloatLE(offset) > 0,
  [ParseType.ignore]: () => null,
};

type ParserFormat = [keyof TelemetryRow, number, ParseType];
type TelemetryFormat = 'ForzaHorizon5';

class Parser {
  format: ParserFormat[];

  constructor (private formatName: TelemetryFormat) {
    console.log('cwd', process.cwd());
    const filename = `./src/formats/${formatName}.format.json`;
    if (!fs.existsSync(filename)) throw new Error(`Unknown format: ${formatName}`);
    const formatJson = fs.readFileSync(filename);
    this.format = JSON.parse(formatJson.toString());
  }

  toArray (msg: Buffer) {
    const data: (number | boolean)[] = [Date.now()];
    let position = 0;
    this.format.forEach(([, size, type]) => {
      const value = parseTypeMap[type](msg, position);
      // console.log(name, size, type, position, value);
      if (value !== null) {
        data.push(value);
      }
      position += size;
    });

    return data;
  }

  toTelemetryRow (msg: Buffer) {
    const row: TelemetryRow = { epochMs: Date.now() } as TelemetryRow;
    let position = 0;
    this.format.forEach(([name, size, type]) => {
      const value = parseTypeMap[type](msg, position);
      if (value !== null) {
        row[name] = value as any;
      }
      position += size;
    });
    return row;
  }
}

export default Parser;
