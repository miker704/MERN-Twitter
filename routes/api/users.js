//xpress routing for users 





const express = require("express");
const router = express.Router();
//^^ get router object


const bcrypt = require('bcryptjs');
const User = require('../../models/User');




router.get("/test",(request,response) => {
        response.json({msg:"This is the users Route being called"});
});


router.post('/register', (request,response) => {
			
	//conditon to validate unique emails only flag error if email is already registered;
	User.findOne({email: request.body.email}).then( user => {

		if(user){
			//throw a status : 400 error if the email address already exists
			return request.status(400).json({email: "A User has already registered with this email address"});
		}
		else{
			//other wise proceed to register the email 
			
			const newUser = new User({
				handle: request.body.handle,
				email: request.body.email,
				password: request.body.password

			})
			

			//bcryptjs comes in here where we encrypt the password with blowfish algo
			bcrypt.genSalt(10,(err,salt) =>{

				bcrypt.hash(newUser.password, salt,(err,hash)=>{

					if(err){
						throw err;
					}

					newUser.password=hash;
					newUser.save()
						.then(user => response.json(user))
						.catch(err =>console.log(err));

				})

			})

		}
		

	})

});



module.exports = router;


