import mongoose, { Schema } from "mongoose";
import z, { number } from "zod";

export enum VisitorType {
  INDIVIDUAL = "Individual",
  FAMILY = "Family",
  FOREIGN_TOURIST = "Foreign Tourist",
  SCHOOL = "School",
}

export const VisitorSchema = z.object({
  name: z.string().min(2).max(100),
  mobile: z.string().min(10).max(15),
  visitorType: z.nativeEnum(VisitorType),
  memberOfFamily: z.number().min(1),
  dateOfBooking: z.string(),
  amount: z.number().min(0),
});

export type VisitorValidation = z.infer<typeof VisitorSchema>;

const VisitorSchemaMongoose = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 100 },
  mobile: { type: String, required: true, minlength: 10, maxlength: 15 },
  visitorType: {
    type: String,
    enum: Object.values(VisitorType),
    required: true,
  },
  memberOfFamily: { type: Number, required: true, min: 1 },
  dateOfBooking: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
});

const VisitorModel = mongoose.model<VisitorValidation>(
  "Visitor",
  VisitorSchemaMongoose
);

export default VisitorModel;
