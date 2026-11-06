export interface SessionRecord {
  task: string
  minutes: number
  /** Epoch ms of when the session finished. */
  completedAt: number
}

const dayKey = (date: Date) => date.toDateString()

/**
 * Consecutive days with at least one completed session, ending today (or
 * yesterday, since today may not have a session yet). Walks the calendar with
 * setDate rather than subtracting 24h so DST transitions cannot skip a day.
 */
export function getStreak(sessions: SessionRecord[], now = new Date()) {
  if (!sessions.length) {
    return 0
  }

  const days = new Set(sessions.map((s) => dayKey(new Date(s.completedAt))))
  const cursor = new Date(now)

  if (!days.has(dayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1)
    if (!days.has(dayKey(cursor))) {
      return 0
    }
  }

  let streak = 0
  while (days.has(dayKey(cursor))) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function getSessionStats(sessions: SessionRecord[], now = new Date()) {
  const today = dayKey(now)
  const todaySessions = sessions.filter(
    (s) => dayKey(new Date(s.completedAt)) === today
  )
  return {
    todayCount: todaySessions.length,
    todayMinutes: todaySessions.reduce((sum, s) => sum + s.minutes, 0),
    totalCount: sessions.length,
    streak: getStreak(sessions, now),
    recent: [...sessions].reverse().slice(0, 3),
  }
}
