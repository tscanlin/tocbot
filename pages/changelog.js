import React from 'react'
import Template from '../src/components/Template'

import CONFIG from './config.js'
import PAGE_JSON from './_CHANGELOG.json'

const Index = (props) => {
  return (
    <Template
      title="Tocbot"
      subtitle="Changelog"
      stylesheets={CONFIG.stylesheets}
      topLinks={CONFIG.topLinks}
      bodyHtml={PAGE_JSON.bodyHtml}
      repo={CONFIG.repo}
      user={CONFIG.user}
    />
  )
}

export default Index
