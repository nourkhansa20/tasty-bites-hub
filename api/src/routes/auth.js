require('dotenv').config()
const User = require('../database/modules/User')
const { Router } = require('express')
const { hashPassword, comparePassword } = require('../utils/helper')
const jwt = require('jsonwebtoken')

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

module.exports = router
