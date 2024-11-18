import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import ExamModel, { zodExamSchema } from "@/db/models/exam.model";
import SubjectModel from "@/db/models/subject.model";

export const app = new Hono();

// get all exams
app.get("/", async (c) => {
  try {
    const exams = await ExamModel.find();

    return c.json({ exams });
  } catch (e: any) {
    return c.json(
      {
        error: e.message,
        success: false,
      },
      500
    );
  }
});
// create a exam
app.post("/", zValidator("json", zodExamSchema), async (c) => {
  try {
    const { title, subjectId } = c.req.valid("json");

    const isExamExist = await ExamModel.findOne({ title });

    if (isExamExist) {
      return c.json({
        error: "Exam already exist",
        success: false,
      });
    }

    const newExam = new ExamModel({
      title,
      subjectId,
    });
    await SubjectModel.findOneAndUpdate(
      { _id: subjectId },
      { $push: { examsIds: newExam._id } }
    );

    await newExam.save();

    return c.json(
      {
        exam: newExam,
      },
      201
    );
  } catch (e: any) {
    return c.json(
      {
        error: e.message,
        success: false,
      },
      400
    );
  }
});
// get a exam by id
app.get("/:id", async (c) => {
  try {
    const examId = c.req.param("id");

    const exam = await ExamModel.findById(examId);

    if (!exam) {
      return c.json(
        {
          error: "Exam not found",
        },
        404
      );
    }

    return c.json({
      exam,
    });
  } catch (e: any) {
    return c.json(
      {
        error: e.message,
        success: false,
      },
      400
    );
  }
});
// delete a exam by id
app.delete("/:id", async (c) => {
  try {
    const examId = c.req.param("id");

    const exam = await ExamModel.findByIdAndDelete(examId);

    if (!exam) {
      return c.json(
        {
          error: "Exam not found",
          success: false,
        },
        404
      );
    }

    // await SubjectModel.updateOne({ _id: userId }, { $pull: { notes: id } });

    return c.json({
      exam,
      success: true,
      message: "Exam successfully deleted",
    });
  } catch (e: any) {
    return c.json(
      {
        error: e.message,
        success: false,
      },
      400
    );
  }
});
