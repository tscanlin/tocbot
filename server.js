const { createServer } = require('http')
const { parse } = require('url')
const { join } = require('path')
const next = require('next')
const config = require('./next.config.js')
console.log(config);

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const rootStaticFiles = [
  '/favicon.ico',
  '/assets',
  '/css',
  '/js',
]

function removeAssetPrefix(str) {
  // Solve for having the asset prefix in the filename too.
  return str.split(config.assetPrefix + '/').join('/')
}

app.prepare()
.then(() => {
  createServer((req, res) => {
    let parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    console.log(pathname.indexOf('.') === -1, pathname);
    console.log(pathname.indexOf(config.assetPrefix) > -1);
    if (rootStaticFiles.filter((file) => pathname.indexOf(file) > -1).length > 0) {
      const path = join(__dirname, removeAssetPrefix(pathname))
      console.log(path);
      app.serveStatic(req, res, path)
    } else if (pathname.indexOf('.') === -1) {
      app.render(req, res, removeAssetPrefix(pathname), query)
    } else if (pathname.indexOf(config.assetPrefix) > -1) {
      parsedUrl = parse(removeAssetPrefix(req.url), true)
      handle(req, res, parsedUrl)
    } else {
      handle(req, res, parsedUrl)
    }
  })
  .listen(3001, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3001')
  })
})
