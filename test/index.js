var fs = require('fs')
var chai = require('chai')
var expect = chai.expect
// Count all of the links from the io.js build page
var jsdom = require('jsdom')
const { JSDOM } = jsdom
var TEST_DATA = require('./data/json-data.js')()
var TEST_HTML = fs.readFileSync('./test/data/rendered.html').toString()

var GLOBAL = {
  window: {}
}
var tocbot
    
var content = fs.readFileSync('./test/data/sample-meat.html').toString()
var jsContent = fs.readFileSync('./static/js/tocbot.js').toString()

before(function (done) {
  const { window } = new JSDOM(content, { runScripts: "dangerously" })
  GLOBAL.window = window
  window.document.body.innerHTML = content
  const scriptEl = window.document.createElement("script")
  scriptEl.textContent = jsContent
  window.document.body.appendChild(scriptEl)
  tocbot = window.tocbot
  
  done()
})

beforeEach(function () {
  tocbot.init()
})

afterEach(function () {
  tocbot.destroy()
})

describe('Tocbot', function () {
  describe('#init', function () {
    it('should expose a global object', function () {
      expect(tocbot).to.not.equal(undefined)
    })

    it('should expose public functions', function () {
      expect(tocbot.init).to.be.a('function')
      expect(tocbot.destroy).to.be.a('function')
      expect(tocbot.refresh).to.be.a('function')
    })

    it('should add event listeners when initialized', function () {
      tocbot.destroy()
      var count = 0
      var args = []

      GLOBAL.window.document.addEventListener = function () {
        args.push([].slice.call(arguments))
        count++
      }

      tocbot.init()

      var eventTypes = args.map(function (arg) {
        return arg[0]
      })
      expect(eventTypes).to.contain('scroll')
      expect(eventTypes).to.contain('resize')
      expect(eventTypes).to.contain('click')
      // All 3 events are from tocbot.
      expect(count).to.equal(3)
    })

    it('should not throw an error if a content element isn\'t found', function () {
      tocbot.destroy()
      expect(tocbot.init).to.not.throw(Error)
      tocbot.init({
        tocSelector: '.missing'
      })
    })

    it('should not throw an error if a toc element isn\'t found', function () {
      tocbot.destroy()
      expect(tocbot.init).to.not.throw(Error)
      tocbot.init({
        contentSelector: '.not-here'
      })
    })
  })

  describe('#destroy', function () {
    it('should remove event listeners when destroyed', function () {
      var count = 0
      var args = []

      GLOBAL.window.document.removeEventListener = function () {
        args.push([].slice.call(arguments))
        count++
      }

      tocbot.destroy()

      var eventTypes = args.map(function (arg) {
        return arg[0]
      })
      expect(eventTypes).to.contain('scroll')
      expect(eventTypes).to.contain('resize')
      expect(eventTypes).to.contain('click')
      // All 3 events are from tocbot.
      expect(count).to.equal(3)
    })
  })
})

// Parse content
describe('Parse content', function () {
  it('#selectHeadings with default options', function () {
    var selectHeadings = tocbot._parseContent.selectHeadings
    var contentEl = GLOBAL.window.document.querySelector(tocbot.options.contentSelector)
    var defaultHeadings = selectHeadings(contentEl, tocbot.options.headingSelector)
    defaultHeadings = [].map.call(defaultHeadings, function (node) {
      return node.textContent
    })

    expect(defaultHeadings).to.eql([
      'Bacon',
      'Brisket',
      'Flank',
      'Pork',
      'Capicola',
      'Drumstick',
      'Pastrami',
      'Meatloaf',
      'Sirloin',
      'Pork belly',
      'Bresaola shankle',
      'Cow pancetta',
      'Turducken',
      'Alcatra',
      'Chuck',
      'Spare ribs',
      'Swine venison chicken',
      'Landjaeger',
      'Kevin capicola shank'
    ])
  })

  it('#selectHeadings with custom headingSelector option', function () {
    var selectHeadings = tocbot._parseContent.selectHeadings
    var contentEl = GLOBAL.window.document.querySelector(tocbot.options.contentSelector)
    var defaultHeadings = selectHeadings(contentEl, 'h1, h2')
    defaultHeadings = [].map.call(defaultHeadings, function (node) {
      return node.textContent
    })

    expect(defaultHeadings).to.eql([
      'Bacon',
      'Brisket',
      'Flank',
      'Capicola',
      'Sirloin',
      'Pork belly',
      'Bresaola shankle',
      'Cow pancetta',
      'Swine venison chicken',
      'Landjaeger'
    ])
  })

  it('#nestHeadingsArray', function () {
    var selectHeadings = tocbot._parseContent.selectHeadings
    var contentEl = GLOBAL.window.document.querySelector(tocbot.options.contentSelector)
    var defaultHeadings = selectHeadings(contentEl, tocbot.options.headingSelector)
    var nestHeadingsData = tocbot._parseContent.nestHeadingsArray(defaultHeadings)

    expect(nestHeadingsData.nest).to.eql(TEST_DATA)
  })
})

