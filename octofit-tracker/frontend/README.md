# OctoFit Tracker – Frontend

React 19 + Vite presentation tier using `react-router-dom` for navigation and Bootstrap for styling.

## API configuration

The app reads the Codespace name from the Vite environment variable `VITE_CODESPACE_NAME`
(via `import.meta.env.VITE_CODESPACE_NAME`) and builds the API base URL from it:

| `VITE_CODESPACE_NAME` | API base URL |
| --------------------- | ------------ |
| set (e.g. `my-codespace`) | `https://my-codespace-8000.app.github.dev` |
| unset or invalid | `http://localhost:8000` (safe localhost fallback) |

**`VITE_CODESPACE_NAME` must be defined when running in GitHub Codespaces**, otherwise the
browser will try to reach `localhost:8000`. Define it in `octofit-tracker/frontend/.env.local`
(git-ignored), for example:

```bash
echo "VITE_CODESPACE_NAME=$CODESPACE_NAME" > octofit-tracker/frontend/.env.local
```

See `.env.example` for a template. The "Launch Vite Frontend" debug configuration in
`.vscode/launch.json` also passes it automatically from `$CODESPACE_NAME`.
Restart the Vite dev server after changing env files.

Endpoints consumed: `/api/activities/`, `/api/leaderboard/`, `/api/teams/`, `/api/users/`,
`/api/workouts/`. Both plain array responses and paginated responses
(`{ results: [...] }`, `{ data: [...] }`, or `{ items: [...] }`) are supported.

## Scripts

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend -- --host 0.0.0.0
npm run build --prefix octofit-tracker/frontend
npm run lint --prefix octofit-tracker/frontend
```
