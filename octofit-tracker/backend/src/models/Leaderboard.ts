import { model, Schema, Types } from 'mongoose';

export interface LeaderboardEntry {
  user: Types.ObjectId;
  points: number;
  rank: number;
  period: string;
}

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true },
  },
  { timestamps: true },
);

export default model('Leaderboard', leaderboardSchema);
