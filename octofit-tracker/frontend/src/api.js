import { useEffect, useState } from 'react'

const LOCAL_API_BASE_URL = 'http://localhost:8000'

// Codespace names only contain letters, digits, and hyphens; reject anything else
// so a malformed value can never point requests at an unexpected host.
const CODESPACE_NAME_PATTERN = /^[a-z0-9-]+$/i

function resolveApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName && CODESPACE_NAME_PATTERN.test(codespaceName)) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  if (codespaceName) {
    console.warn('Ignoring invalid VITE_CODESPACE_NAME; falling back to localhost API.')
  } else {
    console.info('VITE_CODESPACE_NAME is not set; using localhost API at', LOCAL_API_BASE_URL)
  }

  return LOCAL_API_BASE_URL
}

export const API_BASE_URL = resolveApiBaseUrl()

export function buildApiUrl(endpoint) {
  return `${API_BASE_URL}/api/${endpoint}/`
}

// Accepts plain arrays as well as paginated payloads such as
// { results: [...] } (DRF-style), { data: [...] }, or { items: [...] }.
export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'data', 'items']) {
      if (Array.isArray(payload[key])) {
        return payload[key]
      }
    }
  }

  return []
}

export async function fetchCollection(endpoint, { signal } = {}) {
  const url = buildApiUrl(endpoint)
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } })

  if (!response.ok) {
    throw new Error(`Request to ${url} failed with status ${response.status}`)
  }

  return normalizeCollection(await response.json())
}

export function useApiCollection(endpoint) {
  const [state, setState] = useState({ items: [], loading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(endpoint, { signal: controller.signal })
      .then((items) => setState({ items, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({ items: [], loading: false, error })
        }
      })

    return () => controller.abort()
  }, [endpoint])

  return state
}
