## Changelog

### 4.2.0

### 4.1.3
- Adding the ability to include title tags on the toc headers.

##### Fixed
- Fixed the empty list getting added on refresh and updated dependencies.

### 4.1.2

##### Fixed
- Can't jump to nonASCII heading after click the toc item.

### 4.1.1

##### Fixed
- Fix for hashes in single page apps / next.js apps.

### 4.1.0

##### Fixed
- Use `ol` instead of `ul` element since its more semantic.

### 4.0.1

##### Fixed
- Switch const declarations to var to fix IE 10 for new scroll smooth util.

### 4.0.0

##### **BREAKING CHANGE**
- replaced zenscroll with custom implementation (see [#67](https://github.com/tscanlin/tocbot/issues/67))
- `smoothScroll` option is now `scrollSmooth`, still accepting a boolean
- `smoothScrollDuration` option is now `scrollSmoothDuration`, still accepting a number

##### Fixed
- Works better with next.js and maybe other SPAs now (see [#67](https://github.com/tscanlin/tocbot/issues/67))


### 3.X.X

#### 3.0.6

##### Fixed
- Republished build


#### 3.0.6

##### Fixed
- Edge / IE 11 should work better now


#### 3.0.5

##### Fixed
- Readme updates
- Add onclick handler option


#### 3.0.4

##### Added
- Worked on improving testing, no user facing changes


#### 3.0.3

##### Changed
- Get next.js v3 working for exporting the project page

##### Added
- Updated readme to explain how to handle fixed headers [#58](https://github.com/tscanlin/tocbot/issues/58)
- Add note about excluding smooth scroll from certain elements


#### 3.0.2

##### Changed
- Added dist files to address [#55](https://github.com/tscanlin/tocbot/issues/55)


#### 3.0.1

##### Changed
- Using [next-export](https://github.com/tscanlin/next-export) for deployments now.


#### 3.0.0

##### **BREAKING CHANGE**
- Switched from using smooth-scroll to [zenscroll](https://github.com/zengabor/zenscroll) for reasons.. [#40](https://github.com/tscanlin/tocbot/issues/40)

##### Added
- Using [standard](https://github.com/feross/standard) for code styling now.


### 2.X.X

#### 2.4.0

##### Docs
- Moved toc on the project page to the right side to emphasize content more. Added `.toc-right` class for this.
- Switched to using [next.js](https://github.com/zeit/next.js) with [processmd](https://github.com/tscanlin/processmd) for the website and removed old build scripts.
- Removed optimizely/oui and added tachyons.
- Moved changelog into it's own markdown file.
- Build to `\static` instead of `\build`.

##### Added
- Added `src/components` with the template used for the website. This can now be more easily reused by other projects.

##### Fixed
- Fix test commands to work better


#### 2.3.2

##### Fixed
- [patch] Fix for smooth-scroll callback to work properly. [#36](https://github.com/tscanlin/tocbot/issues/36)
- [patch] Fix for cdnjs to update properly. [#35](https://github.com/tscanlin/tocbot/issues/35)


#### 2.3.1

##### Fixed
- [patch] Fix for clicking svgs to not throw an exception. [#33](https://github.com/tscanlin/tocbot/issues/33)


#### 2.3.0

##### Changed
- [patch] Fix for proper header not being selected due to sub-pixel rounding issues. [#31](https://github.com/tscanlin/tocbot/pull/31)
- [dev] Updated test commands to be able to selectively run tests and debug them more easily. [#29](https://github.com/tscanlin/tocbot/pull/29)


#### 2.2.2

##### Changed
- [patch] Removed updateUrl option from docs since it doesn't work, see: [smooth-scroll #283](https://github.com/cferdinandi/smooth-scroll/pull/283).


#### 2.2.1

##### Added
- [patch] Made bower.json reference unminified file.


#### 2.2.0

##### Added
- [minor] Added bower.json to provide bower support.


#### 2.1.5

##### Added
- [patch] Added `overflow-y: auto` to the `.toc selector so that it scrolls` (#17).
- [dev] Added to deploy script to commit /dist files to master.
- [dev] Added to package.json for cdnjs.


#### 2.1.4

##### Added
- [patch] `includeHtml` option to mirror markup from the headings in the TOC (#14).
- [patch] `listItemClass` will be omitted if an empty string in passed.
- [dev] `test:watch` command.
- [dev] more tests.


#### 2.1.3

##### Added
- [patch] `listItemClass` option to set classes on list items (#12).


#### 2.1.2

##### Fixed
- [patch] prevent errors from being thrown when elements are not present and add tests.


#### 2.1.1

##### Changed
- [patch] update file size estimates in the docs.
- [patch] switch from throwing errors to using console.warn.


#### 2.1.0

##### Added
- [minor] add `positionFixedSelector` option to specify the element to add a fixed position class to.
- [dev] use travis-ci for builds.


#### 2.0.0

##### Added
- [major] smooth-scroll is included by default now.
- [patch] throttling support to improve performance, also the `throttleTimeout` option.
- [patch] new "try it now" option on documentation site.

##### Changed
- [minor] broke up scss files and separate tocbot styles better.
- [minor] default option for `contentSelector` to be `.js-toc-content`.
- [minor] default option for `ignoreSelector` to be `.js-toc-ignore`.
- [minor] default option for `collapsibleClass` to be `.is-collapsible`.
- [patch] reorder `default-options.js`.
- [patch] update documentation.

##### Removed
- [patch] dependency on classList to improve browser support.

##### Fixed
- [minor] new and improved tests using jsdom.
- [dev] switched from gulp to npm scripts.
- [dev] switched from browserify to webpack.
- [dev] switched from swig to react for building the documentation.



### 1.X.X

#### 1.0.0
- First published source code.
