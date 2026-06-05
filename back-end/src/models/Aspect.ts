import mongoose from "mongoose";

interface IAspect {
  id: string;
  label: string;
  value: string;
  type: string;
}

const aspectSchema = new mongoose.Schema<IAspect>({
  id: {
    type: String,
    unique: true,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["category", "gender", "color", "size", "material", "brand"],
    required: true
  }
});

export const Aspect = mongoose.model<IAspect>("Aspect", aspectSchema);