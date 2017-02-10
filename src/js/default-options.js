/**
 * Tocbot default options should all live in this file.
 *
 * @author Tim Scanlin
 */

module.exports = {
  // Where to render the table of contents.
  tocSelector: '.js-toc',
  // Where to grab the headings to build the table of contents.
  contentSelector: '.js-toc-content',
  // Which headings to grab inside of the contentSelector element.
  headingSelector: 'h1, h2, h3',

  // Headings that match the ignoreSelector will be skipped.
  ignoreSelector: '.js-toc-ignore',
  // Heading attribute whose value can be used to override the link href.
  // (The default link href is '#' followed by the value of the heading's id attribute.)
  tocHrefAttribute: 'data-toc-href',
  // Main class to add to links.
  linkClass: 'toc-link',
  // Extra classes to add to links.
  extraLinkClasses: '',
  // Class to add to active links,
  // the link corresponding to the top most heading on the page.
  activeLinkClass: 'is-active-link',
  // Main class to add to lists.
  listClass: 'toc-list',
  // Extra classes to add to lists.
  extraListClasses: '',
  // Class that gets added when a list should be collapsed.
  isCollapsedClass: 'is-collapsed',
  // Class that gets added when a list should be able
  // to be collapsed but isn't necessarily collpased.
  collapsibleClass: 'is-collapsible',
  // Class to add to list items.
  listItemClass: 'toc-list-item',
  // How many heading levels should not be collpased.
  // For example, number 6 will show everything since
  // there are only 6 heading levels and number 0 will collpase them all.
  // The sections that are hidden will open
  // and close as you scroll to headings within them.
  collapseDepth: 0,
  // smooth-scroll options object, see docs at:
  // https://github.com/cferdinandi/smooth-scroll
  smoothScrollOptions: {
    easing: 'easeInOutCubic',
    offset: 0,
    speed: 300 // animation duration.
  },
  // Headings offset between the headings and the top of the document.
  headingsOffset: 0,
  // Timeout between events firing to make sure it's
  // not too rapid (for performance reasons).
  throttleTimeout: 50,
  // Element to add the positionFixedClass to.
  positionFixedSelector: null,
  // Fixed position class to add to make sidebar fixed after scrolling
  // down past the fixedSidebarOffset.
  positionFixedClass: 'is-position-fixed',
  // fixedSidebarOffset can be any number but by default is set
  // to auto which sets the fixedSidebarOffset to the sidebar
  // element's offsetTop from the top of the document on init.
  fixedSidebarOffset: 'auto',
  // includeHtml can be set to true to include the HTML markup from the
  // heading node instead of just including the textContent.
  includeHtml: false
};
