import { displayName } from '../formatters.js'
import { buildApiUrl } from '../api.js'
import DataTable from './DataTable.jsx'

const ENDPOINT = '/api/users/'

function loadUsers(signal) {
  return fetch(buildApiUrl(ENDPOINT), { signal, headers: { Accept: 'application/json' } })
}

const columns = [
  { header: 'Name', render: (user) => displayName(user.name ?? user.username) },
  { header: 'Email', render: (user) => user.email ?? '—' },
  {
    header: 'Level',
    render: (user) => (user.level ? <span className="badge text-bg-secondary">{user.level}</span> : '—'),
  },
]

function Users() {
  return <DataTable title="Users" endpoint={ENDPOINT} load={loadUsers} columns={columns} />
}

export default Users
