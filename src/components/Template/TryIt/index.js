import React from 'react'
import marked from 'marked'

const tocbot = (typeof window !== 'undefined')
  ? window.tocbot
  : null
let backupHtml

export default class TryIt extends React.Component {
  constructor () {
    super()
    this.state = {
      open: false
    }
  }

  onChange (e) {
    const contentEl = document.querySelector('.js-toc-content')
    const markdown = e.target.value
    contentEl.innerHTML = marked(markdown)
    if (tocbot) {
      tocbot.refresh()
    }
  }

  onReset (e) {
    const contentEl = document.querySelector('.js-toc-content')
    contentEl.innerHTML = backupHtml
    if (tocbot) {
      tocbot.refresh()
    }
  }

  render () {
    // Redefine backupHtml on re-render.
    backupHtml = (typeof window !== 'undefined')
      ? document.querySelector('.js-toc-content')
      : null
    backupHtml = backupHtml && backupHtml.innerHTML

    return (
      <div className={`try-it-container transition--300 fixed w-20 ma2 z-3 bottom-0 right-0 ${this.state.open ? 'is-open' : 'is-closed'}`}>
        <div className='cb pb2'>
          <button
            className='button bn f6 link br1 ph3 pv2 mb2 dib white bg-dark-gray fr'
            onClick={(e) => {
              this.setState({
                open: !this.state.open
              })
            }}
          >
            {this.state.open
              ? 'Hide'
              : 'Try it'}
          </button>
          <a
            id='try-it-reset' href='javascript:void(0)' className='ph3 pv2 mb2 dib fr'
            onClick={(e) => this.onReset(e)}
          >
            Reset
          </a>
        </div>
        <p className='mb0 mt4'>Paste markdown in the box below.</p>
        <textarea onChange={(e) => this.onChange(e)} id='try-it-markdown' className='textarea w-100 h4' />
      </div>
    )
  }
}
