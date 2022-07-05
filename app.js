// give it to node.js :)


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const User = require("./models/User");
const bodyParser = require('body-parser');
const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);



mongoose
    .connect(db,{useNewUrlParser: true})
    .then(()=> console.log("Connected to MongoDB"))
    .catch(err=> console.log(err));

//make our app respond to json requests only !
app.use(bodyParser.urlencoded({
	extended:false
}));

app.use(bodyParser.json());

// no longer need this as it is an example
/*
 app.get("/",(request,res) => {
    // console.log(res);
    //debugger
res.send("Hello App/acc");
});
*/

app.get("/", (request,response) =>{
	const user = new User(
		{
			handle: "jim",
			email: "jim@jim.jim",
			password: "jimisgreat123"
		}
	)
	user.save();
	response.send("user successfully created");
})




//use the routes made in the users and tweets file 

app.use("/api/users", users);
app.use("/api/tweets", tweets);




const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`listening on port  ${port}`)

});


//at this point node.js is too dumb to know about any new changes so we use nodedemon to
// retransplie changes like webpack does or atleast tries to do .


