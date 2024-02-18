// routes.js
const express = require('express');
const router = express.Router();
const {Signup, Login, verifyToken} = require('../controllers/authcontroller');
const {userVerification} = require('../middlewares/authmiddleware');
const {CreateWorkspace, GetUserWorkspace, GetWorkspace} = require('../controllers/createworkspace.js');
const {GetUserById, GetAllUsers, GetAuthenticatedUser} = require('../controllers/usercontrollers.js');
const {CreateBoard, GetBoards, DeleteBoard, UpdateBoard} = require('../controllers/createboard.js');
const {CreateList, GetLists} = require('../controllers/createlist.js');
const {CreateCard, GetCards, DeleteCard} = require('../controllers/createcard.js');

router.post('/api2/signup', Signup);
router.post('/api2/login', Login);
router.post('/api2/', userVerification);
router.get('/api2/auth/validate', verifyToken);

// Workspace routes
router.get('/api2/workspaces', userVerification, GetUserWorkspace);
router.get('/api2/workspaces/:workspaceID', userVerification, GetWorkspace);
router.post('/api2/workspaces', userVerification, CreateWorkspace);

// Get user by ID/all users
router.get('/api2/users/me', userVerification, GetAuthenticatedUser);
router.get('/api2/users/', userVerification, GetAllUsers);

// Board routes
router.post('/api2/boards', userVerification, CreateBoard);
router.get('/api2/boards/', userVerification, GetBoards);
router.delete('/api2/boards/delete/', userVerification, DeleteBoard);
router.patch('/api2/boards/update/', userVerification, UpdateBoard);

// List routes
router.post('/api2/lists', userVerification, CreateList);
router.get('/api2/lists/', userVerification, GetLists);

// Card routes
router.post('/api2/cards', userVerification, CreateCard);
router.get('/api2/cards/', userVerification, GetCards);
router.delete('/api2/cards/delete/', userVerification, DeleteCard);

module.exports = router;
