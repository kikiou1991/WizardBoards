// routes.js
const express = require('express');
const router = express.Router();
const {Signup, Login} = require('../controllers/authcontroller');
const {userVerification} = require('../middlewares/authmiddleware');
const {CreateWorkspace, GetUserWorkspace} = require('../controllers/createworkspace.js');
const {GetUserById, GetAllUsers, GetAuthenticatedUser} = require('../controllers/usercontrollers.js');

router.post('/api/signup', Signup);
router.post('/api/login', Login);
router.post('/api/', userVerification);
router.post('/api/auth/validate', userVerification);

// Workspace routes
router.get('/api/workspaces', userVerification, GetUserWorkspace);
router.post('/api/workspaces', userVerification, CreateWorkspace);

//Get user by ID/all users
router.get('/api/users/me', userVerification, GetAuthenticatedUser);
router.get('/api/users/', userVerification, GetAllUsers);

module.exports = router;
