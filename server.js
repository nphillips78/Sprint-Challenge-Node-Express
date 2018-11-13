const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const projectRoute = require('./routes/projectRoute')
const actionRoute = require('./routes/actionRoute')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(morgan('short'))
server.use(cors())
server.use('/projects', projectRoute)
server.use('/actions', actionRoute)


server.get('', (req, res) => {
  res.json({ message: "It'/s aliiiiive!"})
}

