import { ComponentPropsWithoutRef } from 'react'

type IconProps = ComponentPropsWithoutRef<'svg'>

const Svg = ({ children, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    {children}
  </svg>
)

export const PlayIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
  </Svg>
)

export const PauseIcon = (props: IconProps) => (
  <Svg {...props}>
    <rect x="6.5" y="5" width="4" height="14" rx="1" fill="currentColor" />
    <rect x="13.5" y="5" width="4" height="14" rx="1" fill="currentColor" />
  </Svg>
)

export const PrevIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M18.5 6v12L9 12z" fill="currentColor" />
    <path d="M6 5.5v13" />
  </Svg>
)

export const NextIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M5.5 6v12L15 12z" fill="currentColor" />
    <path d="M18 5.5v13" />
  </Svg>
)

export const VolumeIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 9.5v5h3.5l4.5 4v-13l-4.5 4z" fill="currentColor" />
    <path d="M15.5 9a4 4 0 0 1 0 6" />
    <path d="M18 6.5a8 8 0 0 1 0 11" />
  </Svg>
)

export const MuteIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 9.5v5h3.5l4.5 4v-13l-4.5 4z" fill="currentColor" />
    <path d="M16 9.5l5 5M21 9.5l-5 5" />
  </Svg>
)

export const FullscreenIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </Svg>
)

export const ExitFullscreenIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
  </Svg>
)

export const RainIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M7 15a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 8a3.5 3.5 0 0 1 .5 7z" />
    <path d="M8 18.5l-1 2M12 18.5l-1 2M16 18.5l-1 2" />
  </Svg>
)

export const UmbrellaIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 3.5a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z" />
    <path d="M12 12.5v6a2 2 0 0 1-4 0" />
  </Svg>
)

export const ExternalLinkIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </Svg>
)

export const SpinnerIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 3a9 9 0 1 0 9 9" />
  </Svg>
)
