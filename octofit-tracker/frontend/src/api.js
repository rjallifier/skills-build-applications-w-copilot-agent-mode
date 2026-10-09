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

export function buildApiUrl(path) {
  return `${API_BASE_URL}${path}`
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

async function readCollection(response) {
  if (!response.ok) {
    throw new Error(`Request to ${response.url} failed with status ${response.status}`)
  }

  return normalizeCollection(await response.json())
}

// `load` receives an AbortSignal and must resolve to a fetch Response.
// Define it at module scope so it stays referentially stable across renders.
export function useApiCollection(load) {
  const [state, setState] = useState({ items: [], loading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()

    load(controller.signal)
      .then(readCollection)
      .then((items) => setState({ items, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({ items: [], loading: false, error })
        }
      })

    return () => controller.abort()
  }, [load])

  return state
}
