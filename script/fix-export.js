const globby = require('globby')
const spawn = require('child_process').spawnSync
const config = require('../next.config.js')

const fs = require('fs-extra')

globby(`out${config.assetPrefix}_next/*/page`).then((files) => {
  const folder = files[0]
  const newFolder = folder.split('/page').join(config.assetPrefix)
  fs.copySync(folder, newFolder)
  fs.moveSync(newFolder, folder)
  return files
}).catch((e) => {
  console.log(e)
})
