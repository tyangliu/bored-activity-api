import { Bin } from "./types.js";

export function binValue<T>(bins: Bin<T>[], val: Number): T | undefined {
  // Since we have few bins, perform a linear search over all bins.
  // If we have more bins, we'd prefer binary search.
  for (let {key, range: [start, end]} of bins) {
    if (val > start && val <= end) {
      return key;
    }
  }
}
