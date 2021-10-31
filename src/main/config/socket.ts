import { Server as HttpServer } from 'http'
import { Server } from 'socket.io'

export const setupSocket = (server: HttpServer): Server => {
  return new Server(server, {
    cors: {
      origin: '*'
    }
  })
}
