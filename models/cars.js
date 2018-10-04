const mongoose =  require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const carSchema= new Schema({
   make: String,
   year: Number,
   model: String,
   seller: [{
     type: Schema.ObjectId,
     ref: 'user'
   }]
});

module.exports = mongoose.model('car', carSchema);
 