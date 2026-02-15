const express = require('express')
const {join} = require('node:path')
const {createServer} = require("node:http")
const {Server} = require("socket.io")

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

io.on("connection", (socket)=>{
    socket.on("message", (msg)=> {
        io.emit("message", {message: msg, id: socket.id})
    })
})

app.use(express.static(join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.send()
  
});


httpServer.listen(3000)
