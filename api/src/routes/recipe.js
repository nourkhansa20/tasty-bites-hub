const { Router } = require('express')
const User = require('../database/modules/User');
const Recipe = require('../database/modules/Recipe');
const Category = require('../database/modules/Category');

const authenticateToken = require('../strategies/jwt')

const path = require('path')

const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../images/recipes'));
    },
    filename: function (req, file, cb) {
        const recipeId = req.params.recipeId;
        const fileExtension = path.extname(file.originalname);
        cb(null, `${recipeId}${fileExtension}`);
    }
});

const upload = multer({ storage })

const router = Router()

router.get('/', authenticateToken,
    async (req, res) => {
        try {
            const categories = await Recipe.distinct('category', { category: { $exists: true, $ne: null } });
            if (!categories) {
                res.status(404).json("NO Categories available")
            }

            const recipesPromises = categories.map(async (category) => {
                const recipes = await Recipe.find({ category: category._id }).limit(4).populate('category').populate({ path: "author", select: 'username _id' });
                return recipes
            });

            const recipes = await Promise.all(recipesPromises); // promise.all to wait for all async operations

            res.status(200).json(recipes)
        } catch (error) {
            console.error('Error fetching categories and recipes:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
)

router.post('/create', authenticateToken,
    async (req, res) => {
        try {
            const { title, ingredients, steps, cookingTime, difficultyLevel, servingSize, tags, category } = req.body;

            const newRecipe = new Recipe({
                title,
                author: req.user._id,
                ingredients,
                steps,
                cookingTime,
                difficultyLevel,
                servingSize,
                category,
                tags,
            });

            await newRecipe.save();
            await User.findByIdAndUpdate(req.user._id, { $push: { recipes: newRecipe._id } });

            res.status(201).json({ message: 'Recipe added successfully', recipe: newRecipe });

        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    })

router.post('/save-recipe-photo/:recipeId', authenticateToken, upload.single('photo'),
    (req, res) => {
        res.status(200).json({ message: "image uploaded" })
    }
)

router.delete('/delete/:recipeId', authenticateToken,
    async (req, res) => {
        try {
            const { recipeId } = req.params;

            const recipe = await Recipe.findById(recipeId);
            if (!recipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }

            if (recipe.author.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'You do not have permission to delete this recipe' });
            }

            await User.findByIdAndUpdate(req.user._id, { $pull: { recipes: recipeId } });

            await Recipe.findByIdAndDelete(recipeId);

            res.status(200).json({ message: 'Recipe deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    });


router.post('/add-to-favorites/:recipeId', authenticateToken,
    async (req, res) => {
        try {
            const { recipeId } = req.params;

            const recipe = await Recipe.findById(recipeId);
            if (!recipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }

            const userId = req.user._id;

            // Check if the recipe is already in favorites
            const user = await User.findById(userId);

            if (user.favorites.includes(recipeId)) {
                // Recipe is already in favorites, remove it
                await User.findByIdAndUpdate(userId, { $pull: { favorites: recipeId } });
                res.status(200).json({ message: false });
            } else {
                // Recipe is not in favorites, add it
                await User.findByIdAndUpdate(userId, { $addToSet: { favorites: recipeId } });
                res.status(200).json({ message: true });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

router.get('/is-favorite/:recipeId', authenticateToken,
    async (req, res) => {
        try {
            const { recipeId } = req.params;

            // Validate if the provided recipeId is a valid MongoDB ObjectId
            const recipe = await Recipe.findById(recipeId);
            if (!recipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }
            const userId = req.user._id;

            // Check if the recipe is in the user's favorites
            const user = await User.findById(userId);

            if (user.favorites.includes(recipeId)) {
                res.status(200).json({ isFavorite: true });
            } else {
                res.status(200).json({ isFavorite: false });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

router.put('/update-recipe/:recipeId', authenticateToken,
    async (req, res) => {
        try {
            const { recipeId } = req.params;
            const { title, ingredients, steps, cookingTime, difficultyLevel, servingSize, tags } = req.body;

            const recipe = await Recipe.findById(recipeId);
            if (!recipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }

            if (recipe.author.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'You do not have permission to update this recipe' });
            }

            const updatedRecipe = await Recipe.updateOne(
                { _id: recipeId },
                {
                    $set: {
                        title,
                        ingredients,
                        steps,
                        cookingTime,
                        difficultyLevel,
                        servingSize,
                        tags,
                    },
                }
            );

            res.status(200).json({ message: 'Recipe updated successfully', updatedRecipe });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

router.get('/favorites', authenticateToken,
    async (req, res) => {
        const userId = req.user._id
        const user = await User.findById(userId)
            .populate({
                path: 'favorites',
                populate: {
                    path: "author",
                    select: "username _id"
                }
            })

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(201).json({ favorites: user.favorites })

    })

router.get('/:recipeId', authenticateToken,
    async (req, res) => {
        const { recipeId } = req.params

        const recipeDB = await Recipe.findOne({ _id: recipeId })
            .populate('category')
            .populate({
                path: 'author',
                select: 'username _id'
            })
            .populate({
                path: 'comments',
                options: { sort: { createdAt: -1 } },
                populate: { path: 'user', select: 'username _id' }
            })
        if (recipeDB) {
            res.status(200).json(recipeDB)
        } else {
            res.status(404)
        }

    })

router.get('/category/:categoryId',
    async (req, res) => {
        try {
            const { categoryId } = req.params
            const { cookingTime, difficulty, servingSize } = req.query;

            const filter = { category: categoryId };
            if (cookingTime) filter.cookingTime =  cookingTime ;
            if (difficulty) filter.difficultyLevel = difficulty;
            if (servingSize) filter.servingSize =  servingSize ;


            console.log(filter)
            const recipes = await Recipe.find(filter)
                .populate({
                    path: 'author',
                    select: 'username _id'
                })
            console.log(recipes)
            if (!recipes) {
                res.status(405).json('No Recipe Found In this category')
            } else {
                res.status(200).json(recipes)
            }
        } catch (err) {
            res.status(404).json(err)
        }
    }
)

router.get('/user/:userId', authenticateToken,
    async (req, res) => {
        try {
            const { userId } = req.params
            const user = await User.findById(userId)
            console.log(user)
            if (!user) {
                res.status(403).json({ message: "User No Found" })
            } else {
                const recipes = await Recipe.find({ author: userId }).populate('category')
                res.status(200).json(recipes)
            }
        } catch (err) {
            res.status(500).json({ err })
        }
    })


module.exports = router