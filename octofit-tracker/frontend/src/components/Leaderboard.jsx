import { displayName } from '../formatters.js'
import { buildApiUrl } from '../api.js'
import DataTable from './DataTable.jsx'

const ENDPOINT = '/api/leaderboard/'

function loadLeaderboard(signal) {
  return fetch(buildApiUrl(ENDPOINT), { signal, headers: { Accept: 'application/json' } })
}

const columns = [
  {
    header: 'Rank',
    render: (entry, index) => (
      <span className="badge text-bg-primary">#{entry.rank ?? index + 1}</span>
    ),
  },
  { header: 'User', render: (entry) => displayName(entry.user ?? entry.team) },
  { header: 'Points', render: (entry) => entry.points ?? entry.score ?? 0 },
  { header: 'Period', render: (entry) => entry.period ?? '—' },
]

function Leaderboard() {
  return <DataTable title="Leaderboard" endpoint={ENDPOINT} load={loadLeaderboard} columns={columns} />
}

export default Leaderboard
