import { expect } from 'chai'
// import * as fs from 'fs/promises'
import * as tocbot from '../src/js/index-esm.js'
// Do not import this below or it will invalidate this test (jsdom).
// import { serverRender } from '../src/js/server-render.js'

// const content = await fs.readFile('./test/data/sample-meat.html', 'utf-8')

it('should import properly', () => {
  expect(tocbot).to.not.equal(undefined)
  expect(tocbot.destroy).to.not.equal(undefined)
  expect(tocbot.init).to.not.equal(undefined)
  expect(tocbot.refresh).to.not.equal(undefined)
  expect(tocbot._options).to.not.equal(undefined)  
})

it('should work and not error in node', () => {
  expect(tocbot.init).to.not.throw()
})