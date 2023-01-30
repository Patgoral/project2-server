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
    const partId = req.params.partId
    Ticket.findById(ticketId)
    .then(ticket => {
    ticket.parts.id(partId).remove()
        ticket.save().then(updatedTicket => {
            res.send(updatedTicket)
        })
    }).catch(e => {
        return e;
    })
})

module.exports = router
