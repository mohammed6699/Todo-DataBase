const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
app.use(cors());
app.use(express.json());
const todoRouter = require('./routes/routes');
const userRouter = require('./routes/userRoutes')
const port = process.env.PORT;
const url = process.env.MONGO_TODO_URL
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect(url).then(() => {
    console.log("DataBase connected")
})
// todo
app.use('/api/todos', todoRouter)
// users(register, login, getall)
app.use('/api/users', userRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.listen(port,() => {
    console.log(`server is listing on port ${port}`)
})
//LEj7t0MBbSy6buZk