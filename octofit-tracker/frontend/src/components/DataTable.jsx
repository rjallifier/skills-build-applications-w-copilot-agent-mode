import { buildApiUrl, useApiCollection } from '../api.js'
import { getId } from '../formatters.js'

function DataTable({ title, endpoint, columns, emptyMessage }) {
  const { items, loading, error } = useApiCollection(endpoint)

  return (
    <section className="card shadow-sm">
      <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-2">
        <h2 className="h4 mb-0">{title}</h2>
        <code className="small text-muted">{buildApiUrl(endpoint)}</code>
      </div>
      <div className="card-body">
        {loading && (
          <div className="d-flex align-items-center gap-2" role="status">
            <div className="spinner-border spinner-border-sm" aria-hidden="true" />
            <span>Loading {title.toLowerCase()}…</span>
          </div>
        )}

        {error && (
          <div className="alert alert-danger mb-0" role="alert">
            Unable to load {title.toLowerCase()}: {error.message}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="text-muted mb-0">{emptyMessage ?? `No ${title.toLowerCase()} found.`}</p>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  {columns.map((column) => (
                    <th key={column.header} scope="col">
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={getId(item, index)}>
                    {columns.map((column) => (
                      <td key={column.header}>{column.render(item, index)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default DataTable
