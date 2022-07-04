//xpress routing for users 





const express = require("express");
const router = express.Router();
//^^ get router object


const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../config/keys');
const jwt = require("jsonwebtoken");



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
			

			//bcryptjs comes in here where we encrypt the password with blo:wfish algo
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


// route users to login with their credentials
router.post('/login', (request,response) => {
			
			const email = request.body.email;
	const password = request.body.password;

	// use bycrpt and password to look up said user for the inputted credentials
	// this one will check for the email findOne is self explanatory
	User.findOne({email}).then(user => {
		if(!user){
				// if user email not found return json error response
				return response.status(404).json({email : "This user does not exist"});

		}
		
					// user email must then exists using bcrypt to verifiy password
					
			bcrypt.compare(password, user.password)
			.then(isMatch => {
				if(isMatch){
					//return response.json({msg: "Login Successful!"});
					//create and send jwt to user 
					const payload = {
						id: user.id,
						handle: user.handle,
						email: user.email
					}
					jwt.sign(payload,keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
						response.json({success: true, token: "Bearer "+ token});
					})

				}
				else{
					return response.status(400).json({password:"is incorrect"});
				}

			})
	})


});






module.exports = router;


