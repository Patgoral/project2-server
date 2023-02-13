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
	ticket.owner = req.user._id // 

	Ticket.create(req.body.ticket)
		.then((ticket) => {
			res.status(201).json({ ticket: ticket })
		})
		.catch(next)
})

// UPDATE
router.patch('/tickets/:id', requireToken, (req, res, next) => {
	const ticket = req.body.ticket // ah, i see we have 2 variables in scope(below) with the same name of ticket, consider a new name of ticketData or something similar to allow us to dry up line 46

	Ticket.findById(req.params.id)
		.then(handle404)
		.then((ticket) => { 
			if (ticket.owner.equals(req.user._id)) { // YAS!!!!!
				return ticket.updateOne(req.body.ticket)
			} else {
				return // consider returning an authorization error
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
			if (ticket.owner.equals(req.user._id)) { // great use of model.id.equals()
				return ticket.deleteOne()
			} else {
				return // see 48
			}
			// inconsistent whitespace
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
