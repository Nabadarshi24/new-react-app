import mongoose from "mongoose";

interface IAspect {
  label: string;
  value: string;
  type: string;
}

const aspectSchema = new mongoose.Schema<IAspect>({
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