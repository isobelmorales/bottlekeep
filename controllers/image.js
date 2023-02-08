//// IMPORT DEPENDENCIES ////

const express = require('express')
const multer = require('multer')
const Bottle = require('../models/bottle')

//// ROUTER ////
const router = express.Router()
const upload = multer()

//// ROUTES ////

router.post('/:bottleId', (req, res) => {
    const bottleId = req.params.bottleId
    console.log('this is the session\n', req.session)
    if (req.session.loggedIn) {
        req.body.author = req.session.userId
        const theImage = req.body
        Bottle.findById(bottleId)
            .then(bottle => {
                bottle.images.push(theImage)
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
        res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20upload%20on%20this%20bottle`)
    }
})

router.delete('/delete/:bottleId/:imageId', (req, res) => {
    const { bottleId, imageId } = req.params
    Bottle.findById(bottleId)
        .then(bottle => {
            const theImage = bottle.images.id(imageId)
            console.log('this is the image to be deleted: \n', theImage)
            if (req.session.loggedIn) {
                if (theImage.author == req.session.userId) {
                    theImage.remove()
                    bottle.save()
                    res.redirect(`/bottles/${bottle.id}`)
                } else {
                    res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20image`)
                }
            } else {
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20image`)
            }
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/error?error=${err}`)
        })
})


//// EXPORT ROUTER ////

module.exports = router