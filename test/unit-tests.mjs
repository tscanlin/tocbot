export default function (expect, window, tocbot, TEST_DATA, TEST_HTML) {
  beforeEach(function () {
    tocbot.init()
  })

  afterEach(function () {
    tocbot.destroy()
  })

  describe('Tocbot', function () {
    describe('#init', function () {
      it('should expose public functions', function () {
        expect(tocbot.init).to.be.a('function')
        expect(tocbot.destroy).to.be.a('function')
        expect(tocbot.refresh).to.be.a('function')
      })

      it('should add event listeners when initialized', function () {
        tocbot.destroy()
        let count = 0
        const args = []

        window.document.addEventListener = function () {
          args.push([].slice.call(arguments))
          count++
        }

        tocbot.init()

        const eventTypes = args.map(function (arg) {
          return arg[0]
        })
        expect(eventTypes).to.contain('scroll')
        expect(eventTypes).to.contain('resize')
        expect(eventTypes).to.contain('click')
        // All 3 events are from tocbot.
        expect(count).to.equal(3)
      })

      it("should not throw an error if a content element isn't found", function () {
        tocbot.destroy()
        expect(tocbot.init).to.not.throw(Error)
        tocbot.init({
          tocSelector: '.missing'
        })
      })

      it("should not throw an error if a toc element isn't found", function () {
        tocbot.destroy()
        expect(tocbot.init).to.not.throw(Error)
        tocbot.init({
          contentSelector: '.not-here'
        })
      })
    })

    describe('#destroy', function () {
      it('should remove event listeners when destroyed', function () {
        let count = 0
        const args = []

        window.document.removeEventListener = function () {
          args.push([].slice.call(arguments))
          count++
        }

        tocbot.destroy()

        const eventTypes = args.map(function (arg) {
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
      const selectHeadings = tocbot._parseContent.selectHeadings
      const contentEl = window.document.querySelector(
        tocbot._options.contentSelector
      )
      let defaultHeadings = selectHeadings(
        contentEl,
        tocbot._options.headingSelector
      )
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
      const selectHeadings = tocbot._parseContent.selectHeadings
      const contentEl = window.document.querySelector(
        tocbot._options.contentSelector
      )
      let defaultHeadings = selectHeadings(contentEl, 'h1, h2')
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
      const selectHeadings = tocbot._parseContent.selectHeadings
      const contentEl = window.document.querySelector(
        tocbot._options.contentSelector
      )
      const defaultHeadings = selectHeadings(
        contentEl,
        tocbot._options.headingSelector
      )
      const nestHeadingsData =
        tocbot._parseContent.nestHeadingsArray(defaultHeadings)

      expect(nestHeadingsData.nest).to.eql(TEST_DATA)
    })
  })

  // Build HTML
  describe('Build HTML', function () {
    it('#render', function () {
      tocbot.destroy()
      tocbot.init()
      const render = tocbot._buildHtml.render
      let tocEl = window.document.querySelector(tocbot._options.tocSelector)
      tocEl = render(tocEl, TEST_DATA)
      const html = TEST_HTML.split('\n').join('').replace(/>\s+</g, '><') // Remove spaces between all elements.

      expect(html).to.contain(tocEl.innerHTML)
    })

    it('should be able to include HTML markup when `includeHtml` is true', function () {
      tocbot.destroy()
      tocbot.init({
        includeHtml: true
      })
      // includeHtml
      const render = tocbot._buildHtml.render
      const nodes = [
        window.document.createTextNode('What'),
        window.document.createElement('SUP')
      ]
      nodes[1].textContent = 'sup'
      let tocEl = window.document.querySelector(tocbot._options.tocSelector)
      tocEl = render(tocEl, [
        {
          id: 'Whatsup',
          children: [],
          nodeName: 'H2',
          headingLevel: 2,
          textContent: 'Whatsup',
          isCollapsed: true,
          childNodes: nodes
        }
      ])
      expect(tocEl.innerHTML).to.contain('What<sup>sup</sup>')
    })

    it('should not include HTML markup when `includeHtml` is false', function () {
      tocbot.destroy()
      tocbot.init({
        includeHtml: false
      })
      // includeHtml
      const render = tocbot._buildHtml.render
      const nodes = [
        window.document.createTextNode('What'),
        window.document.createElement('SUP')
      ]
      nodes[1].textContent = 'sup'
      let tocEl = window.document.querySelector(tocbot._options.tocSelector)
      tocEl = render(tocEl, [
        {
          id: 'Whatsup',
          children: [],
          nodeName: 'H2',
          headingLevel: 2,
          textContent: 'Whatsup',
          isCollapsed: true,
          childNodes: nodes
        }
      ])
      expect(tocEl.innerHTML).to.contain(
        '<li class="toc-list-item"><a href="#Whatsup" class="toc-link node-name--H2 ">Whatsup</a></li>'
      )
    })

    it('Should respect tocElement with missing tocSelector', function () {
      tocbot.destroy()
      let tocEl = window.document.querySelector('.js-toc')
      tocbot.init({
        tocSelector: '.missing',
        tocElement: tocEl
      })
      const render = tocbot._buildHtml.render
      tocEl = render(tocEl, TEST_DATA)
      const html = TEST_HTML.split('\n').join('').replace(/>\s+</g, '><') // Remove spaces between all elements.

      expect(html).to.contain(tocEl.innerHTML)
    })
  })

  describe('Update TOC on scroll', function () {
    it('Should update TOC on scroll', function () {
      tocbot.destroy()
      tocbot.init()
      const render = tocbot._buildHtml.render
      const updateToc = tocbot._buildHtml.updateToc
      let tocEl = window.document.querySelector(tocbot._options.tocSelector)
      tocEl = render(tocEl, TEST_DATA)
      window.document.documentElement.scrollTop = 300
      updateToc(tocbot._headingsArray)
      expect(tocEl.innerHTML).to.contain(tocbot._options.activeLinkClass)
      expect(tocEl.innerHTML).to.contain(tocbot._options.activeListItemClass)
    })

    it('Should update TOC on scroll using tocElement with missing tocSelector', function () {
      tocbot.destroy()
      let tocEl = window.document.querySelector('.js-toc')
      tocbot.init({
        tocSelector: '.missing',
        tocElement: tocEl
      })
      const render = tocbot._buildHtml.render
      const updateToc = tocbot._buildHtml.updateToc
      tocEl = render(tocEl, TEST_DATA)
      window.document.documentElement.scrollTop = 300
      updateToc(tocbot._headingsArray)
      expect(tocEl.innerHTML).to.contain(tocbot._options.activeLinkClass)
      expect(tocEl.innerHTML).to.contain(tocbot._options.activeListItemClass)
    })

    it('Should not error when skipRendering is true', function () {
      tocbot.destroy()
      const tocEl = window.document.querySelector('.js-toc')
      expect(() => {
        tocbot.init({
          tocSelector: '.missing',
          tocElement: tocEl,
          skipRendering: true
        })
      }).to.not.throw()
    })
  })
}
