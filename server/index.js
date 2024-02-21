const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require("socket.io")

server.listen(9000, () => console.log('Server running...'))