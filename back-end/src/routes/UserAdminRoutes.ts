import express, { Request, Response } from "express";
import { admin, protect } from "../middleware/authMiddleware";
import User from "../models/User";

const router = express.Router();

// @route GET /api/admin/user/all
// @desc Get all users
// @access Private/Admin
router.get("/all", protect, admin, async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @route POST /api/admin/user/create
// @desc Add a new user(Admin only)
// @access Private/Admin
router.post("/create", protect, admin, async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
      role: role || "customer"
    });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @route PUT /api/admin/user/update/:id
// @desc Update a user(Admin only)
// @access Private/Admin
router.put("/update/:id", protect, admin, async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.role = role || user.role;

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @route DELETE /api/admin/user/delete/:id
// @desc Delete a user(Admin only)
// @access Private/Admin
router.delete("/delete/:id", protect, admin, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;