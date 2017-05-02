import React from 'react'
import Template from '../src/components/Template'

import CONFIG from './config.js'
import PAGE_JSON from './_CHANGELOG.json'
const buttonClasses = 'f6 link dim br1 ph3 pv2 mb2 dib white bg-dark-gray'

const Index = (props) => {
  return (
    <Template
      title="Tocbot"
      subtitle="Changelog"
      topLinks={CONFIG.topLinks}
      bodyHtml={PAGE_JSON.bodyHtml}
    />
  )
}

export default Index
