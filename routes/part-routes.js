const express = require('express')

const Ticket = require('../models/ticket')
const { handle404 } = require('../lib/custom-errors')
const router = express.Router()

// CREATE
router.post('/parts', (req, res, next) => {
    const ticketId= req.body.part.ticketId
   
    const part = req.body.part

    Ticket.findById(ticketId)
        .then(handle404)
        .then(ticket => {
            ticket.parts.push(part)
        })
        .then (ticket => {
            res.status(201).json({ ticket: ticket })
        })
        .catch(next)
})

// DELETE
router.delete('/parts/:partId', (req, res, next) => {
    const ticketId = req.body.part.ticketId

    Ticket.findById(ticketId)
    .then(handle404)
    .then(ticket => {
        ticket.parts.id(req.params.partId).remove()

        return ticket.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router