if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express= require('express');
const bodyParser= require('body-parser');
const request= require("request");
const https= require("https");
const axios = require('axios');
const { error } = require('console');
const key2= process.env.KEY2
const app= express();
const config={
headers:{
Code:key2
}
}

const url='https://forms.maakeetoo.com/formapi/945';


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
  res.sendFile(__dirname +"/index.html")
 axios.get(url, config).then(
console.log('successful')).catch(err=>console.log(err));
});

axios.post(url, config, (req,res)=>{
const data={
firstname:req.body.firstname,
email: req.body.email,
message: req.body.message,
}
}).then(res=> console.log(res)).catch(err=> console.log(err));

//})



app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running!")
  });










