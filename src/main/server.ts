import { env, setupSocket, app } from '@/main/config'
import http from 'http'

const serverHttp = http.createServer(app)
serverHttp.listen(env.port, () =>
  console.log(`🚀  Server is running on PORT ${env.port}`)
)

const io = setupSocket(serverHttp)
io.on('connection', (socket) => {
  console.log(`Usuário conectado no socket ${socket.id}`)
})

export { io }
