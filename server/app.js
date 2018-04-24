const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const port = process.env.PORT || 3000
const OAuth2Server = require('oauth2-server');
const https = require('https');
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}
//configuartion
const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())



//routes
app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/users'))



//default route
app.use(function(req, res, next) {
  next({
    status: 404,
    message: 'Route not found'
  })
})

//error handling
app.use(function(err, req, res, next) {
  const errorMessage = {}

  if (process.env.NODE_ENV !== 'production' && err.stack)
    errorMessage.stack = err.stack

  errorMessage.status = err.status || 500
  errorMessage.message = err.message || 'Internal Server Error'

  res.status(errorMessage.status).send(errorMessage)
})

//starting Server

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})
