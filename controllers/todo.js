const User = require('../models/User');
const Todo = require('../models/ToDo');
const moment = require('moment');
let loggedInUser = null
let todos = []
async function todoget(req,res) {
    res.render('todo/add')
}
//user = req.user 
//post method todo.save to save the object, todo.save(req.body)
async function todopost (req,res) {
    let user = req.user;
    req.body.user = user._id;
    await Todo.create(req.body);
    res.redirect('/');
}
async function index (req,res) {
    if (req.user) {
     loggedInUser = req.user 
     todos = await Todo.find({user: loggedInUser._id});
    }
    res.render('index', {todos});
}
async function show (req,res) {
    let todo = await Todo.findById(req.params.id);
    res.render('todo/show', {todo});
}
async function edit (req,res) {
    let todo = await Todo.findById(req.query.id);
    res.render('todo/edit', {todo})
}
async function updateToDo (req,res) {
    console.log(req.body._id);
   await Todo.findByIdAndUpdate(req.body._id, req.body);
   res.redirect('/');
}
async function delete_todo (req,res) {
    await Todo.findByIdAndDelete(req.body._id);
    res.redirect('/');
}
module.exports = {todoget, todopost, index, show, edit, updateToDo, delete_todo};