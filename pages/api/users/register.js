import { connectDB } from "../../../src/lib/db";
import { User } from "../../../src/models/user.model";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectDB();

  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const token = jwt.sign(
    { _id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  res.setHeader(
    "Set-Cookie",
    `accessToken=${token}; HttpOnly; Path=/; ${
      process.env.NODE_ENV === "production" ? "Secure;" : ""
    }`
  );

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}