/* globals define */

import * as tocbot from './index-esm.js'

;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory(root))
  } else if (typeof exports === 'object') {
    module.exports = factory(root)
  } else {
    root.tocbot = factory(root)
  }
})(typeof global !== 'undefined' ? global : window || global, function (root) {
  'use strict'

  // Just return if its not a browser.
  const supports =
    !!root &&
    !!root.document &&
    !!root.document.querySelector &&
    !!root.addEventListener // Feature test
  if (typeof window === 'undefined' && !supports) {
    return
  }

  // Make tocbot available globally.
  root.tocbot = tocbot

  return tocbot
})
