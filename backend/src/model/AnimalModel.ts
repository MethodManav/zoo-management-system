import mongoose, { Schema } from "mongoose";
import z from "zod";

export const AnimalValidation = z.object({
  name: z.string().min(2).max(100),
  habitat: z.enum(["terrestrial", "aquatic", "aerial"]),
  weight: z.number().min(0).optional(),
  height: z.number().min(0).optional(),
  age: z.number().min(0).optional(),
  image: z.string().min(2).max(100).optional(),
  medicalCondition: z.string().min(2).max(100).optional(),
  descriptions: z.array(z.string().min(2).max(100)).optional(),
  lifespan: z.string().min(2).max(100).optional(),
});

//update schema
export const UpdateAnimalValidation = AnimalValidation.partial();

type Animal = z.infer<typeof AnimalValidation>;

export interface IAnimalDoc extends Animal, Document {}

export enum AnimalHabitat {
  TERRESTRIAL = "terrestrial",
  AQUATIC = "aquatic",
  AERIAL = "aerial",
}

const AnimalSchemaMongoose = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 100 },
  habitat: { type: String, enum: Object.values(AnimalHabitat), required: true },
  weight: { type: Number, min: 0, required: false },
  height: { type: Number, min: 0, required: false },
  age: { type: Number, min: 0, required: false },
  image: { type: String, minlength: 2, maxlength: 100, required: false },
  medicalCondition: {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: false,
  },
  descriptions: {
    type: [String],
    minlength: 2,
    maxlength: 100,
    required: false,
  },
  lifespan: { type: String, minlength: 2, maxlength: 100, required: false },
});

const AnimalModel = mongoose.model<Animal>("Animal", AnimalSchemaMongoose);

export default AnimalModel;
