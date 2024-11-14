import { Hono } from "hono";
import { cors } from "hono/cors";

import { app as subjectRoutes } from "./routes/subject.route";
import { app as examRoutes } from "./routes/exam.route";
import { connectToDB } from "./db";
import { env } from "./env";
import { pinoLogger } from "hono-pino-logger";

const app = new Hono();

app.use(cors());
app.use(pinoLogger());

app.route("/api/subject", subjectRoutes);
app.route("/api/exam", examRoutes);

connectToDB();
console.log("server is listening on port:", env.PORT);

export default {
  port: env.PORT,
  fetch: app.fetch,
};
