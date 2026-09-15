import { useEffect, useState } from 'react'
import { fetchCollection } from './api.js'

export function useCollection(resource) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(resource, controller.signal)
      .then((data) => {
        setItems(data)
        setStatus('ready')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('error')
      })

    return () => controller.abort()
  }, [resource])

  return { items, status }
}