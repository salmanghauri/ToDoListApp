const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
router.use(methodOverride('_method'));
const todoCtrl = require('../controllers/todo');
const isLoggedIn = require('../helper/isLoggedin');

router.get('/', todoCtrl.index);
router.get('/todo', isLoggedIn, todoCtrl.todoget);
router.post('/todo', isLoggedIn, todoCtrl.todopost);
router.get('/todo/edit', isLoggedIn,todoCtrl.edit);
router.put('/todo/update', isLoggedIn, todoCtrl.updateToDo);
router.delete('/todo/delete', isLoggedIn, todoCtrl.delete_todo);
router.get('/todo/:id', isLoggedIn, todoCtrl.show);

module.exports = router;