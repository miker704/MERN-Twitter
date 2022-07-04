// give it to node.js :)


const express = require("express");
const app = express();



app.get("/",(request,res) => {
res.send("Hello App/acc");
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`listening on port  ${port}`)

});


//at this point node.js is too dumb to know about any new changes so we use nodedemon to
// retransplie changes like webpack does or atleast tries to do .


