const router = require('express-promise-router')()
const carController = require('../controllers/car');

const { validateBody, schema, validateParams } = require('../helper/routehelper');



/*
 routes of cars
 * http://localhost:3000/cars/

*/
router.route('/')
   .get(carController.getCars)
   .post([validateBody(schema.addNewByUserCarShema)], carController.newCar);



router.route('/:carId')  
   .get([validateParams(schema.IDSchema, 'carId') ],carController.getCar)

   /**http://localhost:3000/cars/5bb5964f112ba01309beb4fe */
   .put([validateParams(schema.IDSchema, 'carId'), validateBody(schema.updateExistingUserCarShema) ], carController.replaceCar)


   .patch([ validateParams(schema.IDSchema, 'carId'), validateBody(schema.patchUpdateExistingUserCarShema ) ],carController.updateCar)

   .delete([validateParams(schema.IDSchema, 'carId') ], carController.deleteCar);










   module.exports = router;