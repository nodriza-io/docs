const express = require('express')
const path = require('path')
const history = require('connect-history-api-fallback')
const dir = path.join(__dirname + '/../dist')
const port = 5000
const app = express()
const staticFileMiddleware = express.static(dir)

app.use(staticFileMiddleware)
app.use(history())
app.use(staticFileMiddleware)

app.get('/', function (req, res) {
  res.render(path.join(dir + '/index.html'))
})

app.listen(5000, function () {
  console.log('Serving statics on -> http://localhost:' + port)
})
