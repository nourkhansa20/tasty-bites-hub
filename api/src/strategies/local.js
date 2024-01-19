const passport = require("passport")
const { Strategy } = require("passport-local")
const User = require('../database/modules/User')
const { comparePassword } = require('../utils/helper')
const jwt = require('jsonwebtoken');

passport.serializeUser((user, done) => {
    console.log("Serializeing user")
    done(null, user)
})

passport.deserializeUser(async (id, done) => {
    console.log("Deserlasing User")
    try {
        const user = await User.findById(id)
        if (!user) throw new Error('User not found')
        done(null, user.userDB)
    } catch (err) {
        console.log(err)
        done(err, null)
    }
})

passport.use(
    new Strategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        try {
            // Check for missing credentials
            if (!email || !password) {
                return done(new Error('Bad Request. Missing credentials'), null);
            }

            const userDB = await User.findOne({ email });
            if (!userDB) {
                throw new Error('User not found');
            }

            const isValid = comparePassword(password, userDB.password);
            if (isValid) {
                console.log('Authenticated Successfully');
                const token = jwt.sign({ sub: userDB.id, username: userDB.username }, 'your-secret-key');
                done(null, { userDB, token });
            } else {
                console.log('Invalid Authentication');
                done(new Error('Invalid Authentication'), null);
            }
        } catch (err) {
            console.error(err);
            done(err, null);
        }
    })
);



