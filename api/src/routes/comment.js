const { Router } = require('express')
const Comment = require('../database/modules/Comment');
const Recipe = require('../database/modules/Recipe');
const { jwtCheck } = require('../strategies/auth0');
const User = require('../database/modules/User');

const router = Router()

// router.use((req, res, next) => {
//     if (req.user) next();
//     else {
//         res.send(401)
//     }
// })

router.get('/', jwtCheck,
    async (req, res) => {
        try {
            const comments = await Comment.find();
            res.status(200).json(comments)
        } catch (err) {
            res.status(404).json(err)
        }
    })

router.post('/create', jwtCheck,
    async (req, res) => {
        try {
            const { recipeId, text } = req.body;

            const recipe = await Recipe.findById(recipeId);

            if (!recipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }

            const userId = User.findOne({googleId : req.auth.payload.sub})._id
            const newComment = new Comment({
                user: userId,
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


router.get('/:commentId', jwtCheck,
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
