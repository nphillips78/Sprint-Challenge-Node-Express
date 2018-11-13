const express = require('express')
const actionDB = require('./data/helpers/actionModel')
const projectDB = require('./data/helpers/projectModel')

const port = 5000
const server = express()
server.use(express.json())

const sendUserError = (status, message, res) => {
  res.status(status).json({errorMessage: message})
}


