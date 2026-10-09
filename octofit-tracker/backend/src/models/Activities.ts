import { model, Schema, Types } from 'mongoose';

export interface Activity {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  calories: number;
  completedAt: Date;
}

const activitySchema = new Schema<Activity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    calories: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export default model<Activity>('Activity', activitySchema);
