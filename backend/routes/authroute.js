// routes.js
const express = require('express');
const router = express.Router();
const { Signup, Login } = require('../controllers/authcontroller');
const { userVerification } = require('../middlewares/authmiddleware');
const { CreateWorkspace, GetUserWorkspace } = require('../controllers/createworkspace.js');

router.post("/api/signup", Signup);
router.post("/api/login", Login);
router.post("/api/", userVerification);

// Workspace routes
router.get("/api/workspaces", userVerification, GetUserWorkspace);
router.post("/api/workspaces", userVerification, CreateWorkspace);

module.exports = router;
