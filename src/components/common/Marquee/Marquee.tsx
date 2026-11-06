import { useLayoutEffect, useRef, useState } from 'react'

import styles from './Marquee.module.scss'

interface MarqueeProps {
  children: string
  /** Freezes the text in place without resetting its position. */
  paused?: boolean
  /** Scroll speed in pixels per second. */
  speed?: number
}

/**
 * Endlessly scrolling text. Two copies sit side by side and the track slides
 * left by exactly one copy's width, so the loop is seamless.
 */
export const Marquee = ({
  children,
  paused = false,
  speed = 30,
}: MarqueeProps) => {
  const itemRef = useRef<HTMLSpanElement>(null)
  const [duration, setDuration] = useState(0)

  useLayoutEffect(() => {
    const item = itemRef.current
    if (!item) {
      return
    }
    const update = () => setDuration(item.offsetWidth / speed)
    update()

    const observer = new ResizeObserver(update)
    observer.observe(item)
    return () => observer.disconnect()
  }, [children, speed])

  return (
    <div className={styles.container}>
      <div
        className={styles.track}
        style={{
          animationDuration: duration ? `${duration}s` : undefined,
          animationPlayState: paused || !duration ? 'paused' : 'running',
        }}
      >
        <span ref={itemRef} className={styles.item}>
          {children}
        </span>
        <span className={styles.item} aria-hidden="true">
          {children}
        </span>
      </div>
    </div>
  )
}
