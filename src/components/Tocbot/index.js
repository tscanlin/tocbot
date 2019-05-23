import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

// Only require tocbot if in browser.
const tocbot = (typeof window !== 'undefined')
  ? require('../../js/index.js')
  : null

const TOCBOT_OPTIONS = {
  headingSelector: 'h2, h3, h4',
  positionFixedSelector: '.js-toc',
  includeHtml: true,
  skipRendering: true,
  onClick: (e) => { console.log('you clicked a link', e) }
}

function List (props) {
  return (
    <ol className={`${props.tocbotOptions.listClass}`}>
      {props.items && props.items.map((node, i) => {
        return (
          <ListItem key={i} {...node} tocbotOptions={props.tocbotOptions} />
        )
      })}
    </ol>
  )
}

function ListItem (props) {
  return (
    <li className={`${props.tocbotOptions.listItemClass}`}>
      <a href={`#${props.id}`} className={`${props.tocbotOptions.linkClass} node-name--${props.nodeName}`}>
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
      tocbotOptions: {}
    }
  }

  componentDidMount () {
    if (tocbot) {
      var tocbotOptions = Object.assign({}, TOCBOT_OPTIONS, this.props.tocbotOptions)
      tocbot.init(tocbotOptions)
      this.setState({
        tocbotOptions: Object.assign({}, tocbot.options, tocbotOptions),
        headingData: tocbot.parseContent.getHeadingsData()
      }, () => {
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
    return (
      <List
        items={state.headingData && state.headingData.nestedHeadings}
        tocbotOptions={state.tocbotOptions}
      />
    )
  }
}
