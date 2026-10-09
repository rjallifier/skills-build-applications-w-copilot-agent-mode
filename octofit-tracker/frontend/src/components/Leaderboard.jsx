import { displayName } from '../formatters.js'
import DataTable from './DataTable.jsx'

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
  return <DataTable title="Leaderboard" endpoint="leaderboard" columns={columns} />
}

export default Leaderboard
