// give it to node.js :)


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/users");
const tweets = require("./routes/tweets");







mongoose
    .connect(db,{useNewUrlParser: true})
    .then(()=> console.log("Connected to MongoDB"))
    .catch(err=> console.log(err));



app.get("/",(request,res) => {
    // console.log(res);
    //debugger
res.send("Hello App/acc");
});


//use the routes made in the users and tweets file 

app.use("/api/users", users);
app.use("/api/tweets", tweets);




const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`listening on port  ${port}`)

});


//at this point node.js is too dumb to know about any new changes so we use nodedemon to
// retransplie changes like webpack does or atleast tries to do .


