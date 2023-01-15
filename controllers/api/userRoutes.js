const { Router, json } = require('express');
const {User, Thought} = require('../../models');
const router = Router();

router.get('/', async (req, res) => {
    try {
    const users = await User.find({});
    res.json(users);
    } catch(err) {
        console.log(err)
        res.json({err: "error getting users"});
    }
})

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
//   .populate(['friends', 'thoughts']);
router.get('/:id', async (req, res) => {
    try { 
    const user = await User.findById(req.params.id)
    res.json(user)
    } catch(err) {
        console.log(err)
        res.json({err: "error finding user by id"});
    }
});

module.exports = router;
