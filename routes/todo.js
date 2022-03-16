const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
router.use(methodOverride('_method'));
const todoCtrl = require('../controllers/todo');

router.get('/', todoCtrl.index);
router.get('/todo', todoCtrl.todoget);
router.post('/todo', todoCtrl.todopost);
router.get('/todo/edit', todoCtrl.edit);
router.get('/todo/:id', todoCtrl.show);
// router.get('/todo/delete'. todoCtrl.delete_todo);

module.exports = router;