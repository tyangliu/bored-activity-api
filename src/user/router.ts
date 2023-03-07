import express, {Request, Response} from "express";
import { User } from "./types.js";
import { getCurrentUser, setCurrentUser } from "./io.js";

async function postUserHandler(req: Request, resp: Response) {
  const user = req.body as User;
  console.log(req.body);
  await setCurrentUser(user);
  resp.status(200).end();
}

async function getUserHandler(req: Request, resp: Response) {
  const user = await getCurrentUser();
  resp.send(user);
}

export const userRouter = express.Router();
userRouter.get("/", getUserHandler);
userRouter.post("/", postUserHandler);
