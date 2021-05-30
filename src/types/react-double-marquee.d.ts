declare module 'react-double-marquee' {
  export interface MarqueeProps {
    speed: number
    delay: number
    direction: 'right' | 'left'
    childMargin: number
    children: React.ReactNode
    scrollWhen: 'overflow' | 'always'
    [otherProps: string]: any
  }
  export default function Marquee(props: Partial<MarqueeProps>): Component
}
