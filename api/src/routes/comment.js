const { Router } = require('express')
const Comment = require('../database/modules/Comment');
const Recipe = require('../database/modules/Recipe');
const authenticateToken = require('../strategies/jwt')

const router = Router()

// router.use((req, res, next) => {
//     if (req.user) next();
//     else {
//         res.send(401)
//     }
// })

router.get('/', authenticateToken,
    async (req, res) => {
        try {
            const comments = await Comment.find();
            res.status(200).json(comments)
        } catch (err) {
            res.status(404).json(err)
        }
    })

router.post('/create', authenticateToken,
    async (req, res) => {
        try {
            const { recipeId, text } = req.body;

            const recipe = await Recipe.findById(recipeId);

            if (!recipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }

            const newComment = new Comment({
                user: req.user._id,
                text,
                recipe: recipeId
            })

            await newComment.save()

            recipe.comments.push(newComment._id);
            await recipe.save();


            res.status(201).json({ message: 'Comment added successfully', recipe: newComment });

        } catch (err) {
            res.status(404).json(err)
        }
    })


router.get('/:commentId', authenticateToken,
    async (req, res) => {
        const { commentId } = req.params

        const commetnDB = await Comment.findOne({ _id: commentId })
        if (commetnDB) {
            res.status(200).json(commetnDB)
        } else {
            res.status(404)
        }
    })



module.exports = router
