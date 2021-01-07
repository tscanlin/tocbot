import React from 'react'
import Template from '../src/components/Template'
import TryIt from '../src/components/Template/TryIt'

import CONFIG from './_config.js'

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'

const bodyHtml = `
  <H2 id="first">First Title</H2>
  <p>${lorem}</p>
  <H2 id="second">Second Title</H2>
  <p>${lorem}</p>
  <H3 id="second-a">Subtitle A</H3>
  <p>${lorem}</p>
  <H3 id="second-b">Subtitle B</H3>
  <p>${lorem}</p>
  <H2 id="third">Third Title</H2>
  <p>${lorem}</p>
`

// do not put spaces after </a> or it creates a sibling text elt
const tocHtml = `
  <ol class="toc-list">
    <li class="toc-list-item"><a class="toc-link node-name--H2" href="#first">First title</a></li>
    <li class="toc-list-item">
      <a class="toc-link node-name--H2" href="#second">Second title</a>
      <ol class="toc-list is-collapsible">
      <li class="toc-list-item"><a class="toc-link node-name--H3" href="#second-a">Subtitle A</a></li>
      <li class="toc-list-item"><a class="toc-link node-name--H3" href="#second-b">Subtitle B</a></li>
      </ol>
    </li>
    <li class="toc-list-item"><a class="toc-link node-name--H2" href="#third">First title</a></li>
  </ol>`

const Index = (props) => {
  return (
    <Template
      title={CONFIG.title}
      subtitle={CONFIG.subtitle}
      description={CONFIG.description}
      stylesheets={CONFIG.stylesheets}
      topLinks={CONFIG.topLinks}
      bodyHtml={bodyHtml}
      tocHtml={tocHtml}
      repo={CONFIG.repo}
      user={CONFIG.user}
      siteId={CONFIG.siteId}
      extraElements={<TryIt />}
      tocbotOptions={{ skipRendering: true }}
    />
  )
}

export default Index
