const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://nourkhansa7:1RXm9gw4gBOhiPgT@tasty_bits_hub.kurwnz6.mongodb.net/tasty_bits_hub?retryWrites=true&w=majority&appName=protopia')
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err))