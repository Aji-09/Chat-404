const express = require('express')
const {join} = require('node:path')
const {createServer} = require("node:http")
const {Server} = require("socket.io")

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

io.on("connection", (socket)=>{
    socket.on("message", (msg)=> {
        socket.send(msg)
        console.log(msg)
    })
})

app.use(express.static(join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.send()
  
});


httpServer.listen(3000)