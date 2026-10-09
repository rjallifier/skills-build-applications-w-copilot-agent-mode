import { displayName, formatDate } from '../formatters.js'
import DataTable from './DataTable.jsx'

const columns = [
  { header: 'User', render: (activity) => displayName(activity.user) },
  { header: 'Type', render: (activity) => displayName(activity.type ?? activity.activity_type) },
  {
    header: 'Duration',
    render: (activity) => `${activity.durationMinutes ?? activity.duration ?? 0} min`,
  },
  { header: 'Calories', render: (activity) => activity.calories ?? '—' },
  { header: 'Date', render: (activity) => formatDate(activity.completedAt ?? activity.date) },
]

function Activities() {
  return <DataTable title="Activities" endpoint="activities" columns={columns} />
}

export default Activities
