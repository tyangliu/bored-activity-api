import { Bin } from "../common/types.js";
import { Accessibility, Price } from "./types.js";

export const ACCESSIBILITY_BINS: Bin<Accessibility>[] = [
  {
    key: "High",
    range: [-Infinity, 0.25],
  },
  {
    key: "Medium",
    range: [0.25,  0.75],
  },
  {
    key: "Low",
    range: [0.75, Infinity],
  },
];

export const PRICE_BINS: Bin<Price>[] = [
  {
    key: "Free",
    range: [-Infinity, 0],
  },
  {
    key: "Low",
    range: [0, 0.5],
  },
  {
    key: "High",
    range: [0.5, Infinity],
  },
];

// Float precision for numerical params to Bored API.
export const PRECISION = 2;
