import { Document, Schema, model } from "mongoose";
import { z } from "zod";

import { Subject } from "./Subject";

export interface Exam extends Document {
  title: string;
  createdAt?: Date;
  subjectId: Subject["_id"];
}

const ExamSchema = new Schema<Exam>(
  {
    title: { type: String, required: true, unique: true },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      require: true,
    },
  },
  { timestamps: true }
);

const ExamModel = model<Exam>("Exam", ExamSchema);

export default ExamModel;

// Zod schema for Exam
export const examSchema = z.object({
  title: z.string().min(1, "Title is required"),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  subjectId: z.string().length(24),
});

export type ExamInput = z.infer<typeof examSchema>;
