import React from 'react'
import Template from '../src/components/Template'
import TryIt from '../src/components/Template/TryIt'

import CONFIG from './config.js'
import PAGE_JSON from './_CHANGELOG.json'

const Index = (props) => {
  return (
    <Template
      title="Tocbot"
      subtitle="Changelog"
      siteId={CONFIG.siteId}
      stylesheets={CONFIG.stylesheets}
      topLinks={CONFIG.topLinks}
      bodyHtml={PAGE_JSON.bodyHtml}
      repo={CONFIG.repo}
      user={CONFIG.user}
      extraElements={<TryIt />}
    />
  )
}

export default Index
