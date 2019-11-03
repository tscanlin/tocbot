/**
 * This file is responsible for parsing the content from the DOM and making
 * sure data is nested properly.
 *
 * @author Tim Scanlin
 */

module.exports = function parseContent (options) {
  var reduce = [].reduce

  /**
   * Get the last item in an array and return a reference to it.
   * @param {Array} array
   * @return {Object}
   */
  function getLastItem (array) {
    return array[array.length - 1]
  }

  /**
   * Get heading level for a heading dom node.
   * @param {HTMLElement} heading
   * @return {Number}
   */
  function getHeadingLevel (heading) {
    return +heading.nodeName.split('H').join('')
  }

  /**
   * Get important properties from a heading element and store in a plain object.
   * @param {HTMLElement} heading
   * @return {Object}
   */
  function getHeadingObject (heading) {
    var obj = {
      id: heading.id,
      children: [],
      nodeName: heading.nodeName,
      headingLevel: getHeadingLevel(heading),
      textContent: heading.textContent.trim()
    }

    if (options.includeHtml) {
      obj.childNodes = heading.childNodes
    }

    return obj
  }
  /**
   * Convert heading elements to plain objects
   * @param {Array} headingsArray
   * @return {Array}
   */
  function getAllHeadingsObject (headings) {
    var headingsObject = Array.from(headings).map(function (heading) {
      return getHeadingObject(heading)
    })

    if (options.headingsLabelCallback) {
      var allLabels = headingsObject.map(function (headingObject) {
        return headingObject.textContent
      })
      var forcedHeadingsLabel = options.headingsLabelCallback(allLabels)

      if (forcedHeadingsLabel) {
        headingsObject.forEach(function (headingsObject, index) {
          forcedHeadingsLabel[index] && (headingsObject.textContent = String(forcedHeadingsLabel[index]))
        })
      }
    }

    return headingsObject
  }

  /**
   * Add a node to the nested array.
   * @param {Object} node
   * @param {Array} nest
   * @return {Array}
   */
  function addNode (node, nest) {
    var obj = getHeadingObject(node)
    var level = getHeadingLevel(node)
    var array = nest
    var lastItem = getLastItem(array)
    var lastItemLevel = lastItem
      ? lastItem.headingLevel
      : 0
    var counter = level - lastItemLevel

    while (counter > 0) {
      lastItem = getLastItem(array)
      if (lastItem && lastItem.children !== undefined) {
        array = lastItem.children
      }
      counter--
    }

    if (level >= options.collapseDepth) {
      obj.isCollapsed = true
    }

    array.push(obj)
    return array
  }

  /**
   * Select headings in content area, exclude any selector in options.ignoreSelector
   * @param {String} contentSelector
   * @param {Array} headingSelector
   * @return {Array}
   */
  function selectHeadings (contentSelector, headingSelector) {
    var selectors = headingSelector
    if (options.ignoreSelector) {
      selectors = headingSelector.split(',')
        .map(function mapSelectors (selector) {
          return selector.trim() + ':not(' + options.ignoreSelector + ')'
        })
    }
    try {
      return document.querySelector(contentSelector)
        .querySelectorAll(selectors)
    } catch (e) {
      console.warn('Element not found: ' + contentSelector); // eslint-disable-line
      return null
    }
  }

  /**
   * Nest headings array into nested arrays with 'children' property.
   * @param {Array} headingsArray
   * @return {Object}
   */
  function nestHeadingsArray (headingsArray) {
    var headingsObject = getAllHeadingsObject(headingsArray)

    return reduce.call(headingsObject, function reducer (prev, currentHeading) {
      addNode(currentHeading, prev.nest)
      return prev
    }, {
      nest: []
    })
  }

  return {
    nestHeadingsArray: nestHeadingsArray,
    selectHeadings: selectHeadings
  }
}
