const todo = require('../models/todo.modell');
const HTTPSTATUS = require('../utils/httpstatus')

const getTodos = async (req, res) => {
        // pagination for users 
    const query = req.query;
    const limit = + query.limit;
    const page =  + query.page;
    const skip = (page - 1) * limit;

    const allTodos = await todo.find().limit(limit).skip(skip)
    res.json({status: HTTPSTATUS.SUCCESS, data: {allTodos}})
};
const addTodo = async (req, res) => {
    const newTodo = new todo(req.body)
    await newTodo.save()
    res.json({status: HTTPSTATUS.SUCCESS, data: {newTodo}})
};
const updateTodo = async (req, res) => {
try {
    const updateTodo = await todo.findByIdAndUpdate(req.params.todoId, {$set: {...req.body}})
    res.json({status: HTTPSTATUS.SUCCESS, data: {updateTodo}})
} catch (error) {
    return res.status(400).json({status: HTTPSTATUS.ERROR, data: null,meesage: error.message})
}};

const deleteTodo = async (req, res) => {
    const deleteTodo = await todo.deleteOne({_id: req.params.todoId})
    res.status(201).json({status: HTTPSTATUS.SUCCESS, data: null })

};

module.exports = {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo
}