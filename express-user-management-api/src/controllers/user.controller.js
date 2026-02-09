import { MantaClient } from "mantahq-sdk";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { logger } from "../utils/logger.js";

// In-memory database
const users = new Map();
let nextId = 1;

const manta = new MantaClient({
  sdkKey: process.env.MANTAHQ_SDK_KEY, // Replace with your actual API key
});

export class UserController {
  // Create a user
  createUser = async (req, res) => {
    try {
      const { name, email, age } = req.body;

      // Check if email already exists
      const existingUser = Array.from(users.values()).find(
        (user) => user.email === email
      );

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: "Email already registered",
        });
      }

      const user = {
        id: nextId++,
        name,
        email,
        age: age || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      users.set(user.id, user);

      logger.info("User created", { userId: user.id, email });

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      logger.error("Error creating user", error);
      res.status(HTTP_STATUS.INTERNAL_ERROR).json({
        success: false,
        error: "Internal server error",
      });
    }
  };

  // Get all users with optional query params
  getUsers = async (req, res) => {
    try {
      const users = await manta.fetchAllRecords({
        db: "my-app-pg-db",
        table: "users",
        fields: ["username", "email"],
      });

      logger.info("Users fetched", { users: users });

      res.status(HTTP_STATUS.OK).json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (error) {
      logger.error("Error fetching users", error);
      res.status(HTTP_STATUS.INTERNAL_ERROR).json({
        success: false,
        error: "Internal server error",
      });
    }
  };
}

export default new UserController();
