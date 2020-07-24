module.exports = function updateTocScroll(options) {
  var toc = document.querySelector(options.tocSelector)
  if (toc && toc.scrollHeight > toc.clientHeight) {
    var activeItem = toc.querySelector('.' + options.activeListItemClass)
    if (activeItem) {
      toc.scrollTop = activeItem.offsetTop
    }
  }
}
