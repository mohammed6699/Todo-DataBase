const express = require('express');
const todoControllers = require('../contollers/contollers')
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const UserRole = require('../utils/UserRole')
const allowedTo = require('../middleware/AllowedTo')
router.route('/')
        .get(todoControllers.getTodos)
        .post(verifyToken, todoControllers.addTodo)
router.route('/:todoId')
        .patch(todoControllers.updateTodo)
        .delete(verifyToken, allowedTo(UserRole.ADMIN),todoControllers.deleteTodo)

module.exports = router;