require('dotenv').config()
const User = require('../database/modules/User')
const { Router } = require('express')
const { hashPassword, comparePassword } = require('../utils/helper')
const jwt = require('jsonwebtoken')


const authenticateToken = require('../strategies/jwt')

const router = Router()

const { jwtCheck } = require('../strategies/auth0')

router.get('/user', jwtCheck, (req, res) => {
    // Access user information from the decoded JWT
    const userId = req.user.sub; // sub is the user ID in Auth0
    const username = req.user.username; // Replace with the actual field in your JWT

    // Your secured route logic here
    res.json({ message: 'Secured Route', userId, username });
});

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

router.get('/check-token', authenticateToken, (res, req) => {
    res.status(200).json({ mess: "Authorize" })
})

module.exports = router
