const User = require('../models/User');
const Todo = require('../models/ToDo');
const moment = require('moment');

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
    let todos = await Todo.find({user: req.user.id});
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
// async function delete_todo (req,res) {
//     await Todo.findByIdAndDelete(req.query.id)
//     res.redirect('/');
// }
// function edit (req,res) {
//     Todo.findById(req.query.id)
//     .then((todo) => {
//         res.render("todo/edit", {todo})
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }
module.exports = {todoget, todopost, index, show, edit};