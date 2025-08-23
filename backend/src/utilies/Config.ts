import dotenv from "dotenv";
dotenv.config();

export const EnvParser = {
  db_url: process.env.DB_URL as string,
  db_app: process.env.DB_APP as string,
};
