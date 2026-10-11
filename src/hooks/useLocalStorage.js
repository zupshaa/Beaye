import { useState, useEffect } from 'react'

const PREFIX = 'bday:'

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(PREFIX + key)
      return raw !== null ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch {
      /* storage unavailable (private mode etc.) - app still works in memory */
    }
  }, [key, value])

  return [value, setValue]
}
