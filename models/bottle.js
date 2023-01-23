// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const bottleSchema = new Schema(
	{
        name: {
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
        holdingTime: Number,
        holdingExpiration: Date,
        volumeRemaining: Number,
        sharing: Boolean,
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
