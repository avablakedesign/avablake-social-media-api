const { Router } = require('express');
const {Thought, User} = require('../../models');
const router = Router();

//This gets all the thoughts in the thoughts collecion.
router.get('/', async (req, res) => {
    try {
    const thoughts = await Thought.find({});
    res.json(thoughts);
    } catch(err) {
        console.log(err)
        res.json({err: "error getting thoughts"});
    }
})

//This creates a new thought in the thoughts collection.
router.post('/', async (req, res) => {
    try {
    const mongoThought = await Thought.create({thoughtText: req.body.thoughtText, username: req.body.username});
    await User.findByIdAndUpdate(req.body.userId, {$push:{thoughts:mongoThought._id}});
    res.json(mongoThought);
    } catch(err) {
        console.log(err)
        res.json({err: "error creating thought"});
    }
});

//This gets the thought by the specified id.
router.get('/:id', async (req, res) => {
    try { 
    const thought = await Thought.findById(req.params.id)
    res.json(thought);
    } catch(err) {
        console.log(err)
        res.json({err: "error finding thought by id"});
    }
});

//This updates the thought by specified id.
router.put('/:id', async (req, res) => {
    try {
        const updateData = req.body
        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, updateData, {new:true});
        res.json(updatedThought);
        } catch(err) {
        console.log(err)
        res.json({err: "error updating thought by id"})
    }
});

// This deletes a thought by the specified id.
router.delete('/:id', async (req, res) => {
    try {
        await Thought.findByIdAndDelete(req.params.id);
        res.json({message:`deleted thought with id ${req.params.id}`});
    } catch (err) {
        console.log(err)
        res.json({err: "error deleting thought by id"})
    }
});

// This creates a new reaction and adds it to the specified thought.
router.post('/:thoughtId/reactions', async (req,res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, {$push:{reactions:req.body}},{new:true});
        res.json(updatedThought)
    } catch (err){
        console.log(err)
        res.json({err: "error creating a reaction"})
    }
})

//This deletes a reaction based on the specified thought.
router.delete('/:thoughtId/reactions', async (req,res) => {
    try {
        const reactionId = req.body.reactionId
        await Thought.findByIdAndUpdate(req.params.id, {$pull:{reactions:{reactionId}}});
        res.json({message:"deleted reaction"});
    }
    catch (err){
        console.log(err)
        res.json({err: "error deleting a reaction"})
    }
})
module.exports = router;