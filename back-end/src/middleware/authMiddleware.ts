import {
  Request,
  Response,
  NextFunction
} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

// Middleware to protect routes
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    if (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      console.log(req.headers.authorization);
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      console.log({ decoded });

      req.body = {
        ...req.body,
        user: await User.findById(decoded.user.id).select("-password")
      };
    } else {
      console.log("No token found");
      res.status(401).json({ message: "Not authorized to access this route" });
    }

    next();
  } catch (error) {
    console.error("Unauthorized", error);
    res.status(401).json({ message: "Not authorized to access this route" });
  }
};

// Middleware to check if user is admin
export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.user.role !== "admin") {
    return res.status(401).json({ message: "Not authorized to access this route" });
  }
  next();
};

