import mongoose from 'mongoose';
import { connectionString } from '../config/database.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const [mona, alex, priya] = await User.create([
            { name: 'Mona', email: 'mona@octofit.example', level: 'Gold' },
            { name: 'Alex', email: 'alex@octofit.example', level: 'Silver' },
            { name: 'Priya', email: 'priya@octofit.example', level: 'Gold' },
        ]);
        const octocats = await Team.create({
            name: 'Octocats',
            description: 'A friendly team focused on consistent daily movement.',
            members: [mona._id, alex._id],
        });
        const codeRunners = await Team.create({
            name: 'Code Runners',
            description: 'High-energy workouts for busy builders.',
            members: [priya._id],
        });
        await Activity.create([
            { user: mona._id, type: 'Running', durationMinutes: 35, calories: 320, completedAt: new Date('2026-10-07') },
            { user: alex._id, type: 'Cycling', durationMinutes: 45, calories: 410, completedAt: new Date('2026-10-08') },
            { user: priya._id, type: 'Strength', durationMinutes: 30, calories: 250, completedAt: new Date('2026-10-08') },
        ]);
        await Leaderboard.create([
            { user: mona._id, points: 1280, rank: 1, period: 'October 2026' },
            { user: priya._id, points: 1135, rank: 2, period: 'October 2026' },
            { user: alex._id, points: 980, rank: 3, period: 'October 2026' },
        ]);
        await Workout.create([
            {
                name: 'Morning Momentum',
                focus: 'Full body',
                difficulty: 'Beginner',
                durationMinutes: 20,
                exercises: ['Bodyweight squats', 'Push-ups', 'Plank'],
            },
            {
                name: 'Runner Strength',
                focus: 'Legs and core',
                difficulty: 'Intermediate',
                durationMinutes: 35,
                exercises: ['Lunges', 'Glute bridges', 'Mountain climbers'],
            },
        ]);
        console.log(`Seeded ${[mona, alex, priya].length} users, ${[octocats, codeRunners].length} teams, and activity, leaderboard, and workout data`);
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
