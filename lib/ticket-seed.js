const express = require('express')

const Ticket = require('../models/ticket')

const router = express.Router()

const startTickets = [
	{
		customerName: 'Chris Tavel',
		bikeName: 'Surly Karate Monkey',
		svcDesc: 'Tune-Up, New Tires, Rear shift cable',
	},
	{
		customerName: 'Kinzer Hewitt',
		bikeName: 'Kona Process',
		svcDesc: 'New rear triangle, New pivot bearings, New Headset',
	},
	{
		customerName: 'Scott Shite',
		bikeName: 'Custom Hoefer',
		svcDesc: 'Brake pads, New Bar Tape, Check sealant',
	},
]

router.get('/tickets', (req, res, next) => {
	Ticket.deleteMany({})
		.then(() => {
			Ticket.create(startTickets).then((tickets) =>
				res.status(200).json({ tickets: tickets })
			)
		})
		.catch(next)
})

module.exports = router
