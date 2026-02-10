import { MantaClient } from "mantahq-sdk";
import dotenv from "dotenv";

import { HTTP_STATUS } from "../constants/httpStatus.js";
import { logger } from "../utils/logger.js";

dotenv.config();

const manta = new MantaClient({
  sdkKey: process.env.MANTAHQ_SDK_KEY, // Replace with your actual API key
});

export class UserController {
  // Create a user
  createUser = async (req, res) => {
    try {
      const { name, email } = req.body;

      const addUser = await manta.createRecords({
        db: "my-app-pg-db",
        table: "users_test",
        data: [
          {
            email,
            username: name,
            userid: Math.random(),
          },
        ],
      });

      if (addUser?.status) {
        return res.status(HTTP_STATUS.CREATED).json({
          success: true,
          message: "User created successfully",
        });
      }
    } catch (error) {
      logger.error("Error creating user", error);
      res.status(HTTP_STATUS.INTERNAL_ERROR).json({
        success: false,
        error: error.message,
      });
    }
  };

  // Get all users with optional query params
  getUsers = async (req, res) => {
    try {
      const users = await manta.fetchAllRecords({
        db: "my-app-pg-db",
        table: "users_test",
        fields: ["username", "email"],
        limit: 10,
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
        error: error.message,
      });
    }
  };
}

export default new UserController();
