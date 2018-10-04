// const express = require('express');
const usersControlller = require('../controllers/users');
// const router = express.Router();
const router = require('express-promise-router')();
// schema router
const { validateParams, schema, validateBody } = require('../helper/routehelper');

// get all data;
router.route('/')
     .get( usersControlller.index)
     
     .post(validateBody(schema.userShema),  usersControlller.newUserData);
 

// specific routes
router.route('/:userId')
      .get(validateParams(schema.IDSchema ,'userId'), usersControlller.getUser)
     
      .put( [validateParams(schema.IDSchema, 'userId' ), validateBody(schema.userShema)] ,  
                usersControlller.replaceUser) // send all field
 
      .patch([ validateParams(schema.IDSchema, 'userId'), validateBody(schema.userOptionalShema) ],
            usersControlller.updateUser) // send specific field
 
      .delete([validateParams(schema.IDSchema, 'userId')] , usersControlller.deleteUser);




/*
 *get user with car
 http://localhost:3000/users/5bb444b5688e4b12e5f4c7da/cars
*/
router.route('/:userId/cars')

      .get([validateParams(schema.IDSchema, 'userId')] ,usersControlller.getUserCar)

      .post( [ validateParams(schema.IDSchema, 'userId'), validateBody(schema.userCarShema ) ]
             ,  usersControlller.newUserCar);


module.exports = router;
