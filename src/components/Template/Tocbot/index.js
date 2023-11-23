import React from 'react'

const TOCBOT_OPTIONS = {
  tocSelector: '.js-toc',
  contentSelector: '.js-toc-content',
  headingSelector: 'h2, h3, h4, h5, h6',
  positionFixedSelector: '.js-toc',
  includeHtml: true,
  includeTitleTags: false,
  hasInnerContainers: true,
  onClick: (e) => { console.log('you clicked a link', e) },
  headingsOffset: 40,
  scrollSmoothOffset: -40
  // skipRendering: true,
}

// Only require tocbot if in browser.
const tocbot = (typeof window !== 'undefined')
  ? require('../../../js/index.js')
  : null

export default class Tocbot extends React.Component {
  componentDidMount () {
    if (tocbot) {
      tocbot.init(Object.assign({}, TOCBOT_OPTIONS, this.props))
    }
  }

  componentWillUnmount () {
    if (tocbot) {
      tocbot.destroy()
    }
  }

  render () {
    return null
  }
}
