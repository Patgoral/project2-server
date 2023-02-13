const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const db = require('./config/db')

const requestLogger = require('./lib/request-logger')
const ticketSeed = require('./lib/ticket-seed')
const ticketRoutes = require('./routes/ticket-routes')
const partRoutes = require('./routes/part-routes')
const userRoutes = require('./routes/user-routes')

const PORT = process.env.PORT || 8000

mongoose.set('strictQuery', true)

mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const app = express()

app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://127.0.0.1:5505` }))

app.use(express.json())
app.use(requestLogger)

app.use(ticketRoutes)
app.use('/seed', ticketSeed) // Nice seed route
app.use(partRoutes)
app.use(userRoutes)

app.listen(PORT, () => {
	console.log('Listening on port ' + PORT)
})

module.exports = app
