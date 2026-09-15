const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload

  const collection = payload?.results ?? payload?.items ?? payload?.data
  return Array.isArray(collection) ? collection : []
}

export async function fetchCollection(resource, signal) {
  const response = await fetch(`${API_BASE_URL}/${resource}/`, { signal })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return normalizeCollection(await response.json())
}