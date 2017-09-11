require('./check-versions')()
const colors = require('colors')
const generateIndex = require('../config/generateIndex.js')
console.log('')
console.log('> Nodriza Manual')
console.log('')
console.log('')
console.log('       .:/++++/:-`     '.blue + '        :o: '.yellow + '       `/.        '.red)
console.log('     -++:-````.:++:`   '.blue + '       -hh: '.yellow + '      `///.       '.red)
console.log('    /+/`        `:++`  '.blue + '      .hd/  '.yellow + '     `//.//.      '.red)
console.log('   .++`           ++:  '.blue + '     `yd+   '.yellow + '    `//. `//.     '.red)
console.log('   -++            /+/  '.blue + '    `ydo    '.yellow + '   `//.   `//.    '.red)
console.log('   `++-          .++-  '.blue + '   `sds     '.yellow + '  `//.     `//.   '.red)
console.log('    .++:`      `-++-   '.blue + '   ody`     '.yellow + ' `//-       .//.  '.red)
console.log('     `:++/::::/++:`    '.blue + '  /dy`      '.yellow + '`:/-         .//. '.red)
console.log('        `.----.`       '.blue + '   ``       '.yellow + '`..           `...'.red)
console.log('                                                     ')
console.log('')

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {

  },

})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    // Generate index.json when something change...
    // generateIndex(() => {})
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preservings
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://' + process.env.DOMAIN + ':' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

// Generate index.json when start
generateIndex(() => {})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri)

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)
server.keepAliveTimeout = 120000 * 5

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
