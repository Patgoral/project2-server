const express = require('express')

const Ticket = require('../models/ticket')
const { handle404 } = require('../lib/custom-errors')
const router = express.Router()

// CREATE
router.post('/tickets/:ticketId/parts', (req, res, next) => {
    const ticketId = req.params.ticketId
   
    const part = req.body.part

    Ticket.findById(ticketId)
        .then(handle404)
        .then(ticket => {
            ticket.parts.push(part)
                return ticket.save()
        })
        .then (ticket => {
            res.status(201).json({ ticket: ticket })
        })
        .catch(next)
})

// DELETE
router.delete('/tickets/:ticketId/parts/:partId', (req, res, next) => {
    const ticketId = req.params.ticketId

    Ticket.findById(ticketId)
    .then(handle404)
    .then(ticket => {
        ticket.parts.id(req.params.partId).remove()

        ticket.save()
    })
    .then(res => {
        res.data = Ticket.findById(ticketId)
        return res
    })
    .catch(next)
})

module.exports = router