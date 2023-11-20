import { SledTelemetry } from './SledTelemetry';

export interface DashTelemetry extends SledTelemetry {
  positionX: number; // In meters
  positionY: number;
  positionZ: number;

  speed: number; // meters per second
  power: number; // watts
  torque: number; // newton meter

  tireTempFrontLeft: number; // celsius
  tireTempFrontRight: number;
  tireTempRearLeft: number;
  tireTempRearRight: number;

  boost: number;
  fuel: number;
  distance: number;

  bestLapTime: number;
  lastLapTime: number;
  currentLapTime: number;
  currentRaceTime: number;
  lap: number;
  racePosition: number;

  accelerator: number;
  brake: number;
  clutch: number;
  handbrake: number;
  gear: number;
  steer: number;

  normalDrivingLine: number;
  normalAiBrakeDifference: number;

  tireWearFrontLeft: number;
  tireWearFrontRight: number;
  tireWearRearLeft: number;
  tireWearRearRight: number;

  trackOrdinal: number;
}
