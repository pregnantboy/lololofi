import { useCallback, useMemo } from 'react'
import { useLocalStorage } from 'react-use'

import { getSessionStats, SessionRecord } from 'utils/sessions'

export type { SessionRecord }

const SESSION_HISTORY_STORAGE_KEY = 'LOLOLOFI_SESSION_HISTORY'
const MAX_STORED_SESSIONS = 100

export function useSessionHistory() {
  const [stored, setStored] = useLocalStorage<SessionRecord[]>(
    SESSION_HISTORY_STORAGE_KEY,
    []
  )

  const sessions = useMemo(() => stored ?? [], [stored])

  const addSession = useCallback(
    (session: SessionRecord) => {
      setStored((prev) =>
        [...(prev ?? []), session].slice(-MAX_STORED_SESSIONS)
      )
    },
    [setStored]
  )

  const stats = useMemo(() => getSessionStats(sessions), [sessions])

  return { sessions, addSession, stats }
}
