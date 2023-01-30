const mongoose = require('mongoose')
const partSchema = require('./part')
const userSchema = require('./user')

const Schema = mongoose.Schema

const ticketSchema = new Schema(
    {
        customerName: {
            type: String,
            required: true,
        },
        bikeName: {
            type: String,
            required: true,
        },
        svcDesc: {
            type: String,
            required: true,
        },
        parts: [partSchema],
        
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
       
    },
    {
        timestamps: true,
    }
)

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket