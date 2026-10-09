export function getId(item, index) {
  return item?._id ?? item?.id ?? index
}

export function displayName(value, fallback = '—') {
  if (value == null || value === '') {
    return fallback
  }
  if (typeof value === 'object') {
    return value.name ?? value.username ?? value.email ?? fallback
  }
  return String(value)
}

export function formatDate(value) {
  if (!value) {
    return '—'
  }
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString()
}
