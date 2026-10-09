import { displayName } from '../formatters.js'
import DataTable from './DataTable.jsx'

const columns = [
  { header: 'Name', render: (user) => displayName(user.name ?? user.username) },
  { header: 'Email', render: (user) => user.email ?? '—' },
  {
    header: 'Level',
    render: (user) => (user.level ? <span className="badge text-bg-secondary">{user.level}</span> : '—'),
  },
]

function Users() {
  return <DataTable title="Users" endpoint="users" columns={columns} />
}

export default Users
