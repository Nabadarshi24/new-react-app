import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
};

export const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"]
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"]
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
}, {
  timestamps: true
});

// Password Hash Middleware
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Mtach User entered password with hashed password
UserSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;

