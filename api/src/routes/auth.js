require('dotenv').config()
const User = require('../database/modules/User')
const { Router } = require('express')
const { hashPassword, comparePassword } = require('../utils/helper')
const jwt = require('jsonwebtoken')
const { jwtCheck } = require('../strategies/auth0')

const router = Router()

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body
        const userDB = await User.findOne({ email });

        if (userDB && comparePassword(password, userDB.password)) {
            const username = userDB.username
            const _id = userDB._id;
            const user = { name: username, _id: _id }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            res.json({ accessToken: accessToken })
        } else {
            res.sendStatus(404)
        }
    } catch (error) {
        res.sendStatus(404)
    }

})

router.post('/register', async (req, res) => {
    const { email, username, bio } = req.body
    console.log(req.body)
    const userDB = await User.findOne({ email })
    if (userDB) {
        res.status(400).send("User alredeay exist")
    } else {
        const password = hashPassword(req.body.password);
        const newUser = await User.create({ password, email, username, bio })
        newUser.save()

        const user = { name: newUser.username, _id: newUser._id }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({ newUser, accessToken: accessToken })
    }
})

router.post('/checkOrCreateUser', jwtCheck, async (req, res) => {
    const googleId = req.auth.payload.sub.split('|')[1]
    console.log(googleId)
    try {
        // Check if user exists in the database
        const existingUser = await User.findOne({ googleId: googleId });
        console.log(existingUser)
        if (existingUser) {
            // User exists
            res.status(200).json({ message: 'User already exists', user: existingUser });
        } else {
            // User doesn't exist, create a new user
            console.log("New User")
            const newUser = new User({ googleId: googleId });
            await newUser.save();
            res.status(201).json({ message: 'User created successfully', user: newUser });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router
