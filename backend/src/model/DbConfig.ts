import mongoose, { Connection } from "mongoose";
import { EnvParser } from "../utilies/Config";
import { logger } from "../utilies/Logger";

const uri = EnvParser.db_url;
const dbName = EnvParser.db_app;

export class DatabaseConfig {
  private connection?: Connection;

  async connect(): Promise<Connection> {
    try {
      await mongoose.connect(uri, { dbName });
      this.connection = mongoose.connection;
      console.log("Connected to MongoDB with Mongoose");

      if (this.connection && this.connection.db) {
        const collections = await this.connection.db
          .listCollections()
          .toArray();
        const collectionNames = collections.map((col) => col.name);
        logger.info(
          `Database: ${dbName} is connected with collections: ${collectionNames.join(
            ", "
          )}`
        );
      } else {
        logger.warn(
          `Database: ${dbName} is connected, but unable to list collections.`
        );
      }
      return this.connection;
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw new Error("Failed to connect to MongoDB");
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    }
  }

  getDb(): Connection | undefined {
    return this.connection;
  }
}
