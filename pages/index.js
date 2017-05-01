import React from 'react'
import Template from '../src/components/Template'

import PAGE_JSON from './_README.json'
const buttonClasses = 'f6 link dim br1 ph3 pv2 mb2 dib white bg-dark-gray'

const Index = (props) => {
  return (
    <Template
      title="Tocbot"
      bodyHtml={PAGE_JSON.bodyHtml}
    />
  )
}

export default Index
