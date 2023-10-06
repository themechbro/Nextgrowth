if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express= require('express');
const bodyParser= require('body-parser');
const request= require("request");
const https= require("https");
const axios = require('axios');
const { error } = require('console');
const key=process.env.KEY;
const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname +"/index.html")
});
app.post('/', async (req, res)=>{
const firstname=req.body.firstname;
const email= req.body.email;
const message=req.body.comment;
const data={
email_address:email,
status: 'subscribed',
merge_fields:{
FNAME:firstname,
TEXT:message
}

}

const jsonData= JSON.stringify(data);
const url= "https://us17.api.mailchimp.com/3.0/lists/eb6352089b/members";
const option= {
  method: "POST",
  auth: key
};
const request= https.request(url, option, function(response){
if  (response.statusCode==200){
  res.sendFile(__dirname+"/success.html");
}
else{
  res.sendFile(__dirname+"/failure.html");
}
response.on("data", function(data){
  console.log(JSON.parse(data));
})
});
request.write(jsonData);
request.end();
})
app.post("/failure", function(req, res){
  res.redirect("/");
});

  app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running!")
  });



//app.get("/", function(req, res){
 // res.sendFile(__dirname +"/index.html")
//});

//app.post('/',  (req, res) => {
//const name= req.body.firstname;
//const email= req.body.email;
//const message= req.body.comment;
//const data={
//firstname:name,
//email: email,
//message : message
//};

//const jsonData= JSON.stringify(data);

//const request= https.request(url, CODE, function(response){
//if(response.statusCode==200){
//res.redirect('/');
//}
//else{
//res.render(error);
//}
//response.on("data", function(data){
  //console.log(JSON.parse(data));
//});
//request.write(jsonData);
//request.end();
//});
//});









