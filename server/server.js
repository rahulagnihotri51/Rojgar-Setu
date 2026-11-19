import 'dotenv/config'
import { createServer } from 'node:http'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import authRoutes from './routes/auth.js'
import jobRoutes from './routes/jobs.js'
import workerRoutes from './routes/workers.js'
import { seed } from './seed.js'

const app = express()
const httpServer = createServer(app)
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'
const io = new Server(httpServer, {
  cors: { origin: frontendOrigin, methods: ['GET', 'POST', 'PATCH'] },
})

app.set('io', io)
app.use(cors({ origin: frontendOrigin }))
app.use(express.json())
app.get('/api/health', (_, res) => res.json({ ok: true, socketIo: true, database: mongoose.connection.readyState === 1 }))
app.use('/api/auth', authRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/workers', workerRoutes)

io.on('connection', socket => {
  console.log(`Socket connected: ${socket.id}`)
  if (process.env.NODE_ENV !== 'production') {
    socket.on('demo:job-created', job => {
      if (!job || typeof job.title !== 'string' || typeof job.skill !== 'string') return
      socket.broadcast.emit('job:created', job)
    })
  }
  socket.on('disconnect', () => console.log(`Socket disconnected: ${socket.id}`))
})

const port = process.env.PORT || 5000
httpServer.listen(port, () => console.log(`Rojgar Setu API and Socket.IO listening on ${port}`))

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
      console.log('MongoDB connected')
      await seed()
    })
    .catch(err => console.error('MongoDB unavailable; realtime demo is running without database:', err.message))
} else {
  console.log('MONGO_URI is not set; realtime demo is running without database')
}
