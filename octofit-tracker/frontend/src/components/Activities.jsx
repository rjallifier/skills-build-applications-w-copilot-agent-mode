import { displayName, formatDate } from '../formatters.js'
import { buildApiUrl } from '../api.js'
import DataTable from './DataTable.jsx'

const ENDPOINT = '/api/activities/'

function loadActivities(signal) {
  return fetch(buildApiUrl(ENDPOINT), { signal, headers: { Accept: 'application/json' } })
}

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
  return <DataTable title="Activities" endpoint={ENDPOINT} load={loadActivities} columns={columns} />
}

export default Activities
