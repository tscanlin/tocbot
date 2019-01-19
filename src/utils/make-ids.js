var content = document.querySelector('.js-toc-content')
var headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6, h7')
var headingMap = {}

Array.prototype.forEach.call(headings, function(heading) {
  if (!heading.id) {
    var id = heading.textContent.toLowerCase()
      .split(' ').join('-').split(':').join('')
    headingMap[id] = !isNaN(headingMap[id]) ? headingMap[id]++ : 0
    if (headingMap[id]) {
      heading.id = id + '-' + headingMap[id]
    } else {
      heading.id = id
    }
  }
})
