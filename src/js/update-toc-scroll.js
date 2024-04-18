/* eslint no-var: off */

const SCROLL_LEEWAY = 30
export default function updateTocScroll (options) {
  var toc = options.tocElement || document.querySelector(options.tocSelector)
  if (toc && toc.scrollHeight > toc.clientHeight) {
    var activeItem = toc.querySelector('.' + options.activeListItemClass)
    if (activeItem) {
      // Determine container top and bottom
      var cTop = toc.scrollTop
      var cBottom = cTop + toc.clientHeight

      // Determine element top and bottom
      var eTop = activeItem.offsetTop
      var eBottom = eTop + activeItem.clientHeight

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
