import React from 'react'
import Template from '../src/components/Template'
// import TryIt from '../src/components/Template/TryIt'

import CONFIG from '../data/config.js'
import PAGE_JSON from '../data/README.json'

const Index = (props) => {
  return (
    <Template
      title={CONFIG.title}
      subtitle={CONFIG.subtitle}
      description={CONFIG.description}
      stylesheets={CONFIG.stylesheets}
      topLinks={CONFIG.topLinks}
      bodyHtml={PAGE_JSON.bodyHtml}
      repo={CONFIG.repo}
      user={CONFIG.user}
      siteId={CONFIG.siteId}
      // extraElements={<TryIt />}
    />
  )
}

export default Index
