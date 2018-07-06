var headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, h7')
var headingMap = {}

[].forEach.call(headings, function(heading) {
  var id = heading.textContent.toLowerCase().split(' ').join('-')
  headingMap[id] = !isNaN(headingMap[id]) ? headingMap[id]++ : 0
  if (headingMap[id]) {
    heading.id = id + '-' + headingMap[id]
  } else {
    heading.id = id
  }
})
