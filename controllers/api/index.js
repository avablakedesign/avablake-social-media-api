//This imports the required packages.
const { Router } = require('express');
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const router = Router()

//This defines users and thought routes.
router.use('/users', userRoutes)
router.use('/thoughts', thoughtRoutes)

module.exports = router;