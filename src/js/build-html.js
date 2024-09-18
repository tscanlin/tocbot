/**
 * This file is responsible for building the DOM and updating DOM state.
 *
 * @author Tim Scanlin
 */

export default function (options) {
  const forEach = [].forEach
  const some = [].some
  if (typeof window === 'undefined') return
  const body = document.body
  const SPACE_CHAR = ' '
  let tocElement
  let currentlyHighlighting = true

  /**
   * Create link and list elements.
   * @param {Object} d
   * @param {HTMLElement} container
   * @return {HTMLElement}
   */
  function createEl (d, container) {
    const link = container.appendChild(createLink(d))
    if (d.children.length) {
      const list = createList(d.isCollapsed)
      d.children.forEach((child) => {
        createEl(child, list)
      })
      link.appendChild(list)
    }
  }

  /**
   * Render nested heading array data into a given element.
   * @param {HTMLElement} parent Optional. If provided updates the {@see tocElement} to match.
   * @param {Array} data
   * @return {HTMLElement}
   */
  function render (parent, data) {
    const collapsed = false
    const container = createList(collapsed)

    data.forEach((d) => {
      createEl(d, container)
    })

    // Return if no TOC element is provided or known.
    tocElement = parent || tocElement
    if (tocElement === null) {
      return
    }

    // Remove existing child if it exists.
    if (tocElement.firstChild) {
      tocElement.removeChild(tocElement.firstChild)
    }

    // Just return the parent and don't append the list if no links are found.
    if (data.length === 0) {
      return tocElement
    }

    // Append the Elements that have been created
    return tocElement.appendChild(container)
  }

  /**
   * Create link element.
   * @param {Object} data
   * @return {HTMLElement}
   */
  function createLink (data) {
    const item = document.createElement('li')
    const a = document.createElement('a')
    if (options.listItemClass) {
      item.setAttribute('class', options.listItemClass)
    }

    if (options.onClick) {
      a.onclick = options.onClick
    }

    if (options.includeTitleTags) {
      a.setAttribute('title', data.textContent)
    }

    if (options.includeHtml && data.childNodes.length) {
      forEach.call(data.childNodes, (node) => {
        a.appendChild(node.cloneNode(true))
      })
    } else {
      // Default behavior. Set to textContent to keep tests happy.
      a.textContent = data.textContent
    }
    a.setAttribute('href', `${options.basePath}#${data.id}`)
    a.setAttribute('class', `${options.linkClass +
      SPACE_CHAR}node-name--${data.nodeName}${SPACE_CHAR}${options.extraLinkClasses}`)
    item.appendChild(a)
    return item
  }

  /**
   * Create list element.
   * @param {Boolean} isCollapsed
   * @return {HTMLElement}
   */
  function createList (isCollapsed) {
    const listElement = (options.orderedList) ? 'ol' : 'ul'
    const list = document.createElement(listElement)
    let classes = options.listClass + SPACE_CHAR + options.extraListClasses
    if (isCollapsed) {
      // No plus/equals here fixes compilation issue.
      classes = classes + SPACE_CHAR + options.collapsibleClass
      classes = classes + SPACE_CHAR + options.isCollapsedClass
    }
    list.setAttribute('class', classes)
    return list
  }

  /**
   * Update fixed sidebar class.
   * @return {HTMLElement}
   */
  function updateFixedSidebarClass () {
    const scrollTop = getScrollTop()

    const posFixedEl = document.querySelector(options.positionFixedSelector)
    if (options.fixedSidebarOffset === 'auto') {
      options.fixedSidebarOffset = tocElement.offsetTop
    }

    if (scrollTop > options.fixedSidebarOffset) {
      if (posFixedEl.className.indexOf(options.positionFixedClass) === -1) {
        posFixedEl.className += SPACE_CHAR + options.positionFixedClass
      }
    } else {
      posFixedEl.className = posFixedEl.className.replace(SPACE_CHAR + options.positionFixedClass, '')
    }
  }

  /**
   * Get top position of heading
   * @param {HTMLElement} obj
   * @return {int} position
   */
  function getHeadingTopPos (obj) {
    let position = 0
    if (obj !== null) {
      position = obj.offsetTop
      if (options.hasInnerContainers) { position += getHeadingTopPos(obj.offsetParent) }
    }
    return position
  }

  /**
   * Update className only when changed.
   * @param {HTMLElement} obj
   * @param {string} className
   * @return {HTMLElement} obj
   */
  function updateClassname (obj, className) {
    if (obj && obj.className !== className) {
      obj.className = className
    }
    return obj
  }

  /**
   * Update TOC highlighting and collapsed groupings.
   */
  function updateToc (headingsArray) {
    // Add fixed class at offset
    if (options.positionFixedSelector) {
      updateFixedSidebarClass()
    }

    // Get the top most heading currently visible on the page so we know what to highlight.
    const headings = headingsArray
    // Using some instead of each so that we can escape early.
    if (currentlyHighlighting &&
      tocElement !== null &&
      headings.length > 0) {
      const topHeader = getTopHeader(headings)

      const oldActiveTocLink = tocElement.querySelector(`.${options.activeLinkClass}`)
      const activeTocLink = tocElement
        .querySelector(`.${options.linkClass}.node-name--${topHeader.nodeName}[href="${options.basePath}#${topHeader.id.replace(/([ #;&,.+*~':"!^$[\]()=>|/\\@])/g, '\\$1')}"]`)
      // Performance improvement to only change the classes
      // for the toc if a new link should be highlighted.
      if (oldActiveTocLink === activeTocLink) {
        return
      }

      // Remove the active class from the other tocLinks.
      const tocLinks = tocElement
        .querySelectorAll(`.${options.linkClass}`)
      forEach.call(tocLinks, (tocLink) => {
        updateClassname(tocLink, tocLink.className.replace(SPACE_CHAR + options.activeLinkClass, ''))
      })
      const tocLis = tocElement
        .querySelectorAll(`.${options.listItemClass}`)
      forEach.call(tocLis, (tocLi) => {
        updateClassname(tocLi, tocLi.className.replace(SPACE_CHAR + options.activeListItemClass, ''))
      })

      // Add the active class to the active tocLink.
      if (activeTocLink && activeTocLink.className.indexOf(options.activeLinkClass) === -1) {
        activeTocLink.className += SPACE_CHAR + options.activeLinkClass
      }
      const li = activeTocLink?.parentNode
      if (li && li.className.indexOf(options.activeListItemClass) === -1) {
        li.className += SPACE_CHAR + options.activeListItemClass
      }

      const tocLists = tocElement
        .querySelectorAll(`.${options.listClass}.${options.collapsibleClass}`)

      // Collapse the other collapsible lists.
      forEach.call(tocLists, (list) => {
        if (list.className.indexOf(options.isCollapsedClass) === -1) {
          list.className += SPACE_CHAR + options.isCollapsedClass
        }
      })

      // Expand the active link's collapsible list and its sibling if applicable.
      if (activeTocLink?.nextSibling && activeTocLink.nextSibling.className.indexOf(options.isCollapsedClass) !== -1) {
        updateClassname(activeTocLink.nextSibling, activeTocLink.nextSibling.className.replace(SPACE_CHAR + options.isCollapsedClass, ''))
      }
      removeCollapsedFromParents(activeTocLink?.parentNode.parentNode)
    }
  }

  /**
   * Remove collapsed class from parent elements.
   * @param {HTMLElement} element
   * @return {HTMLElement}
   */
  function removeCollapsedFromParents (element) {
    if (element && element.className.indexOf(options.collapsibleClass) !== -1 && element.className.indexOf(options.isCollapsedClass) !== -1) {
      updateClassname(element, element.className.replace(SPACE_CHAR + options.isCollapsedClass, ''))
      return removeCollapsedFromParents(element.parentNode.parentNode)
    }
    return element
  }

  /**
   * Disable TOC Animation when a link is clicked.
   * @param {Event} event
   */
  function disableTocAnimation (event) {
    const target = event.target || event.srcElement
    if (typeof target.className !== 'string' || target.className.indexOf(options.linkClass) === -1) {
      return
    }
    // Bind to tocLink clicks to temporarily disable highlighting
    // while smoothScroll is animating.
    currentlyHighlighting = false
  }

  /**
   * Enable TOC Animation.
   */
  function enableTocAnimation () {
    currentlyHighlighting = true
  }

  /**
   * Return currently highlighting status.
   */
  function getCurrentlyHighlighting () {
    return currentlyHighlighting
  }

  function getScrollTop () {
    // If a fixed content container was set
    let top
    if (options.scrollContainer && document.querySelector(options.scrollContainer)) {
      top = document.querySelector(options.scrollContainer).scrollTop
    } else {
      top = document.documentElement.scrollTop || body.scrollTop
    }
    return top
  }

  function getTopHeader (headings, scrollTop = getScrollTop()) {
    let topHeader
    some.call(headings, (heading, i) => {
      if (getHeadingTopPos(heading) > scrollTop + options.headingsOffset + 10) {
        // Don't allow negative index value.
        const index = (i === 0) ? i : i - 1
        topHeader = headings[index]
        return true
      }
      if (i === headings.length - 1) {
        // This allows scrolling for the last heading on the page.
        topHeader = headings[headings.length - 1]
        return true
      }
    })
    return topHeader
  }

  function updateUrlHashForHeader (headingsArray) {
    const scrollTop = getScrollTop()
    const topHeader = getTopHeader(headingsArray, scrollTop)
    if (!topHeader || scrollTop === 0 || (scrollTop < 4 && !isElementInViewport(topHeader))) {
      if (!(window.location.hash === '#' || window.location.hash === '')) {
        window.history.pushState(null, null, '#')
      }
    } else if (topHeader) {
      const newHash = `#${topHeader.id}`
      if (window.location.hash !== newHash) {
        window.history.pushState(null, null, newHash)
      }
    }
  }

  function isElementInViewport (el) {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  return {
    enableTocAnimation,
    disableTocAnimation,
    render,
    updateToc,
    getCurrentlyHighlighting,
    getTopHeader,
    getScrollTop,
    updateUrlHashForHeader
  }
}
