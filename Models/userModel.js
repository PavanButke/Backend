const mongoose = require("mongoose");
let {PASSWORD} = require('../secrets');
const validator = require('email-validator');

let dbLink = `mongodb+srv://pavanButke:XULvEaKFQjAS5A6F@cluster0.eiqtb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(dbLink).then(function(connection){
    console.log("db has been connected");


}).catch(function (error){
    console.log("error", error);

})
//mongoose -> data -> exact -> data-> 
//that is required to form an entity
// name , email , password , confirmPassword -> min , max , confirmPassword , required

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

        validate: function () {
            // third party library 
            return validator.validate(this.email)
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
    ,
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        validate: function () {
            return this.password == this.confirmPassword
        }
    },
    createdAt: {
        type: String,

    }
})
//model
let userModel = mongoose.model("UserModel", userSchema);
module.exports = userModel;