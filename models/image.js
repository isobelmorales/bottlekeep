//// IMPORT DEPENDENCIES ////

const mongoose = require('./connection')
const User = require('./user')

const { Schema } = mongoose

//// SCHEMA ////

const imageSchema = new Schema({
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

//// EXPORT MODEL ////

module.exports = imageSchema