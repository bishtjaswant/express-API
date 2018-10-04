const Joi = require('joi');

module.exports = {
// validate the params
 validateParams: (schema, name) => {
  
  return (req, res, next)=>{
    console.log('req.param', req.params);
  
    const result =   Joi.validate({param : req['params'][name] } , schema);

      if (result.error) {
       return res.status(400).json(result.error); 
      } else {
         if (!req.value) 
                  req.value = {};
         

         if (!req.value['params']) 
                  req.value['params'] = {};
         
         req.value['params'][name] = result.value.param;
         next();
      }
   }
 },

 validateBody: (schema) => {
    
  return (req, res, next) =>{
    //  console.log('req.body', req.body);
        const result = Joi.validate(req.body, schema);
       
            if (result.error) {
              return res.status(400).json(result.error);
            } else {
               if(!req.value) 
                      req.value = {};
                  
                if(!req.value['body'])
                   req.value['body'] = {}; 

                   req.value['body'] = result.value;
                   next();
            }

      }
    
 },


  schema: {
      IDSchema: Joi.object().keys({
          param : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
          }),
          
      userShema: Joi.object().keys({
        firstName: Joi.string().required().trim(),
        lastName: Joi.string().required().trim(),
        email: Joi.string().required().email().lowercase(),
        mobile: Joi.number().required(),
    
      }),

      userOptionalShema: Joi.object().keys({
        firstName: Joi.string().trim(),
        lastName: Joi.string().trim(),
        email: Joi.string().lowercase(),
        mobile: Joi.number(),
    
      }),


      userCarShema: Joi.object().keys({
        make: Joi.string().required(),
        model: Joi.string().required(),
        year: Joi.number().required(),
        
      }),


      addNewByUserCarShema: Joi.object().keys({
        make: Joi.string().required(),
        model: Joi.string().required(),
        year: Joi.number().required(),
        seller: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        
      }),

   
      updateExistingUserCarShema: Joi.object().keys({
        make: Joi.string().required(),
        model: Joi.string().required(),
        year: Joi.number().required(),        
      }),






      patchUpdateExistingUserCarShema: Joi.object().keys({
        make: Joi.string(),
        model: Joi.string(),
        year: Joi.number(),        
      }),






  
    }


 








};