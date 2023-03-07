import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { activityRouter } from "./activity/router.js";
import { userRouter } from "./user/router.js";
import { PORT } from "./config.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const routers = {
  "/activity": activityRouter,
  "/user": userRouter,
};
const rootRouter = express.Router();
for (const [path, router] of Object.entries(routers)) {
  rootRouter.use(path, router);
}

app.use("/api", rootRouter);
app.listen(PORT, () => {
  console.log(`[Server] Listening at http://localhost:${PORT}`);
});
