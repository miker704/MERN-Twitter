//xpress routing for users 


const express = require("express");
const router = express.Router();
//^^ get router object


router.get("/test",(request,response) => {
        response.json({msg:"This is the users Route being called"});
});


module.exports = router;


