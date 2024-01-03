// routes.js
const express = require('express');
const router = express.Router();
const {Signup, Login, verifyToken} = require('../controllers/authcontroller');
const {userVerification} = require('../middlewares/authmiddleware');
const {CreateWorkspace, GetUserWorkspace, GetWorkspace} = require('../controllers/createworkspace.js');
const {GetUserById, GetAllUsers, GetAuthenticatedUser} = require('../controllers/usercontrollers.js');

router.post('/api/signup', Signup);
router.post('/api/login', Login);
router.post('/api/', userVerification);
router.get('/api/auth/validate', verifyToken);

// Workspace routes
router.get('/api/workspaces', userVerification, GetUserWorkspace);
router.get('/api/workspaces/:workspaceID', userVerification, GetWorkspace);
router.post('/api/workspaces', userVerification, CreateWorkspace);

//Get user by ID/all users
router.get('/api/users/me', userVerification, GetAuthenticatedUser);
router.get('/api/users/', userVerification, GetAllUsers);

module.exports = router;
