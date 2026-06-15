import { Request, Response, NextFunction } from "express";
import axios from "axios";
import * as globals from "node-global-storage";

// class BkashMiddleware {
export const bkashAuth = async (req: Request, res: Response, next: NextFunction) => {
  globals.unsetValue("id_token");

  try {
    const response = await axios.post(process.env.BKASH_GRANT_TOKEN_URL!, {
      app_key: process.env.BKASH_API_KEY!,
      app_secret: process.env.BKASH_SECRET_KEY!,
    }, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "username": process.env.BKASH_USERNAME!,
        "password": process.env.BKASH_PASSWORD!,
      },
    });

    globals.setValue("id_token", response.data.id_token, { protected: true });
    req.body = {
      ...req.body,
      id_token: response.data.id_token
    }
    next();
  } catch (error: any) {
    console.log(error);
    res.status(401).json({ message: error.response?.data?.message || "Unauthorized" });
  }
};
// };

// export default BkashMiddleware;