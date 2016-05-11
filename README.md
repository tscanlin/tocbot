<h1 class="display--none">
<a href="http://tscanlin.github.io/tocbot">Tocbot</a>
<img src="https://travis-ci.org/tscanlin/tocbot.svg?branch=master" alt="travis-ci" />
</h1>


Tocbot builds a [table of contents](https://en.wikipedia.org/wiki/Table_of_contents) (TOC) from headings in an HTML document. This is useful for documentation websites or long markdown pages because it makes them easier to navigate. This library was inspired by [Tocify](http://gregfranko.com/jquery.tocify.js/), the main difference is that Tocbot uses native DOM methods and avoids the jQuery & jQuery UI dependencies.


## Get Started

You can use npm to install it or include the script on the page with HTML.

[**Download it here**](https://github.com/tscanlin/tocbot/releases/)


### Include JS

Install it with npm.

```sh
npm install --save tocbot
```

OR

Include the script at the bottom of the page before the closing body tag.

```html
<script src="/assets/js/tocbot.js"></script>
```


### Include CSS

CSS is used for expanding & collapsing groupings and some basic styling.

```html
<link rel="stylesheet" href="/assets/css/tocbot.css">
```

OR

If you installed it with npm and use sass / postcss you might try importing the styles from 'node_modules', [see the includePath option documentation for more info](https://github.com/sass/node-sass#includepaths)

```scss
@import 'tocbot/src/scss/tocbot-core';
@import 'tocbot/src/scss/tocbot-default-theme';
```


### Usage

Initialize the script

```javascript
tocbot.init({
  // Where to render the table of contents.
  tocSelector: '.js-toc',
  // Where to grab the headings to build the table of contents.
  contentSelector: '.js-toc-content',
  // Which headings to grab inside of the contentSelector element.
  headingSelector: 'h1, h2, h3',
});
```

If content in the div has changed then trigger a refresh (optionally with new options).

```javascript
tocbot.refresh();
```


## Requirements

This library uses **vanilla JavaScript**. It is less than 400 bytes of CSS and about 4Kb of JavaScript (minified and gzipped). The only dependency this script has is [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll) (which has no dependencies).

This script works in **all modern browsers and IE 7+**.

Make sure rendered headings have id attributes, some markdown libraries (like [marked](https://github.com/chjj/marked)) already do this.


## API

### Options

```javascript
// Where to render the table of contents.
tocSelector: '.js-toc',
// Where to grab the headings to build the table of contents.
contentSelector: '.js-toc-content',
// Which headings to grab inside of the contentSelector element.
headingSelector: 'h1, h2, h3',

// Headings that match the ignoreSelector will be skipped.
ignoreSelector: '.js-toc-ignore',
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
  speed: 300, // animation duration.
  updateURL: true
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
fixedSidebarOffset: 'auto'
```


### Methods

#### .init

Initialize tocbot with an options object.

```javascript
tocbot.init(options)
```

#### .destroy

Destroy tocbot and remove event listeners.

```javascript
tocbot.destroy()
```

#### .refresh

Refresh tocbot if the document changes and it needs to be rebuilt.

```javascript
tocbot.refresh()
```


## Roadmap

- More tests
- Blog post to announce it
- Option for changing the url hash on scroll
- React.js support


## Changelog


### v2.1.1

#### Changed
- [patch] update file size estimates in the docs
- [patch] switch from throwing errors to using console.warn


### v2.1

#### Added
- [minor] add `positionFixedSelector` option to specify the element to add a fixed position class to
- [dev] use travis-ci for builds


### v2.0

#### Added
- [major] smooth-scroll is included by default now
- [patch] throttling support to improve performance, also the `throttleTimeout` option
- [patch] new "try it now" option on documentation site

#### Changed
- [minor] broke up scss files and separate tocbot styles better
- [minor] default option for `contentSelector` to be `.js-toc-content`
- [minor] default option for `ignoreSelector` to be `.js-toc-ignore`
- [minor] default option for `collapsibleClass` to be `.is-collapsible`
- [patch] reorder `default-options.js`
- [patch] update documentation

#### Removed
- [patch] dependency on classList to improve browser support

#### Fixed
- [minor] new and improved tests using jsdom
- [dev] switched from gulp to npm scripts
- [dev] switched from browserify to webpack
- [dev] switched from swig to react for building the documentation


### v1.0
- First published source code


## Contributing

Contributions and suggestions are welcome! Please feel free to open an issue if you run into a problem or have a feature request. I'll do my best to respond in a timely fashion.

If you want to open a pull request just fork the repo but please make sure all tests and lint pass.


### Running Tests

```bash
npm test
```


## License

[MIT]('http://opensource.org/licenses/MIT')
