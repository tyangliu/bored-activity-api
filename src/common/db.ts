import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

import { DB_JSON_PATH } from "../config.js";
import { User } from "../user/types.js";

interface Data {
  user?: User;
}

export const db = new Low(new JSONFile<Data>(DB_JSON_PATH));
