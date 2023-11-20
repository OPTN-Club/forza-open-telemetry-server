export interface TelemetryNameMap {
  indexOf(name: string): number;
  nameOf(index: number): string;
}

export class TelemetryDataRow {
  constructor(private nameMap: TelemetryNameMap, private dataArray: number[]) {
  }

  byIndex(index: number): number {
    return this.dataArray[index];
  }

  byName(name: string): number {
    return this.dataArray[this.nameMap.indexOf(name)];
  }

  get data() {
    return this.dataArray;
  }
}
