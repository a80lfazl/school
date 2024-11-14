import { Document, Schema, model } from "mongoose";
import { z } from "zod";

import { Exam } from "./Exam";

export interface Subject extends Document {
  name: string;
  exams?: Array<Exam["_id"]>;
}

const SubjectSchema = new Schema<Subject>(
  {
    name: { type: String, required: true, unique: true },
    exams: { type: [Schema.Types.ObjectId], ref: "Exam", default: [] },
  },
  { timestamps: true }
);

const SubjectModel = model<Subject>("Subject", SubjectSchema);

export default SubjectModel;

// zod validator
export const subjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  exams: z.string().length(24).array().optional().default([]),
});

export type SubjectInput = z.infer<typeof subjectSchema>;
