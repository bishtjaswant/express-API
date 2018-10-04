const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const carModel = require('../models/cars');
const userModel = require('../models/user');



/**
 * url
 * http://localhost:3000/cars/
 */

 module.exports = {


      getCars: async (req, res, next) => {
           const cars = await carModel.find({});
           res.status(200).json(cars);


      },

      
     
      newCar: async (req, res, next) => {
            const sellerId = req.value.body.seller;
       // logged in seller
      
       const seller = await userModel.findById(sellerId);

       const newCar =  await new carModel(req.value.body);
        
       // ad created new car to seller car
       newCar.seller = seller;

       await newCar.save(); // saved new created car
      
      
       // now sold car must be added seller array
       await seller.cars.push(newCar); 

       // finally saved the users with card id
       await seller.save();      
       
       
       return res.status(201).json(newCar);
       
      },
     

      /**
       * url
       * http://localhost:3000/cars/userId
       */

      getCar: async (req, res, next) => {
             const car = await carModel.findById(req.value.params.carId);
             res.status(200).json(car);

      },


/**http://localhost:3000/cars/5bb5964f112ba01309beb4fe */
      replaceCar: async (req, res, next) => {
 
            const {carId} = req.value.params;
            const car = await carModel.findByIdAndUpdate(carId, req.value.body);
            
            res.status(201).json({status:true, message:"record updated (PUT)"})

      },
     
      updateCar: async (req, res, next) => {

            const {carId} = req.value.params;
            const car = await carModel.findByIdAndUpdate(carId, req.value.body);
            res.status(201).json({status:true, message:"record updated (PATCH)"})

      },
      
      deleteCar: async (req, res, next) => {
 
            const {carId} = req.value.params;
            const car = await carModel.findById(carId);                   
            
            if (!car) {
                  return  res.status(200).json({status:true, message: 'perhaps this car has been sold out'});
            }

      //      seller
      const seller = await  userModel.findById(car.seller);

      const deleteCar = await carModel.findByIdAndRemove(carId);

      // also delete the car from seller array
      await seller.cars.pull(deleteCar);

      // save the user with deleted car

      await seller.save();

      res.status(200).json({status:true, message: 'you have done'});
               

            
      },





 };