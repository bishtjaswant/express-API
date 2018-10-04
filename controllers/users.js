const userModel = require("../models/user");
const carModel = require('../models/cars');



module.exports = {
  
  
  // route index
 index: async (req, res, next)=>{
 
     const fetched = await userModel.find({});
    //  throw new Error('dummy error')
       res.status(200).json(fetched);
   
    
 },

// post route uusing promise
  newUserData: async (req, res, next) => {
  // async/await
    
      const userData = new userModel(req.value.body);
      const saved =  await userData.save();
      res.status(201).json(saved);
     
  },



  getUser: async (req, res, next)=>{
 
    const {userId} =  req.value.params;
    const user = await userModel.findById(userId);    
    res.status(200).json(user);


  },

  
  
  replaceUser: async (req, res, next) => { 
    const {userId} =  req.value.params;   
    await userModel.findByIdAndUpdate(userId, req.value.body );
    res.status(200).json({success:true});
  },


  updateUser: async (req, res, next) => {
    const {userId} =  req.value.params;   
    await  userModel.findByIdAndUpdate(userId, req.value.body );
    res.status(200).json({success: true});

  },

  deleteUser: async (req, res, next)=>{
    const {userId} =  req.value.params;   
    await  userModel.findByIdAndRemove(userId);
    res.status(200).json({status:true})
  },




  /* add cars
  // http://localhost:3000/users/5bb4c6816b50a21e31aa560f/cars
  */
  getUserCar: async (req, res, next)=>{
     const {userId} = req.value.params; // get the id from params
     const user = await userModel.findById(userId).populate('cars'); // get the user via id
     console.log(`user's cars`, user);
      res.status(200).json(user.cars);    
  },

/**
 * url
 * http://localhost:3000/users/5bb2f19d05e77c1264cc9c1d/cars
 * 
 */
  newUserCar: async (req, res, next)=>{
         const newCar = await new carModel( req.value.body );

        //  get the user
         const user = await userModel.findById(req.params.userId);
 
        // assign a user a car seller
        newCar.seller = user;
        
        // save the  car with user id
        await newCar.save();

        // add the car to seller aray
        user.cars.push(newCar);

        // save the user with cars
        await user.save();

        res.status(201).json(newCar);
  }






};
