const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
  console.log('connected: ', socket.id)
  socket.broadcast.emit('user-connected', socket.username)

  socket.on('msg', function (user, message) {
    io.sockets.emit('newmsg', user, message)
  })
})

http.listen(8000, function () {
  console.log('Сервер запущен')
})