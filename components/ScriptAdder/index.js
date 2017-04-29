import React from 'react'
import PropTypes from 'prop-types'
import { addScriptsToPage } from '../utils/add-script.js'
import * as SCRIPTS from './scripts.js'

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
    // console.log(scriptsToAdd);

    addScriptsToPage(window, scriptsToAdd)
  }

  render() {
    return null
  }
}

export default ScriptAdder
