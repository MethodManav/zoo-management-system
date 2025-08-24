import { S3 } from "aws-sdk";

export class S3Config {
  private s3: S3;

  constructor(
    accessKeyId: string,
    secretAccessKey: string,
    region: string,
    bucketName: string
  ) {
    this.s3 = new S3({
      accessKeyId,
      secretAccessKey,
      region,
    });
    this.bucketName = bucketName;
  }

  private bucketName: string;

  getS3Instance(): S3 {
    return this.s3;
  }

  getBucketName(): string {
    return this.bucketName;
  }
}
