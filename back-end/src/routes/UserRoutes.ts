import express, { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// @route POST /api/user/register
// @desc Register new user
// @access Public

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    // create JWT payload
    const payload = {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: "30m" },
    );

    console.log(token);

    res.json({
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        },
        token
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/user/login
// @desc Authenticate user
// @access Public
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const payload = {
      user: {
        id: user._id,
        role: user.role
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: "30m" },
    );

    const refreshToken = crypto.randomUUID();
    const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    // console.log({ refreshToken, refreshTokenExpiry })

    user.refreshToken = refreshToken;
    user.refreshTokenExpiry = refreshTokenExpiry;
    await user.save();

    res.status(200).json({
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token,
        refreshToken
      },
      success: true,
      successMessage: "User logged in successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
})

// @route GET /api/user/profile
// @desc Get logged-in user's profile
// @access Private

router.get("/profile", protect, (req: Request, res: Response) => {
  console.log(req);
  res.json(req.body.user);
});

// @route POST /api/user/refresh-token
// @desc Refresh user's token
// @access Public

router.post("/claim/access-token", async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const user = await User.findOne({ refreshToken });
    const isRefreshTokenExpired = user?.refreshTokenExpiry && user.refreshTokenExpiry > new Date();

    if (!user || !isRefreshTokenExpired) {
      return res.status(401).json({ message: "Invalid or expired refresh token" });
    };

    const payload = {
      user: {
        id: user._id,
        role: user.role
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: "30m" },
    );

    res.status(200).json({
      data: {
        // user: {
        //   id: user._id,
        //   name: user.name,
        //   email: user.email,
        //   role: user.role
        // },
        token
      },
      success: true,
      successMessage: "Token refreshed successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
