const passport = require('passport')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET || 'bikeshop'

const { Strategy, ExtractJwt } = require('passport-jwt')

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret,
}

const User = require('../models/user')

const strategy = new Strategy(opts, function (jwt_payload, done) {
	User.findById(jwt_payload.id)
		.then((user) => done(null, user))
		.then((user) => done(null, user))
})

passport.use(strategy)

const requireToken = passport.authenticate('jwt', { session: false })

const createUserToken = (req, user) => {
	if (
		!user ||
		!req.body.credentials.password ||
		!bcrypt.compareSync(req.body.credentials.password, user.password)
	) {
		const err = new Error('Incorrect username or password')
		err.statusCode = 422
		throw err
	}
	return jwt.sign({ id: user._id }, secret, { expiresIn: 44000 })
}

module.exports = {
	requireToken,
	createUserToken,
}
