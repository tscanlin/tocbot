import { expect } from '@esm-bundle/chai'
import * as tocbot from '../src/js/index-esm.js'

window.document.body.innerHTML = await (
  await fetch('./test/data/sample-meat.html')
).text()

const TEST_DATA = await (await fetch('./test/data/data.json')).json()
const TEST_HTML = await (await fetch('./test/data/rendered.html')).text()

const executeUnitTests = (await import('./unit-tests.mjs')).default

executeUnitTests(expect, window, tocbot, TEST_DATA, TEST_HTML)
