// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const bottleSchema = new Schema(
	{
        brand: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        datePurchased: {
            type: Date,
            required: true
        },
        imageURL: {
            type: String,
            required: true
        },
        keepTime: Number,
        keepExpiration: Date,
        volumeRemaining: Number,
        sharing: {
            type: Boolean,
            required: true
        },
        sharedWith: [String],
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const Bottle = model('Bottle', bottleSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Bottle
