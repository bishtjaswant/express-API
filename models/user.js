const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema; 

const  userSchema = new Schema({
       firstName: String,
       lastName: String,
       email: String,
       mobile: Number,
       cars:  [{
               type: mongoose.ObjectId,
               ref: 'car'
       }]
});

module.exports = mongoose.model('user', userSchema); 