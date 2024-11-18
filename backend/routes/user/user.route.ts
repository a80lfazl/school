import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import UserModel, { zodUserSchema } from "@/db/models/user.model";

export const app = new Hono();

// signup
app.post("/", zValidator("json", zodUserSchema), async (c) => {
  const { username, password, email, role } = c.req.valid("json");

  const isUsernameExist = await UserModel.findOne({ username });
  const isEmailExist = await UserModel.findOne({ email });
  if (isUsernameExist || isEmailExist) {
    return c.json(
      {
        error: "username or email is already exist",
        success: false,
      },
      400
    );
  }

  const newUser = new UserModel({ username, password, email, role });

  await newUser.save();

  return c.json(
    {
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        active: newUser.active,
        role: newUser.role,
        isAdmin: newUser.isAdmin,
        createdAt: newUser.createdAt,
      },
      success: true,
      message: "User created successfully",
    },
    201
  );
});
