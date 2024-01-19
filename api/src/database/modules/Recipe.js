const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ingredients: [{ name: String, quantity: String }],
  steps: [{ type: String }],
  cookingTime: { type: Number },
  difficultyLevel: { type: String },
  servingSize: { type: Number },
  images: [{ type: String }],
  tags: [{ type: String }],
  ratings: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, value: Number }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to Category model
  createdAt: { type: Date, default: Date.now },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
