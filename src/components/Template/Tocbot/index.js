import React from 'react'

const TOCBOT_OPTIONS = {
  tocSelector: '.js-toc',
  contentSelector: '.js-toc-content',
  headingSelector: 'h1, h2, h3, h4',
  positionFixedSelector: '.js-toc',
  smoothScrollOptions: {
    easing: 'easeInOutCubic',
    offset: 0,
    callback: function(anchor, toggle) { console.log(anchor, toggle) },
    speed: 300 // animation duration.
  },
}

// Only require tocbot if in browser.
const tocbot = (typeof window !== 'undefined')
  ? require('../../../js/index.js')
  : null

export default class Tocbot extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    if (tocbot) {
      tocbot.init(TOCBOT_OPTIONS);
    }
  }

  componentWillUnmount() {
    if (tocbot) {
      tocbot.destroy();
    }
  }

  render () {
    return null
  }
}
