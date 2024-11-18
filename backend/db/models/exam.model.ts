import { z } from "zod";
import { zId, zodSchema } from "@zodyac/zod-mongoose";
import { model } from "mongoose";

export const zodExamSchema = z.object({
  title: z.string().min(3).max(255),
  subjectId: zId("Subject"),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

const schema = zodSchema(zodExamSchema);

const ExamModel = model("Exam", schema);
export default ExamModel;
