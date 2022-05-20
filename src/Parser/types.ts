import { TelemetryDataRow } from '../TelemetryDataRow';
import { ParseType } from './ParseType';

export type TelemetryFormat = 'ForzaHorizon5';
export type RawParserFormat = [keyof TelemetryDataRow, number, ParseType];
export type LittleEndianReader = (buf: Buffer, offset: number) => number | boolean | null;
