const express = require('express')
const app = express()
const mongoose = require('mongoose');
const todoModel = require('./Models/todopro.js');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGOURL+'taskmanager');

app.use(cors());
app.use(express.json());

app.post('/add', (req, res) => {
    const newTask = req.body.NameofTheTask;
    todoModel.create({Task : newTask})
    res.send('Done'); 
})

app.get('/get', (req,res)=>{
    todoModel.find({}).then((e)=>{res.json(e)})
})

app.delete('/del/:id', (req,res)=>{
    const {id} = req.params;
    todoModel.findOneAndDelete({_id: id}).then(result=>res.send(result))
})

app.listen(port, () => {
    console.log(`Example App listening on port ${port}`);
})