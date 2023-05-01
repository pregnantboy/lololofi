export const isIphone = /(iPhone|iPod)/g.test(navigator.userAgent)
export const isIos =
  /(iPad|iPhone|iPod)/g.test(navigator.userAgent) || // iPad on iOS 13 detection
  (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
