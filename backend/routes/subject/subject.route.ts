import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import SubjectModel, { zodSubjectSchema } from "@/db/models/subject.model";

export const app = new Hono();

// get all subjects
app.get("/", async (c) => {
  try {
    const subjects = await SubjectModel.find();

    return c.json({ subjects });
  } catch (e: any) {
    return c.json({
      error: e.message,
      success: false,
    });
  }
});
// create a subject
app.post("/", zValidator("json", zodSubjectSchema), async (c) => {
  try {
    const { name, createdAt, tags, userId } = c.req.valid("json");

    const newSubject = new SubjectModel({
      name,
      createdAt,
      tags,
      userId,
    });

    await newSubject.save();

    return c.json(
      {
        subject: newSubject,
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
// get a subject by id
app.get("/:id", async (c) => {
  try {
    const subjectId = c.req.param("id");

    const subject = await SubjectModel.findById(subjectId);

    if (!subject) {
      return c.json(
        {
          error: "Subject not found",
          success: false,
        },
        404
      );
    }

    return c.json({
      subject,
    });
  } catch (e: any) {
    return c.json({
      error: e.message,
      success: false,
    });
  }
});
// get a subject by id with exams
app.get("/:id/exams", async (c) => {
  try {
    const subjectId = c.req.param("id");

    const subject = await SubjectModel.findById(subjectId).populate("examsIds");

    if (!subject) {
      return c.json(
        {
          error: "Subject not found",
          success: false,
        },
        404
      );
    }

    return c.json({
      subject,
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
// delete a subject by id
app.delete("/:id", async (c) => {
  try {
    const subjectId = c.req.param("id");

    const subject = await SubjectModel.findByIdAndDelete(subjectId);

    if (!subject) {
      return c.json(
        {
          error: "Subject not found",
          success: false,
        },
        404
      );
    }

    return c.json({
      subject,
      success: true,
      message: "Subject successfully deleted",
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
