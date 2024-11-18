import { z } from "zod";
import { zId, zodSchema } from "@zodyac/zod-mongoose";
import { model } from "mongoose";

export const zodUserSchema = z.object({
  username: z.string().min(3).max(255).unique(),
  password: z.string().min(8).max(100),
  email: z.string().email().unique(),
  active: z.boolean().default(true),
  role: z.enum(["student", "teacher"]).default("student"),
  isAdmin: z.boolean().default(false),
  studentsIds: z.array(zId("User")).default([]),
  subjectsIds: z.array(zId("Subject")).default([]),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

const schema = zodSchema(zodUserSchema);

const UserModel = model("User", schema);
export default UserModel;
