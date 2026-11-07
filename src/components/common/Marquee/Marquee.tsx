import { CSSProperties, useLayoutEffect, useRef, useState } from 'react'
import cx from 'classnames'

import styles from './Marquee.module.scss'

interface MarqueeProps {
  children: string
  /** Freezes the text in place without resetting its position. */
  paused?: boolean
  /** Scroll speed in pixels per second. */
  speed?: number
}

/**
 * Endlessly scrolling text, but only when it does not fit. Two copies sit side
 * by side and the track slides left by one copy plus the gap, so the loop is
 * seamless. Short text stays still.
 */
export const Marquee = ({
  children,
  paused = false,
  speed = 30,
}: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLSpanElement>(null)
  const [itemWidth, setItemWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  useLayoutEffect(() => {
    const container = containerRef.current
    const item = itemRef.current
    if (!container || !item) {
      return
    }
    const update = () => {
      setItemWidth(item.offsetWidth)
      setContainerWidth(container.clientWidth)
    }
    update()

    const observer = new ResizeObserver(update)
    observer.observe(item)
    observer.observe(container)
    return () => observer.disconnect()
  }, [children])

  const isScrolling = itemWidth > containerWidth
  const trackStyle: CSSProperties = {}
  if (isScrolling) {
    // Item width plus the 3rem gap in the stylesheet.
    Object.assign(trackStyle, {
      '--marquee-distance': `calc(${itemWidth}px + 3rem)`,
      animationDuration: `${itemWidth / speed}s`,
      animationPlayState: paused ? 'paused' : 'running',
    })
  }

  return (
    <div
      ref={containerRef}
      className={cx(styles.container, { [styles.fade]: isScrolling })}
    >
      <div
        className={cx(styles.track, { [styles.scrolling]: isScrolling })}
        style={trackStyle}
      >
        <span ref={itemRef} className={styles.item}>
          {children}
        </span>
        {isScrolling && (
          <span className={styles.item} aria-hidden="true">
            {children}
          </span>
        )}
      </div>
    </div>
  )
}
