import React from 'react'

const TOCBOT_OPTIONS = {
  tocSelector: '.js-toc',
  contentSelector: '.js-toc-content',
  headingSelector: 'h2, h3, h4',
  positionFixedSelector: '.js-toc',
  includeHtml: true,
  onClick: (e) => { console.log('you clicked a link', e) }
}

// Only require tocbot if in browser.
const tocbot = (typeof window !== 'undefined')
  ? require('../../../js/index.js')
  : null

export default class Tocbot extends React.Component {
  componentDidMount () {
    if (tocbot) {
      tocbot.init(TOCBOT_OPTIONS)
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
