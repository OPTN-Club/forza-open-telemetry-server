import fs from 'fs';
import { TelemetryDataRow } from '../TelemetryDataRow';
import { ParserFormatField } from './ParserFormatField';
import { RawParserFormat, TelemetryFormat } from './types';

export class ParserFormat {
  raw: RawParserFormat[];
  fields: ParserFormatField[];
  fieldIndexes: Record<keyof TelemetryDataRow, number>;

  constructor(public formatName: TelemetryFormat) {
    const filename = `./src/formats/${formatName}.format.json`;
    if (!fs.existsSync(filename))
      throw new Error(`Unknown format: ${formatName}`);

    const formatJson = fs.readFileSync(filename);
    this.raw = JSON.parse(formatJson.toString());

    this.fields = [];
    this.fieldIndexes = {} as Record<keyof TelemetryDataRow, number>;

    this.raw.forEach((field, index) => {
      this.fieldIndexes[field[0]] = index;
      this.fields.push(new ParserFormatField(field));
    });

  }
}
