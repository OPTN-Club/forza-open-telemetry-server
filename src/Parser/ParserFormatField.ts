import { TelemetryDataRow } from '../TelemetryDataRow';
import { ParseType } from "./ParseType";
import { RawParserFormat } from './types';

export class ParserFormatField {
  name: keyof TelemetryDataRow;
  size: number;
  type: ParseType;

  constructor(field: RawParserFormat) {
    this.name = field[0];
    this.size = field[1];
    this.type = field[2];
  }
}
