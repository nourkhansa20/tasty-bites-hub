const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  bio: { type: String },
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;


// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   googleId:{ type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   profilePicture: { type: String },
//   bio: { type: String },
//   recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
//   favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
//   followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// });