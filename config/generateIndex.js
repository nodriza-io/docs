  const treeify = require('file-tree-sync')
  const fs = require('fs')
  /**
   * Generate index.json
   * From a route to create menu from dir tree
   */
  module.exports = function(callback) {
    const json = './static/index.json'
    const files = treeify('./static/html', ['.*'])
    console.log('> Updating ' + json + '...')
    fs.writeFile(json, JSON.stringify(files, null, 2), (err) => {
      if (err) throw Error(err)
      if (callback) callback(null, '> ' + json + ' updated successfully!')
    })
  }