/**
 * Imports
 */

var fs = require('fs')
var path = require('path')

/**
 * Vars
 */

var cache = null

/**
 * Current version
 */

function version () {
  cache = cache || findPath()
  return require(cache).version
}

function findPath () {
  var root = null

  require.main.paths.some(function (p) {
    var parts = p.split('/')
    parts.pop()
    root = path.join(parts.join('/'), 'package.json')
    return fs.existsSync(root)
  })

  return root
}

/**
 * Exports
 */

module.exports = version
