const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/recipe-sharing-platform')
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err))