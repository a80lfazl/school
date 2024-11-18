import { z } from "zod";
import { zId, zodSchema } from "@zodyac/zod-mongoose";
import { model } from "mongoose";

export const zodSubjectSchema = z.object({
  name: z.string().min(3).max(255),
  tags: z.array(z.string().min(3).max(255)).default([]),
  userId: zId("User"),
  examsIds: z.array(zId("Exam")).default([]),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

const schema = zodSchema(zodSubjectSchema);

const SubjectModel = model("Subject", schema);
export default SubjectModel;
