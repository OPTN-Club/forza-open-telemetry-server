import * as fs from 'fs';
import { ParserFormatField } from './ParserFormatField';
import { RawParserFormat, TelemetryFormat } from './types';

export class ParserFormat {
  raw: RawParserFormat[];
  fields: ParserFormatField[];
  byNameMap: Record<string, number>;
  byIndexMap: Record<number, string>;

  constructor(public formatName: TelemetryFormat) {
    const filename = `./src/formats/${formatName}.format.json`;
    if (!fs.existsSync(filename))
      throw new Error(`Unknown format: ${formatName}`);

    const formatJson = fs.readFileSync(filename);
    this.raw = JSON.parse(formatJson.toString());

    this.fields = [];
    this.byNameMap = {};
    this.byIndexMap = {};

    this.raw.forEach((field, index) => {
      const parserField = new ParserFormatField(field);
      this.byNameMap[parserField.name] = index;
      this.byIndexMap[index] = parserField.name;
      this.fields.push(parserField);
    });

  }

  indexOf(name: string): number {
    return this.byNameMap[name];
  }

  nameOf(index: number): string {
    return this.byIndexMap[index];
  }
}
