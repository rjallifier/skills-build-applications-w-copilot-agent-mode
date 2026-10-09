import express, { type RequestHandler } from 'express';
import { connectDatabase } from './config/database.js';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function collectionHandler<T>(find: () => Promise<T[]>): RequestHandler {
  return async (_request, response, next) => {
    try {
      response.json(await find());
    } catch (error) {
      next(error);
    }
  };
}

const errorHandler: express.ErrorRequestHandler = (error, _request, response, _next) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Unable to load requested data' });
};

app.use(express.json());

app.get('/api/health/', (_request, response) => {
  response.json({ status: 'ok', baseUrl });
});

app.get('/api/users/', collectionHandler(() => User.find().sort({ name: 1 }).lean()));
app.get('/api/teams/', collectionHandler(() => Team.find().populate('members', 'name email').lean()));
app.get('/api/activities/', collectionHandler(() => Activity.find().populate('user', 'name').sort({ completedAt: -1 }).lean()));
app.get('/api/leaderboard/', collectionHandler(() => Leaderboard.find().populate('user', 'name').sort({ rank: 1 }).lean()));
app.get('/api/workouts/', collectionHandler(() => Workout.find().sort({ name: 1 }).lean()));

app.use(errorHandler);

export { app, baseUrl };

export async function startServer() {
  await connectDatabase();
  return app.listen(port, () => {
    console.log(`OctoFit API listening at ${baseUrl}`);
  });
}
