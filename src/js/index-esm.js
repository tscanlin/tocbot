/* eslint no-var: off */
/**
 * Tocbot
 * Tocbot creates a table of contents based on HTML headings on a page,
 * this allows users to easily jump to different sections of the document.
 * Tocbot was inspired by tocify (http://gregfranko.com/jquery.tocify.js/).
 * The main differences are that it works natively without any need for jquery or jquery UI).
 *
 * @author Tim Scanlin
 */

import BuildHtml from './build-html.js'
import defaultOptions from './default-options.js'
import ParseContent from './parse-content.js'
import initSmoothScrolling from './scroll-smooth/index.js'
import updateTocScroll from './update-toc-scroll.js'

// For testing purposes.
export let _options = {} // Object to store current options.
export let _buildHtml
export let _parseContent
export let _headingsArray
export let _scrollListener

let clickListener

/**
 * Initialize tocbot.
 * @param {object} customOptions
 */
export function init (customOptions) {
  // Merge defaults with user options.
  // Set to options variable at the top.
  _options = extend(defaultOptions, customOptions || {})

  // Init smooth scroll if enabled (default).
  if (_options.scrollSmooth) {
    _options.duration = _options.scrollSmoothDuration
    _options.offset = _options.scrollSmoothOffset

    initSmoothScrolling(_options)
  }

  // Pass options to these modules.
  _buildHtml = BuildHtml(_options)
  _parseContent = ParseContent(_options)

  // Destroy it if it exists first.
  destroy()

  const contentElement = getContentElement(_options)
  if (contentElement === null) {
    return
  }

  const tocElement = getTocElement(_options)
  if (tocElement === null) {
    return
  }

  // Get headings array.
  _headingsArray = _parseContent.selectHeadings(
    contentElement,
    _options.headingSelector
  )

  // Return if no headings are found.
  if (_headingsArray === null) {
    return
  }

  // Build nested headings array.
  const nestedHeadingsObj = _parseContent.nestHeadingsArray(_headingsArray)
  const nestedHeadings = nestedHeadingsObj.nest

  // Render.
  if (!_options.skipRendering) {
    _buildHtml.render(tocElement, nestedHeadings)
  } else {
    // No need to attach listeners if skipRendering is true, this was causing errors.
    return this
  }

  // Update Sidebar and bind listeners.
  _scrollListener = throttle(function (e) {
    _buildHtml.updateToc(_headingsArray)
    !_options.disableTocScrollSync && updateTocScroll(_options)
    const isTop =
      e &&
      e.target &&
      e.target.scrollingElement &&
      e.target.scrollingElement.scrollTop === 0
    if ((e && (e.eventPhase === 0 || e.currentTarget === null)) || isTop) {
      _buildHtml.updateToc(_headingsArray)
      if (_options.scrollEndCallback) {
        _options.scrollEndCallback(e)
      }
    }
  }, _options.throttleTimeout)
  _scrollListener()
  if (
    _options.scrollContainer &&
    document.querySelector(_options.scrollContainer)
  ) {
    document
      .querySelector(_options.scrollContainer)
      .addEventListener('scroll', _scrollListener, false)
    document
      .querySelector(_options.scrollContainer)
      .addEventListener('resize', _scrollListener, false)
  } else {
    document.addEventListener('scroll', _scrollListener, false)
    document.addEventListener('resize', _scrollListener, false)
  }

  // Bind click listeners to disable animation.
  let timeout = null
  clickListener = throttle(function (event) {
    if (_options.scrollSmooth) {
      _buildHtml.disableTocAnimation(event)
    }
    _buildHtml.updateToc(_headingsArray)
    // Timeout to re-enable the animation.
    timeout && clearTimeout(timeout)
    timeout = setTimeout(function () {
      _buildHtml.enableTocAnimation()
    }, _options.scrollSmoothDuration)
  }, _options.throttleTimeout)

  if (
    _options.scrollContainer &&
    document.querySelector(_options.scrollContainer)
  ) {
    document
      .querySelector(_options.scrollContainer)
      .addEventListener('click', clickListener, false)
  } else {
    document.addEventListener('click', clickListener, false)
  }
}

/**
 * Destroy tocbot.
 */
export function destroy () {
  const tocElement = getTocElement(_options)
  if (tocElement === null) {
    return
  }

  if (!_options.skipRendering) {
    // Clear HTML.
    if (tocElement) {
      tocElement.innerHTML = ''
    }
  }

  // Remove event listeners.
  if (
    _options.scrollContainer &&
    document.querySelector(_options.scrollContainer)
  ) {
    document
      .querySelector(_options.scrollContainer)
      .removeEventListener('scroll', _scrollListener, false)
    document
      .querySelector(_options.scrollContainer)
      .removeEventListener('resize', _scrollListener, false)
    if (_buildHtml) {
      document
        .querySelector(_options.scrollContainer)
        .removeEventListener('click', clickListener, false)
    }
  } else {
    document.removeEventListener('scroll', _scrollListener, false)
    document.removeEventListener('resize', _scrollListener, false)
    if (_buildHtml) {
      document.removeEventListener('click', clickListener, false)
    }
  }
}

/**
 * Refresh tocbot.
 */
export function refresh (customOptions) {
  destroy()
  init(customOptions || _options)
}

// From: https://github.com/Raynos/xtend
const hasOwnProperty = Object.prototype.hasOwnProperty
function extend () {
  const target = {}
  for (let i = 0; i < arguments.length; i++) {
    const source = arguments[i]
    for (const key in source) {
      if (hasOwnProperty.call(source, key)) {
        target[key] = source[key]
      }
    }
  }
  return target
}

// From: https://remysharp.com/2010/07/21/throttling-function-calls
function throttle (fn, threshold, scope) {
  threshold || (threshold = 250)
  let last
  let deferTimer
  return function () {
    const context = scope || this
    const now = +new Date()
    const args = arguments
    if (last && now < last + threshold) {
      // hold on to it
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, threshold)
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}

function getContentElement (options) {
  try {
    return (
      options.contentElement || document.querySelector(options.contentSelector)
    )
  } catch (e) {
    console.warn('Contents element not found: ' + options.contentSelector) // eslint-disable-line
    return null
  }
}

function getTocElement (options) {
  try {
    return options.tocElement || document.querySelector(options.tocSelector)
  } catch (e) {
    console.warn('TOC element not found: ' + options.tocSelector) // eslint-disable-line
    return null
  }
}
