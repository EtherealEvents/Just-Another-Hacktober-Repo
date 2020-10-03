import socketio

sio = socketio.Client()

sio.connect('http://localhost:8080')

sio.emit('data', {'foo': 'bar'})

@sio.on('data')
def on_message(data):
    print(data)

