const express = require('express')
const { handle404 } = require('../lib/custom-errors')
const Ticket = require('../models/ticket')
const { requireToken } = require('../config/auth')
const router = express.Router()

// INDEX
router.get('/tickets',(req, res, next) => {
	Ticket.find()
		.then((tickets) => {
			return tickets.map((ticket) => ticket)
		})
		.then((tickets) => res.status(200).json({ tickets: tickets }))
		.catch(next)
})

// SHOW
router.get('/tickets/:id', (req, res, next) => {
	Ticket.findById(req.params.id)
		.then(handle404)
		.then((ticket) => res.status(200).json({ ticket: ticket }))
		.catch(next)
})

// CREATE
router.post('/tickets', (req, res, next) => {
	Ticket.create(req.body.ticket)
		.then((ticket) => {
			res.status(201).json({ ticket: ticket })
		})
		.catch(next)
})

// UPDATE
router.patch('/tickets/:id', (req, res, next) => {
	Ticket.findById(req.params.id)
		.then(handle404)
		.then((ticket) => {
			return ticket.updateOne(req.body.ticket)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DELETE
router.delete('/tickets/:id', (req, res, next) => {
	Ticket.findById(req.params.id)
		.then(handle404)
		.then((ticket) => {
			ticket.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
