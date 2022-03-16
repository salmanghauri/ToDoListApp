const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: String,
    textField: String,
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},{
    timestamps: true
})
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;