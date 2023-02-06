// Import Dependencies
const express = require('express')
require('dotenv').config()
const Bottle = require('../models/bottle')

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
router.use((req, res, next) => {
	// checking the loggedIn boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/auth/login')
	}
})

// Routes

// index ALL
router.get('/', (req, res) => {
	Bottle.find({})
        .populate('owner', 'username')
        .populate('comments.author', '-password')
		.then(bottles => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			
			res.render('bottles/index', { bottles, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's bottles
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Bottle.find({ owner: userId })
        .populate('owner', 'username')
        .populate('comments.author', '-password')
		.then(bottles => {
			res.render('bottles/index', { bottles, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('bottles/new', { username, userId,loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
    req.body.owner = req.session.userId
	req.body.sharing = req.body.sharing === 'on' ? true : false
    console.log('this is req.body aka newBottle, after owner\n', req.body)
	Bottle.create(req.body)
		.then(bottle => {
			console.log('this was returned from create', bottle)
			res.redirect('/bottles/${bottle.id}')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const bottleId = req.params.id
	Bottle.findById(bottleId)
		.then(bottle => {
			res.render('bottles/edit', { bottle })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const bottleId = req.params.id
	req.body.sharing = req.body.sharing === 'on' ? true : false

	Bottle.findByIdAndUpdate(bottleId, req.body, { new: true })
		.then(bottle => {
			res.redirect(`/bottles/${bottle.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const bottleId = req.params.id
	Bottle.findById(bottleId)
        .populate('comments.author', 'username')
		.then(bottle => {
            const {username, loggedIn, userId} = req.session
			res.render('bottles/show', { bottle, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const bottleId = req.params.id
	Bottle.findByIdAndRemove(bottleId)
		.then(bottle => {
			res.redirect('/bottles')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
