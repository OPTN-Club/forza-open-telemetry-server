export interface IPublisher {
  publish(data: number[]): void;
  close(): void;
}
