
// require : node_modules <= express 이름만 적어줘도 이를 가져옴
const express = require('express')
// express를 실행한 것을 app에 담는다.
const http = require('http')
const app = express();
const path = require('path')
const server = http.createServer(app);
const socketIO = require('socket.io')
const moment = require('moment');

const io = socketIO(server);


app.use(express.static(path.join(__dirname, "src")))
const port = process.env.port || 5000;

io.on('connection', (socket) => {
    socket.on('chatting', (data) => {
        const {name, msg} = data;

        io.emit('chatting', {
            name,
            msg,
            time : moment(new Date()).format("h:ss A")
        })
    })
})

server.listen(port, () => console.log(`server is running : ${port}`))