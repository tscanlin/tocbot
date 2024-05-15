import * as tocbot from './index-esm.js'
import { JSDOM } from 'jsdom'

const HTML_EXAMPLE = `
<h1 id="test">Test</h1>
<p>Content</p>
<h2 id="next-heading">Next Heading</h1>
`

export function htmlTemplate (content){
  return `
  <html>
    <body>
      <div class="js-toc-content">
        ${content}
      </div>
      <div class="js-toc">
      </div>
    </body>
  </html>
  `
}

export function serverRender (content) {
  const html = htmlTemplate(content)
  const { window, location } = new JSDOM(html)
  global.window = window
  global.document = window.document
  global.location = location

  // Init and get HTML content.
  tocbot.init()
  const toc = window.document.body.querySelector('.js-toc')
  return toc && toc.innerHTML
}

const result = serverRender(HTML_EXAMPLE)
console.log(result)