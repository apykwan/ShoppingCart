const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { 
    createUser, 
    updateUser, 
    loginUser, 
    logoutUser, 
    logoutAll,
    getUserProfile,
    deleteUser 
} = require('../controllers/user');


router.post('/users', createUser);
router.get('/users/me', auth, getUserProfile);
router.patch('/users/:id', updateUser);
router.post('/users/logout', auth, logoutUser);
router.post('/users/logoutall', auth, logoutAll);
router.post('/users/login', loginUser);
router.delete('/users/:id', deleteUser);

module.exports = router;