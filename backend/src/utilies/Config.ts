import dotenv from "dotenv";
dotenv.config();

export const EnvParser = {
  db_url: process.env.DB_URL as string,
  db_app: process.env.DB_APP as string,
  s3: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
    region: process.env.S3_REGION as string,
    bucketName: process.env.S3_BUCKET_NAME as string,
  },
  jwt_secret: process.env.JWT_SECRET as string,
};
