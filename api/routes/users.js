const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

// UPDATE USER
router.put('/:id', async (req, res) => {
    
    // CHECK IF USER IS A VALID USER OR IS AN ADMIN OF THE ACCOUNT
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body
            });
            res.status(200).json('Account has been updated');
        } catch (error) {
            return res.status(500).json(err);
        }

    } else {
        return res.status(403).json('You can only update your account');
    }
});

// DELETE USER
router.delete('/:id', async (req, res) => {
    
    // CHECK IF USER IS A VALID USER OR IS AN ADMIN OF THE ACCOUNT
    if(req.body.userId === req.params.id || req.body.isAdmin){
        
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Account has been deleted');
        } catch (err) {
            return res.status(500).json(err);
        }

    } else {
        return res.status(403).json('You can delete only your account');
    }
});

// GET A USER
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId 
        ? await User.findById(userId) 
        : await User.findOne({ username: username });
        // ONLY RETURN CERTAIN INFORMATION
        const {password, updatedAt, ...other} = user._doc
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET FRIENDS
router.get('/friends/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId)
            })
        )

        let friendList = [];
        friends.map(friend => {
            const { _id, username, profilePicture} = friend;
            friendList.push({ _id, username, profilePicture})
        });
        res.status(200).json(friendList);
    } catch (err) {
        res.status(500).json(err);
    }
})

// FOLLOW A USER
router.put('/:id/follow', async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: { followers : req.body.userId } });
                await currentUser.updateOne({$push: { followings : req.params.id } });
                res.status(200).json('user has been followed');
            } else {
                res.status(403).json('you are already following this user');
            }


        } catch (err) {
            res.status(500).json(err);
        }

    }else {
        res.status(403).json('you cant follow yourself');
    }
});

// UNFOLLOW A USER
router.put('/:id/unfollow', async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: { followers : req.body.userId } });
                await currentUser.updateOne({$pull: { followings : req.params.id } });
                res.status(200).json('user has been unfollowed');
            } else {
                res.status(403).json('you dont follow this user');
            }


        } catch (err) {
            res.status(500).json(err);
        }

    }else {
        res.status(403).json('you cant unfollow yourself');
    }
});




module.exports = router;