import { executeQuery, logger ,executeStoredProcedure } from "./db";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({ path: "./server/.env" });
const SECRET_KEY = process.env.JWT_SECRET as string;

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET is missing in environment variables");
}
interface LoginParams {
  Identifier: string;
  Password: string;
}
interface UserRecord {
  UserID: number;
  Username: string;
  Email: string;
  PasswordHash: string;
  PrimaryRole: string;
  UniverseID: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    UserID: number;
    Username: string;
    Email: string;
    PrimaryRole: string;
    UniverseID: string;
  };
}

// export class SQLStorage {
// async loginUser({ Identifier, Password }: LoginParams): Promise<LoginResponse> {
//   try {
//     // ------------------------------------------
//     // 1. Fetch User using Stored Procedure (SAFE)
//     // ------------------------------------------
//     const results = await executeStoredProcedure<UserRecord>(
//       "sp_Getlogin",
//       { Identifier }
//     );
//     // user may be null
//     const user = results?.[0] || null;
//     // ------------------------------------------
//     // 2. Timing-Attack Safe Password Comparison
//     // ------------------------------------------
//     const fakeHash =
//       "$2b$10$CwTycUXWue0Thq9StjUM0uJ8Yx6z1hqqT3xGX8JYl/5uUQXsmHPG2"; // constant bcrypt hash
//     const storedHash = user?.PasswordHash?.trim() || fakeHash;
//     const enteredPassword = (Password || "").trim();
//     const passwordMatch = await bcrypt.compare(enteredPassword, storedHash);
//     // Always return same error to avoid revealing username existence
//     if (!user || !passwordMatch) {
//       return { success: false, message: "Invalid credentials" };
//     }
//     // ------------------------------------------
//     // 3. Update Last Login Time (SAFE)
//     // ------------------------------------------
//     const istDate = new Date(
//       new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
//     );
//     const formattedIST = istDate.toISOString().slice(0, 19).replace("T", " ");
//     await executeQuery(
//       `
//       UPDATE UserManagement
//       SET LastLoginAt = @LastLoginAt
//       WHERE UserID = @UserID
//       `,
//       { UserID: user.UserID, LastLoginAt: formattedIST }
//     );
//     // ------------------------------------------
//     // 4. Generate Secure JWT
//     // ------------------------------------------
//     if (!SECRET_KEY || SECRET_KEY.length < 32) {
//       throw new Error("JWT secret must be at least 32 characters long");
//     }
//     const token = jwt.sign(
//       {
//         UserID: user.UserID,
//         Username: user.Username,
//         PrimaryRole: user.PrimaryRole,
//       },
//       SECRET_KEY,
//       { expiresIn: "1h" }
//     );
//     return {
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         UserID: user.UserID,
//         Username: user.Username,
//         Email: user.Email,
//         PrimaryRole: user.PrimaryRole,
//         UniverseID: user.UniverseID,
//       },
//     };
//   } catch (err: any) {
//     // clean error logging (no sensitive data leaked)
//     logger.error(":x: Login failed", { message: err?.message });
//     return { success: false, message: "Login process failed" };
//   }
// }
// }

export class SQLStorage {
  async loginUser({ Identifier, Password }: LoginParams): Promise<LoginResponse> {
    try {
      // 1. Fetch user
      const results = await executeStoredProcedure<UserRecord>(
        "sp_Getlogin",
        { Identifier }
      );
      const user = results?.[0] || null;

      // 2. Timing-safe password check
      const fakeHash =
        "$2b$10$CwTycUXWue0Thq9StjUM0uJ8Yx6z1hqqT3xGX8JYl/5uUQXsmHPG2";
      const storedHash = user?.PasswordHash?.trim() || fakeHash;
      const enteredPassword = (Password || "").trim();

      const passwordMatch = await bcrypt.compare(
        enteredPassword,
        storedHash
      );

      if (!user || !passwordMatch) {
        return { success: false, message: "Invalid credentials" };
      }

      // 3. Update last login
      const istDate = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );
      const formattedIST = istDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      await executeQuery(
        `
        UPDATE UserManagement
        SET LastLoginAt = @LastLoginAt
        WHERE UserID = @UserID
        `,
        { UserID: user.UserID, LastLoginAt: formattedIST }
      );

    

      // 6. Create JWT
      if (!SECRET_KEY || SECRET_KEY.length < 32) {
        throw new Error("JWT secret must be at least 32 characters");
      }

      const token = jwt.sign(
        {
          UserID: user.UserID,
          Username: user.Username,     
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      // 7. Response
      return {
        success: true,
        message: "Login successful",
        token,
        user: {
          UserID: user.UserID,
          Username: user.Username,
          Email: user.Email,
          PrimaryRole: user.PrimaryRole,
          UniverseID: user.UniverseID
        },
      };
    } catch (err: any) {
      logger.error("Login failed", { message: err?.message });
      return { success: false, message: "Login process failed" };
    }
  }
}

export const storage = new SQLStorage();
