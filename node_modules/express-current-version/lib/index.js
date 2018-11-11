/**
 * Imports
 */

var version = require('current-version')

/**
 * express-current-version
 */

function currentVersion (req, res) {
  res.send(version())
}

/**
 * Exports
 */

module.exports = currentVersion
