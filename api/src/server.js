const express = require('express')
const cookie_parser = require('cookie-parser')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser');


//Routes
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const recipeRoute = require("./routes/recipe")
const commentRoute = require("./routes/comment")
const categoriesRoute = require('./routes/category')

const server = express()
const PORT = 3001

server.use('/images', express.static(path.join(__dirname, 'images')));


require('./database/database')
// require('./strategies/local')

server.use(express.json())
server.use(cors())
server.use(cookie_parser())
// server.use(session({
//     secret: "Helloworld",
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({
//         mongoUrl: "mongodb://localhost:27017/recipe-sharing-platform"
//     })
// }))
// server.use(passport.initialize())
// server.use(passport.session())
// server.use(bodyParser.json());

server.use('/api/auth/', authRoute)
server.use('/api/user/', userRoute)
server.use('/api/recipe/', recipeRoute)
server.use('/api/comment/', commentRoute)
server.use('/api/categories/', categoriesRoute)


server.listen(PORT, () => {
    console.log("Server Running!")
})
