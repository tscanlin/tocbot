const globby = require('globby')
const spawn = require('child_process').spawnSync
const config = require('../next.config.js')

const fs = require('fs-extra')

const prefix = config.assetPrefix

globby(`out/**/page`).then((files) => {
  const folder = files[0]
  const newFolder = folder.split('/page').join(prefix)
  console.log('Copying: ', folder, newFolder)
  fs.copySync(folder, newFolder)
  fs.moveSync(newFolder, folder + prefix)
  globby(folder + prefix + '/**/*.js').then((editFiles) => {
    console.log(editFiles)
    editFiles.forEach((file) => {
      fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
          return console.log(err)
        }

        const newString = "window.__NEXT_REGISTER_PAGE('" + prefix
        const rootPathString = "window.__NEXT_REGISTER_PAGE('/'"

        let result = data
        if (data.indexOf(newString) === -1 && data.indexOf(rootPathString) === -1) {
          result = data.replace(/window.__NEXT_REGISTER_PAGE\(\'/g, newString)
        } else if (data.indexOf(rootPathString) > -1) {
          // If it's the index page then don't leave the trailing slash.
          result = data.replace(/window.__NEXT_REGISTER_PAGE\(\'\/\'/g, newString + "'")
        }

        fs.writeFile(file, result, 'utf8', function (err) {
          if (err) return console.log(err)
        })
      })
    })
  }).catch((e) => {
    console.log(e)
  })
  return files
}).catch((e) => {
  console.log(e)
})
