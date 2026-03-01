import { connectDB } from "../../../src/lib/db.js";
import { User } from "../../../src/models/user.model.js";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
export default async function handler(req, res) {
  await connectDB();

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}