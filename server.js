//기본 설정
const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const server = http.createServer(app);

//라우팅
app.get('/prc1', (req,res) => res.sendFile(__dirname + '/public/prc1.html'));
app.use((req, res, next) => res.status(404).send('<h1>404 Not Found<h1>'));

//서버 실행
server.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
})

//채팅 연습
//socket server
const socket = require('socket.io');
const io = socket(server);

//socket connected
io.on('connection', (socket) => {
  console.log('socket connected');
  //from Client
  socket.on('join', (msg) => {
    //방에 입장
    console.log(msg.userId + '가 입장');
    console.log(msg.roomId + '에 입장');
    socket.join(msg.roomId);
  });
  //from Client
  socket.on('toServer', (msg) => {
    //to Client
    io.to(msg.roomId).emit('toClient', msg);
  });
  socket.on('disconnect', () => {
    console.log('socket discconnectd');
  });
});