// Build HTML
describe('Build HTML', function () {
  it('#render', function () {
    tocbot.destroy()
    tocbot.init()
    var render = tocbot._buildHtml.render
    var tocEl = GLOBAL.window.document.querySelector(tocbot.options.tocSelector)
    var tocEl = render(tocEl, TEST_DATA)
    var html = TEST_HTML.split('\n').join('')
      .replace(/>\s+</g, '><') // Remove spaces between all elements.

    expect(html).to.contain(tocEl.innerHTML)
  })

  it('should be able to include HTML markup when `includeHtml` is true', function () {
    tocbot.destroy()
    tocbot.init({
      includeHtml: true
    })
    // includeHtml
    var render = tocbot._buildHtml.render
    var nodes = [
      GLOBAL.window.document.createTextNode('What'),
      GLOBAL.window.document.createElement('SUP')
    ]
    nodes[1].textContent = 'sup'
    var tocEl = GLOBAL.window.document.querySelector(tocbot.options.tocSelector)
    var tocEl = render(tocEl, [{
      'id': 'Whatsup',
      'children': [],
      'nodeName': 'H2',
      'headingLevel': 2,
      'textContent': 'Whatsup',
      'isCollapsed': true,
      'childNodes': nodes
    }])
    expect(tocEl.innerHTML).to.contain('What<sup>sup</sup>')
  })

  it('should not include HTML markup when `includeHtml` is false', function () {
    tocbot.destroy()
    tocbot.init({
      includeHtml: false
    })
    // includeHtml
    var render = tocbot._buildHtml.render
    var nodes = [
      GLOBAL.window.document.createTextNode('What'),
      GLOBAL.window.document.createElement('SUP')
    ]
    nodes[1].textContent = 'sup'
    var tocEl = GLOBAL.window.document.querySelector(tocbot.options.tocSelector)
    var tocEl = render(tocEl, [{
      'id': 'Whatsup',
      'children': [],
      'nodeName': 'H2',
      'headingLevel': 2,
      'textContent': 'Whatsup',
      'isCollapsed': true,
      'childNodes': nodes
    }])
    expect(tocEl.innerHTML).to.contain('<li class="toc-list-item"><a href="#Whatsup" class="toc-link node-name--H2 ">Whatsup</a></li>')
  })

  it('Should respect tocElement with missing tocSelector', function () {
    tocbot.destroy()
    var tocEl = GLOBAL.window.document.querySelector('.js-toc')
    tocbot.init({
      tocSelector: '.missing',
      tocElement: tocEl
    })
    var render = tocbot._buildHtml.render
    var tocEl = render(tocEl, TEST_DATA)
    var html = TEST_HTML.split('\n').join('')
      .replace(/>\s+</g, '><') // Remove spaces between all elements.

    expect(html).to.contain(tocEl.innerHTML)
  })
})

describe('Update TOC on scroll', function () {

  it('Should update TOC on scroll', function () {
    tocbot.destroy()
    tocbot.init()
    var render = tocbot._buildHtml.render
    var updateToc = tocbot._buildHtml.updateToc
    var tocEl = GLOBAL.window.document.querySelector(tocbot.options.tocSelector)
    var tocEl = render(tocEl, TEST_DATA)
    GLOBAL.window.document.documentElement.scrollTop = 300
    updateToc(tocbot._headingsArray)
    expect(tocEl.innerHTML).to.contain(tocbot.options.activeLinkClass)
    expect(tocEl.innerHTML).to.contain(tocbot.options.activeListItemClass)
  })

  it('Should update TOC on scroll using tocElement with missing tocSelector', function () {
    tocbot.destroy()
    var tocEl = GLOBAL.window.document.querySelector('.js-toc')
    tocbot.init({
      tocSelector: '.missing',
      tocElement: tocEl
    })
    var render = tocbot._buildHtml.render
    var updateToc = tocbot._buildHtml.updateToc
    var tocEl = render(tocEl, TEST_DATA)
    GLOBAL.window.document.documentElement.scrollTop = 300
    updateToc(tocbot._headingsArray)
    expect(tocEl.innerHTML).to.contain(tocbot.options.activeLinkClass)
    expect(tocEl.innerHTML).to.contain(tocbot.options.activeListItemClass)
  })

})
