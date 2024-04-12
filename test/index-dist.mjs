import { expect } from 'chai'
import * as fs from 'fs/promises'
import { JSDOM } from 'jsdom'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const content = await fs.readFile('./test/data/sample-meat.html', 'utf-8')
const { window } = new JSDOM(content, { runScripts: 'dangerously' })
window.document.body.innerHTML = content

const scriptEl = window.document.createElement('script')
scriptEl.textContent = await fs.readFile('./static/js/tocbot.js', 'utf-8')
window.document.body.appendChild(scriptEl)

const TEST_DATA = require('./data/data.json')
const TEST_HTML = await fs.readFile('./test/data/rendered.html', 'utf-8')

it('should expose a global object', function () {
  expect(window.tocbot).to.not.equal(undefined)
})

const executeUnitTests = (await import('./unit-tests.mjs')).default

executeUnitTests(expect, window, window.tocbot, TEST_DATA, TEST_HTML)
