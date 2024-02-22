import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const http = createServer(app)

const io = new Server(http, {})

io.on("connection", socket => {
  console.log('Jogador conectado! '+socket.id)

  socket.on('disconnect', disconnect => {
    console.log('Jogador desconectado!', socket.id, disconnect)
  })

  socket.on('player', player => {
    socket.data.player = player
    console.log(socket.data.player)
  })
})

http.listen(9000, () => console.log('Server running...'))