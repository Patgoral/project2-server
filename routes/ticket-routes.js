const express = require('express')
const { handle404 } = require('../lib/custom-errors')
const Ticket = require('../models/ticket')
const router = express.Router()
const { requireToken } = require('../config/auth')

// INDEX
router.get('/tickets', (req, res, next) => {
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
router.post('/tickets', requireToken, (req, res, next) => {
	console.log(req.user)
	const ticket = req.body.ticket
	ticket.owner = req.user._id

	Ticket.create(req.body.ticket)
		.then((ticket) => {
			res.status(201).json({ ticket: ticket })
		})
		.catch(next)
})

// UPDATE
router.patch('/tickets/:id', requireToken, (req, res, next) => {
	const ticket = req.body.ticket

	Ticket.findById(req.params.id)
		.then(handle404)
		.then((ticket) => {
			if (ticket.owner.equals(req.user._id)) {
				return ticket.updateOne(req.body.ticket)
			} else {
				return
			}
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DELETE
router.delete('/tickets/:id', requireToken, (req, res, next) => {
	Ticket.findById(req.params.id)
		.then(handle404)
		.then((ticket) => {
			if (ticket.owner.equals(req.user._id)) {
				return ticket.deleteOne()
			} else {
				return
			}
			
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
