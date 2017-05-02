import React from 'react'
import Template from '../src/components/Template'

import CONFIG from './config.js'
import PAGE_JSON from './_README.json'
const buttonClasses = 'f6 link dim br1 ph3 pv2 mb2 dib white bg-dark-gray'

const Index = (props) => {
  return (
    <Template
      title="Tocbot"
      subtitle="Generate a table of contents based on the heading structure of an html document"
      topLinks={CONFIG.topLinks}
      bodyHtml={PAGE_JSON.bodyHtml}
      repo={CONFIG.repo}
      user={CONFIG.user}
    />
  )
}

export default Index
