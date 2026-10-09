import { displayName } from '../formatters.js'
import DataTable from './DataTable.jsx'

const columns = [
  { header: 'Workout', render: (workout) => <strong>{displayName(workout.name)}</strong> },
  { header: 'Focus', render: (workout) => workout.focus ?? '—' },
  { header: 'Difficulty', render: (workout) => workout.difficulty ?? '—' },
  {
    header: 'Duration',
    render: (workout) => (workout.durationMinutes != null ? `${workout.durationMinutes} min` : '—'),
  },
  {
    header: 'Exercises',
    render: (workout) =>
      Array.isArray(workout.exercises) && workout.exercises.length > 0
        ? workout.exercises.join(', ')
        : workout.description ?? '—',
  },
]

function Workouts() {
  return <DataTable title="Workouts" endpoint="workouts" columns={columns} />
}

export default Workouts
