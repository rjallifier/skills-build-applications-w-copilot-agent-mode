import { displayName } from '../formatters.js'
import DataTable from './DataTable.jsx'

const columns = [
  { header: 'Team', render: (team) => <strong>{displayName(team.name)}</strong> },
  { header: 'Description', render: (team) => team.description ?? '—' },
  {
    header: 'Members',
    render: (team) => {
      const members = Array.isArray(team.members) ? team.members : []
      return members.length > 0 ? members.map((member) => displayName(member)).join(', ') : '—'
    },
  },
]

function Teams() {
  return <DataTable title="Teams" endpoint="teams" columns={columns} />
}

export default Teams
