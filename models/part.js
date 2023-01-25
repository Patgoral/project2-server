const mongoose = require('mongoose')

const Schema = mongoose.Schema

const partSchema = new Schema(
    {
        partName: {
            type: String,
            required: true,
        },
        partNumber: {
            type: String,
            required: true,
        }
    }, {
        timestamps: true
    }
)

module.exports = partSchema