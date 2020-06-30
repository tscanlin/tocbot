function updateVisibleToc() {
  var tocs = document.getElementsByClassName('js-toc')
  if (tocs.length > 0) {
    var activeItem = tocs[0].getElementsByClassName('is-active-li')
    if (activeItem.length > 0) {
      tocs[0].scrollTop = activeItem[0].offsetTop
    }
  }
}
