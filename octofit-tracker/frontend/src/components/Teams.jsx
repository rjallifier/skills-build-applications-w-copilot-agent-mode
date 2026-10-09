import { displayName } from '../formatters.js'
import { buildApiUrl } from '../api.js'
import DataTable from './DataTable.jsx'

const ENDPOINT = '/api/teams/'

function loadTeams(signal) {
  return fetch(buildApiUrl(ENDPOINT), { signal, headers: { Accept: 'application/json' } })
}

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
  return <DataTable title="Teams" endpoint={ENDPOINT} load={loadTeams} columns={columns} />
}

export default Teams
