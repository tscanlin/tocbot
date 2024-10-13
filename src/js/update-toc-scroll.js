const SCROLL_LEEWAY = 30
export default function updateTocScroll (options) {
  const toc = options.tocScrollingWrapper || options.tocElement || document.querySelector(options.tocSelector)
  if (toc && toc.scrollHeight > toc.clientHeight) {
    const activeItem = toc.querySelector(`.${options.activeListItemClass}`)
    if (activeItem) {
      // Determine container top and bottom
      const cTop = toc.scrollTop
      const cBottom = cTop + toc.clientHeight

      // Determine element top and bottom
      const eTop = activeItem.offsetTop
      const eBottom = eTop + activeItem.clientHeight

      // Check if out of view
      // Above scroll view
      if (eTop < cTop + options.tocScrollOffset) {
        toc.scrollTop -= (cTop - eTop) + options.tocScrollOffset
      // Below scroll view
      } else if (eBottom > cBottom - options.tocScrollOffset - SCROLL_LEEWAY) {
        toc.scrollTop += (eBottom - cBottom) + options.tocScrollOffset + (2 * SCROLL_LEEWAY)
      }
    }
  }
}
