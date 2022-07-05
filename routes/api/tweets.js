//xpress routing for tweets 



const express = require("express");
const router = express.Router();
//^^ get router object
const passport = require("passport");
const validateTweetInput = require('../../validation/tweets');
const Tweet = require('../../models/Tweet');
const passportJWT = require('../../config/passport')(passport)



// router.get("/test",(request,response) => {
//         response.json({msg:"This is the tweet Route being called"});
// });



router.post("/",
	passport.authenticate("jwt",{session: false}),

	(request,response) =>{
	const {errors, isValid} = validateTweetInput(request.body);
	if(!isValid){
		return response.status(400).json(errors);
	}

	//if we are at this point the tweet is validate
	const newTweet = new Tweet({
		user: request.user.id,
		text: request.body.text
		
	});

        newTweet.save().then(tweet => response.json(tweet));
});


router.get('/', (req, res) => {
        Tweet.find()
            .sort({ date: -1 })
            .then(tweets => res.json(tweets))
            .catch(err => res.status(404).json({ notweetsfound: 'No tweets found' }));
    });
    
    router.get('/user/:user_id', (req, res) => {
        Tweet.find({user: req.params.user_id})
            .then(tweets => res.json(tweets))
            .catch(err =>
                res.status(404).json({ notweetsfound: 'No tweets found from that user' }
            )
        );
    });
    
    router.get('/:id', (req, res) => {
        Tweet.findById(req.params.id)
            .then(tweet => res.json(tweet))
            .catch(err =>
                res.status(404).json({ notweetfound: 'No tweet found with that ID' })
            );
    });

module.exports = router;


