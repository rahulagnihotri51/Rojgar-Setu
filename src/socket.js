import { io } from 'socket.io-client'

const serverUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const socket = io(new URL(serverUrl, window.location.origin).origin, { autoConnect: false })
