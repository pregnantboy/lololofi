import { useSessionHistory } from 'hooks'

import styles from './Stats.module.scss'

export const Stats = () => {
  const { stats } = useSessionHistory()

  if (!stats.totalCount) {
    return null
  }

  const recentTasks = stats.recent.filter((s) => s.task)

  return (
    <div className={styles.container}>
      <p className={styles.today}>
        Today: {stats.todayCount} session{stats.todayCount === 1 ? '' : 's'},{' '}
        {stats.todayMinutes} min
      </p>
      {stats.streak > 1 && (
        <p className={styles.streak}>{stats.streak} day streak</p>
      )}
      {recentTasks.length > 0 && (
        <ul className={styles.recent}>
          {recentTasks.map((session) => (
            <li key={session.completedAt}>{session.task}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
