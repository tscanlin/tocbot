<h1 class="dn">
<a href="http://tscanlin.github.io/tocbot">Tocbot</a>
</h1>

<a class="no-decoration" href="https://travis-ci.org/tscanlin/tocbot" target="_blank"><img src="https://travis-ci.org/tscanlin/tocbot.svg?branch=master" alt="travis-ci" /></a>

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
<script src="https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.4.2/tocbot.min.js"></script>
```


### Include CSS

CSS is used for expanding & collapsing groupings and some basic styling.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.4.2/tocbot.css">
```

OR

If you installed it with npm and use sass / postcss you might try importing the styles from 'node_modules', [see the includePath option documentation for more info](https://github.com/sass/node-sass#includepaths)

```scss
@import 'tocbot/src/scss/tocbot-core';
@import 'tocbot/src/scss/tocbot-default-theme';
```


### Usage

Initialize the script

```js
tocbot.init({
  // Where to render the table of contents.
  tocSelector: '.js-toc',
  // Where to grab the headings to build the table of contents.
  contentSelector: '.js-toc-content',
  // Which headings to grab inside of the contentSelector element.
  headingSelector: 'h1, h2, h3',
});
```

**NOTE:** Make sure headings have id attributes, tocbot and your browser needs these to make hashes jump to the proper heading, some markdown libraries (like [marked](https://github.com/chjj/marked)) already do this for you.

If content in the div has changed then trigger a refresh (optionally with new options).

```javascript
tocbot.refresh();
```


## Examples

- [Tocbot Homepage](http://tscanlin.github.io/tocbot/)
- [Pagekit TOC](https://spqr.wtf/projects/toc)
- [Optimizely's Developer Documentation](https://developers.optimizely.com/x/solutions/javascript/reference/index.html)

If you'd like to add your page to this list open a pull request.


## Requirements

This library uses **vanilla JavaScript**. It is less than 350 bytes of CSS and about 3.6Kb of JavaScript (minified and gzipped) it also has no dependencies.

This script works in **all modern browsers and IE 9+**.

**Make sure rendered headings have id attributes**, some markdown libraries (like [marked](https://github.com/chjj/marked)) already do this. If you need to do this client side see [this script](https://github.com/tscanlin/tocbot/blob/master/src/utils/make-ids.js).

**NOTE:** to exclude anchor elements from smooth scrolling, add the class `no-smooth-scroll`.


### Fixed headers

To handle anchor links properly when you have a fixed header, I recommend using CSS similar to the following:

```css
h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
    display: block;
    content: " ";
    height: 60px;
    margin-top: -60px;
    visibility: hidden;
}
```

This is better than javascript solutions since it will work when javascript is disabled.


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
// For headings inside relative or absolute positioned containers within content
hasInnerContainers: false,
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
// Smooth scrolling enabled.
scrollSmooth: true,
// Smooth scroll duration.
scrollSmoothDuration: 420,
// Callback for scroll end.
scrollEndCallback: function (e) { },
// Headings offset between the headings and the top of the document (this is meant for minor adjustments).
headingsOffset: 1,
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
includeHtml: false,
// onclick function to apply to all links in toc. will be called with
// the event as the first parameter, and this can be used to stop,
// propagation, prevent default or perform action
onClick: false,
// orderedList can be set to false to generate unordered lists (ul)
// instead of ordered lists (ol)
orderedList: true,
// If there is a fixed article scroll container, set to calculate titles' offset
scrollContainer: null
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
- React.js support (make react support native without direct dom manipulation)


## Contributing

Contributions and suggestions are welcome! Please feel free to open an issue if you run into a problem or have a feature request. I'll do my best to respond in a timely fashion.

If you want to open a pull request just fork the repo but please make sure all tests and lint pass.


### Running Tests

#### All tests
```bash
npm run test
```

#### With debugger
You can run tests through [node-inspector](https://github.com/node-inspector/node-inspector).

[For now, you may need to use node v6 or lower](https://github.com/node-inspector/node-inspector/issues/950#issuecomment-264289415)...
```bash
nvm use 6
```

Once you're on node v6 or lower:
```bash
npm install node-inspector
```

Now that node-inspector is installed, you can run the tests!
```bash
npm run test:debug
```

## Steps to publish

- Push a branch and open a pull request
- run `npm version <patch|minor|major>`
- Update readme.md with notes
- Merge the pull request
- commit dist/
- run `npm publish`
- make release on github


## License

[MIT]('http://opensource.org/licenses/MIT')
