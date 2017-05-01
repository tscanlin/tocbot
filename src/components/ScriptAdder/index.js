import React from 'react'
import PropTypes from 'prop-types'
import { addScriptsToPage } from '../utils/add-script.js'
import * as SCRIPTS from './scripts.js'
import Router from 'next/router'

class ScriptAdder extends React.Component {
  componentDidMount() {
    const scripts = [
      'TOCBOT_SCRIPT',
      'TOCBOT_INIT',
      'MARKED_SCRIPT',
      'TRY_IT_INIT',
      'GA_INIT',
    ]

    const scriptsToAdd = scripts.map(s => SCRIPTS[s])

    addScriptsToPage(window, scriptsToAdd)

    if (typeof window !== 'undefined' && window.tocbot) {
      const options = window.__TOCBOT_OPTIONS__
      window.tocbot.init(options)
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.tocbot.destroy()
    }
  }

  render() {
    return null
  }
}

export default ScriptAdder
