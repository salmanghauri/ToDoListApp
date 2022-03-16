const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userData = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [2, "First Name must be more than 2 characters"]
    },
    lastName: {
        type: String,
        required: true,
        minlength: [2, "Last Name must be more than 2 characters"]
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "password must be longer than 6 characters"]
    }
}, { timestamps: true, })

userData.methods.verifyPassword = function(password){
return bcrypt.compareSync(password, this.password);
};
const User = mongoose.model("User", userData);

module.exports = User;