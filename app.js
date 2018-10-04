// all required modules;
const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const helmet = require('helmet')
// all routes
const users = require('./routes/users');
const cars = require('./routes/car');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/apiProject', {useNewUrlParser:true})
.then(function (db) {
               console.log('mongo connected');
  })
.catch(function (err) {
       if(err){
                 console.log('connectiion failed due to '+err);
       }
});


// instanciates of express
const app = express();

// middleware
app.use(helmet())
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// routes
app.use('/users', users);
app.use('/cars', cars);


// catch error and forward to error handler
app.use((req, res, next)=>{
       const error = new Error('Page not found Or currently available');
       error.status=404;
       next(error);
});

// handle the error
app.use((err, req, res, next)=>{
// error response to client
// check dev or prod
const error = app.get('env') === 'development' ? err : {}
const status = err.status || 500;

res.status(status).json({
               error: {
                    message: error.message                
               }
});
// error to developer
console.error(err);
});


// server liistening........
const port = app.get('port') || 3000;
app.listen(port,()=>{console.log(`server listening on ${port}`);});