import { Hono } from "hono";
import { cors } from "hono/cors";
import { pinoLogger } from "hono-pino-logger";

import { connectToDB } from "./db";
import { env } from "./env";

import { app as subjectRoutes } from "./routes/subject/subject.route";
import { app as examRoutes } from "./routes/exam/exam.route";
import { app as userRoutes } from "./routes/user/user.route";

const app = new Hono();

app.use(cors());
app.use(pinoLogger());

app.route("/auth/signup", userRoutes);
app.route("/api/subject", subjectRoutes);
app.route("/api/exam", examRoutes);

connectToDB();
console.log("server is listening on port:", env.PORT);

export default {
  port: env.PORT,
  fetch: app.fetch,
};
