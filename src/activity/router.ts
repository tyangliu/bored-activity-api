import express, {Request, Response} from "express";
import * as path from "path";

import { BORED_API_HOST } from "../config.js";
import { binValue } from "../common/utils.js";
import {
  ACCESSIBILITY_BINS,
  PRICE_BINS,
  PRECISION,
} from "./constants.js";
import {
  BoredActivity,
  Activity,
  Accessibility,
  GetActivityParams,
  Price,
} from "./types.js";
import { getCurrentUser } from "../user/io.js";

// Small number to add so Bored API min values are exclusive.
// From testing, Bored API has 1 sigfig, so 2 sigfig delta is enough.
const DELTA = 0.01;

function buildGetActivityParams(accessibility: Accessibility, price: Price): GetActivityParams {
    const { range: [minPrice, maxPrice] } = PRICE_BINS.find(({key}) =>
      key == price
    )!;
    const { range: [minAcc, maxAcc] } = ACCESSIBILITY_BINS.find(({key}) =>
      key == accessibility
    )!;
    return {
      minprice: Math.max(minPrice + DELTA, 0),
      maxprice: Math.min(maxPrice, 1),
      minaccessibility: Math.max(minAcc + DELTA, 0),
      maxaccessibility: Math.min(maxAcc, 1),
    };
}

async function getActivityHandler(req: Request, resp: Response) {
  const url = new URL(path.join(BORED_API_HOST, "activity"));

  // If current user is set, set params to filter activity by
  // user price/accessibility preferences.
  const currentUser = await getCurrentUser();
  if (currentUser) {
    const { accessibility, price } = currentUser;
    const getParams = buildGetActivityParams(accessibility, price);
    for (const [key, val] of Object.entries(getParams)) {
      url.searchParams.append(key, val.toFixed(PRECISION));
    }
  }

  const activityResp = await fetch(url);
  const {
    accessibility,
    price,
    ...rest
  } = await activityResp.json() as BoredActivity;

  const respBody: Activity = {
    accessibility: binValue(ACCESSIBILITY_BINS, accessibility)!,
    price: binValue(PRICE_BINS, price)!,
    ...rest,
  };

  resp.send(respBody);
}

export const activityRouter = express.Router();
activityRouter.get("/", getActivityHandler);
