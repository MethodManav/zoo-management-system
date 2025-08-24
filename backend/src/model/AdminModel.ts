import mongoose, { Schema } from "mongoose";
import z from "zod";

export const AdminValidation = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});
export type AdminType = z.infer<typeof AdminValidation>;

const AdminSchema = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 100 },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: /\S+@\S+\.\S+/,
  },
  password: { type: String, required: true, minlength: 6, maxlength: 100 },
});

const Admin = mongoose.model<AdminType>("Admin", AdminSchema);
export default Admin;
