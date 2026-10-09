import { model, Schema } from 'mongoose';

export interface Workout {
  name: string;
  focus: string;
  difficulty: string;
  durationMinutes: number;
  exercises: string[];
}

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    focus: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ type: String, required: true }],
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
