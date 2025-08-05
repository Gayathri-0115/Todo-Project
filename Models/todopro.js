const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    Task : String
})

const todoModel = mongoose.model('Todo', todoSchema);

module.exports = todoModel;