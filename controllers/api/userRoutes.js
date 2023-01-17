const { Router } = require('express');
const {User, Thought} = require('../../models');
const router = Router();
//This gets all the users in the users collection. 
router.get('/', async (req, res) => {
    try {
    const users = await User.find({}).populate('friends thoughts');
    res.json(users);
    } catch(err) {
        console.log(err)
        res.json({err: "error getting users"});
    }
})

//This creates a user.
router.post('/', async (req, res) => {
    try {
    const newUser = req.body;
    const mongoUser = await User.create(newUser);
    res.json(mongoUser);
    } catch(err) {
        console.log(err)
        res.json({err: "error creating user"});
    }
});
//This gets a user by specified id.
router.get('/:id', async (req, res) => {
    try { 
    const user = await User.findById(req.params.id).populate('friends thoughts')
    res.json(user);
    } catch(err) {
        console.log(err)
        res.json({err: "error finding user by id"});
    }
});

//This updates the user by the specified id.
router.put('/:id', async (req, res) => {
    try {
        const updateData = req.body
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {new:true}).populate('friends thoughts');
        res.json(updatedUser);
        } catch(err) {
        console.log(err)
        res.json({err: "error updating user by id"})
    }
});

//This deletes a user by a specified id.
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({message:`deleted user with id ${req.params.id}`});
    } catch (err) {
        console.log(err)
        res.json({err: "error deleting user by id"})
    }
});

//This adds another user to the specified user's list of friends.
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, {$push:{friends:req.params.friendId}}, {new:true}).populate('friends thoughts');
        res.json(user);
    } catch (err) {
        console.log(err)
        res.json({err: "error adding friend to friendlist"})
    }
});

//This removes another user from a specified user's list of friends.
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.userId, {$pull:{friends:req.params.friendId}});
        res.json({message:`${req.params.userId} unfriended ${req.params.friendId}`})
    } catch (err) {
        console.log(err)
        res.json({err: "error deleting friend from friendslist"})
    }
})
module.exports = router;
