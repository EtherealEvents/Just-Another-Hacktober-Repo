import express from 'express'

import cors from 'cors'
import { AddressInfo } from 'net'

import { createServer } from 'http'

const app = express()

const server = createServer(app)

import socketio from 'socket.io'

app.use(cors())
app.use(express.json())

const io: socketio.Server = socketio(server)

io.origins('*:*')

io.on('connect', (socket) => {
	console.log('New connection')
	socket.emit('data', { bar: 'foo' })
})

io.on('connection', (socket) => {
	setInterval(() => socket.send('Sent a message.'), 400)

	socket.on('data', function (data) {
		console.log(data)
		socket.emit('data',JSON.stringify(data))
	})

	socket.on('disconnect', function () {
		console.log('A user disconnected')
	})
})

const port = 8080

const runServer = async () => {
	server.listen(port, () => {
		const addr = server.address() as AddressInfo
		console.log(`Listening on port ${addr.port}`)
	})

	return server
}

runServer()
