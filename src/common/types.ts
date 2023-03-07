export interface Bin<T> {
  // (start, end]
  range: [number, number];
  key: T;
}
