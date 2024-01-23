const { Router } = require('express')
const User = require('../database/modules/User')
const { jwtCheck } = require('../strategies/auth0')
const { default: mongoose } = require('mongoose')
const router = Router()

router.get('/', jwtCheck,
    async (req, res) => {
        const userDB = await User.find()
        if (userDB) {
            res.status(200).json(userDB)
        } else {
            res.status(403)
        }
    })

router.get('/:email', jwtCheck,
    async (req, res) => {
        const { email } = req.params
        const userDB = await User.findOne({ email })
        console.log(userDB)
        if (userDB) {
            res.status(200).json(userDB)
        } else {
            res.status(403)
        }
    })

router.get('/id/:googleId', jwtCheck,
    async (req, res) => {
        try {

            const { googleId } = req.params
            console.log(googleId)
            const user = await User.findOne({ googleId })
            const userDB = await User.findById(user._id).select("username bio followers following googleId profilePicture")
            if (userDB) {
                res.status(200).json(userDB)
            } else {
                res.status(403)
            }
        } catch (err) {
            res.status(403).json({ err })
        }

    })

router.post("/user-follow/:id", jwtCheck,
    async (req, res) => {
        try {
            const userFollowId = req.params.id;
            const googleId = req.auth.payload.sub
            const user = await User.findOne({ googleId: googleId });
            console.log(user)
            const userId = user._id
            if (!mongoose.Types.ObjectId.isValid(userFollowId)) {
                return res.status(400).json({ message: 'Invalid userFollowId' });
            }

            const userFollowDB = await User.findById(userFollowId);
            if (!userFollowDB) {
                return res.status(404).json({ message: "User Not Found" });
            }

            const isFollowing = userFollowDB.followers.includes(userId);

            if (isFollowing) {
                // User is already following, unfollow
                await User.updateOne({ _id: userId }, { $pull: { following: userFollowId } });
                await User.updateOne({ _id: userFollowId }, { $pull: { followers: userId } });
            } else {
                // User is not following, follow
                await User.updateOne({ _id: userId }, { $push: { following: userFollowId } });
                await User.updateOne({ _id: userFollowId }, { $push: { followers: userId } });
            }

            const updatedUserFollowDB = await User.findById(userFollowId);
            const newFollowStatus = updatedUserFollowDB.followers.includes(userId);

            res.status(200).json({ message: "Follow status updated successfully", isFollowing: newFollowStatus });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

router.get('/is-user-following/:followingId', jwtCheck,
    async (req, res) => {
        try {
            const { followingId } = req.params;
            const followerId = await User.findOne({ googleId: req.auth.payload.sub })._id

            if (!mongoose.Types.ObjectId.isValid(followerId) || !mongoose.Types.ObjectId.isValid(followingId)) {
                throw new Error('Invalid user IDs');
            }

            const follower = await User.findById(followerId);
            if (!follower) {
                throw new Error('Follower not found');
            }

            const isFollowing = follower.following.includes(followingId);

            res.status(200).json({ isFollowing });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
router.patch('/update-user', jwtCheck,
    async (req, res) => {
        const { bio } = req.body
        const userDB = await User.findById(req.user._id)
        if (!userDB) {
            res.status(404).send("User not found")
        } else {
            const newUser = await User.updateOne({ _id: req.user._id }, { $set: { bio } })
            res.status(200).json({ newUser })
        }
    })



module.exports = router
