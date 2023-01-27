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
    .then((ticket) => {
      
const updatedParts = ticket.parts.map(part => {
    if(part.id !== req.params.partId){
        return part;
    }
})
ticket.parts = updatedParts;
ticket.save()
    })
    .then(res => {
        res = Ticket.findById(ticketId)
        return 
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
