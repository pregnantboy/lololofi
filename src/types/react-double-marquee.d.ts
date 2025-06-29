declare module 'react-double-marquee' {
  import { ReactNode } from 'react'

  export interface MarqueeProps {
    speed?: number
    delay?: number
    direction?: 'right' | 'left'
    childMargin?: number
    children: ReactNode
    scrollWhen?: 'overflow' | 'always'
  }

  const Marquee: React.FC<Partial<MarqueeProps>>
  export default Marquee
}
