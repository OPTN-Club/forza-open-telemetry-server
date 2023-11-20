import { ForzaHorizon5Telemetry } from '../telemetry/ForzaHorizon5Telemetry';
import { ParseType } from './ParseType';

export type TelemetryFormat = 'Sled' | 'Dash' | 'ForzaHorizon5';
export type RawParserFormat = [ScrollSetting, number, ParseType];
export type LittleEndianReader = (buf: Buffer, offset: number) => number | null;
export interface TelemetryObject {
  epochMs: number;
  [key: string]: number;
}
