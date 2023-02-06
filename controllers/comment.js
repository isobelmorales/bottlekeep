//// IMPORT DEPENDENCIES ////

const express = require('express')
const Bottle = require('../models/bottle')

//// ROUTER ////

const router = express.Router()

//// ROUTES ////

router.post('/:bottleId', (req, res) => {
    const bottleId = req.params.bottleId
    console.log('this is the session\n', req.session)
    if (req.session.loggedIn) {
        req.body.author = req.session.userId
        const theComment = req.body
        Bottle.findById(bottleId)
            .then(bottle => {
                bottle.comments.push(theComment)
                return bottle.save()
            })
            .then(bottle => {
                res.redirect(`/bottles/${bottle.id}`)
            })
            .catch(err => {
                console.log(err)
                res.redirect(`/error?error=${err}`)
            })
    } else {
        res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20comment%20on%20this%20bottle`)
    }
})

router.delete('/delete/:bottleId/:commId', (req, res) => {
    const { bottleId, commId } = req.params
    Bottle.findById(bottleId)
        .then(bottle => {
            const theComment = bottle.comments.id(commId)
            console.log('this is the comment to be deleted: \n', theComment)
            if (req.session.loggedIn) {
                if (theComment.author == req.session.userId) {
                    theComment.remove()
                    bottle.save()
                    res.redirect(`/bottles/${bottle.id}`)
                } else {
                    res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
                }
            } else {
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
            }
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/error?error=${err}`)
        })
})


//// EXPORT ROUTER ////

module.exports = router