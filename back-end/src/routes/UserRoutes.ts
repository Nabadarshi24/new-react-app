import express from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

const router = express.Router();

// @route POST /api/users/register
// @desc Register new user
// @access Public

router.post("/register", async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();

    // create JWT payload
    const payload = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    console.log(token);

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/users/login
// @desc Authenticate user
// @access Public


export default router;
