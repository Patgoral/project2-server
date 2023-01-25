const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const { createUserToken } = require('../config/auth')

const router = express.Router()

// POST /sign-up
router.post('/sign-up', (req, res, next) => {
    bcrypt
        .hash(req.body.credentials.password, 10)
        .then(hashedPassword => {
            return {
                username: req.body.credentials.username,
                password: hashedPassword
            }
        })
        .then(user => User.create(user))
        .then(user => {
            res.status(201).json({ user: user })
        })
        .catch(next)
})


// POST /sign-in

router.post('/sign-in', (req, res, next) => {
    User.findOne({ username: req.body.credentials.username })
        .then(user => createUserToken(req, user))
        .then(token => res.json({ token: token }))
        .catch(next)
})
module.exports = router
