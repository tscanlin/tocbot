import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

// Only require tocbot if in browser.
const tocbot = (typeof window !== 'undefined')
  ? require('../../js/index.js')
  : null

const TOCBOT_OPTIONS = {
  tocSelector: '.js-toc',
  contentSelector: '.js-toc-content',
  headingSelector: 'h2, h3, h4',
  positionFixedSelector: '.js-toc',
  includeHtml: true,
  skipRendering: true,
  onClick: (e) => { console.log('you clicked a link', e) }
}

function List (props) {
  console.log(props)
  return (
    <ol className={`${props.tocbotOptions.listClass}`}>
      {props.items && props.items.map((node, i) => {
        return (
          <ListItem {...node} tocbotOptions={props.tocbotOptions} />
        )
      })}
    </ol>
  )
}

function ListItem (props) {
  return (
    <li className={`${props.tocbotOptions.listItemClass}`}>
      <a className={`${props.tocbotOptions.linkClass}`}>
        {props.textContent}
      </a>
      <List items={props.children} tocbotOptions={props.tocbotOptions} />
    </li>
  )
}

export default class Tocbot extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      headingData: null,
      tocbotOptions: Object.assign({}, TOCBOT_OPTIONS, props.tocbotOptions)
    }
  }

  componentDidMount () {
    if (tocbot) {
      tocbot.init(this.state.tocbotOptions)
      this.setState({
        headingData: tocbot.parseContent.getHeadingsData()
      })
    }
  }

  componentWillUnmount () {
    if (tocbot) {
      tocbot.destroy()
    }
  }

  render () {
    const state = this.state
    // console.log(this.headingData)
    // <ol class="toc-list "><li class="toc-list-item"><a href="#get-started" class="toc-link node-name--H2 ">Get Started</a><ol class="toc-list  is-collapsible"><li class="toc-list-item"><a href="#include-js" class="toc-link node-name--H3 ">Include JS</a></li><li class="toc-list-item"><a href="#include-css" class="toc-link node-name--H3 ">Include CSS</a></li><li class="toc-list-item is-active-li"><a href="#usage" class="toc-link node-name--H3  is-active-link">Usage</a></li></ol></li><li class="toc-list-item"><a href="#examples" class="toc-link node-name--H2 ">Examples</a></li><li class="toc-list-item"><a href="#requirements" class="toc-link node-name--H2 ">Requirements</a><ol class="toc-list  is-collapsible is-collapsed"><li class="toc-list-item"><a href="#fixed-headers" class="toc-link node-name--H3 ">Fixed headers</a></li></ol></li><li class="toc-list-item">
    return (
      <List
        items={state.headingData && state.headingData.nestedHeadings}
        tocbotOptions={state.tocbotOptions}
      />
    )
  }
}
