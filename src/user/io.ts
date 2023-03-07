import { db } from "../common/db.js";
import { User } from "./types.js";

export async function getCurrentUser(): Promise<User | undefined> {
  await db.read();
  return db.data?.user;
}

export async function setCurrentUser(user: User) {
  await db.read();
  // If db has not been created yet, initialize it with empty obj.
  db.data ||= {};
  db.data.user = user;
  await db.write();
}
