const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =require("https");
const app = express();
const apikey = "11f1253f196f7c1107c0e63ad988cf71-us14";
var audenceId = "c8c0fe6964";
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");

});

app.post("/", function(req, res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data = {
    member:{
      email_address:email,
      status: "subscribed",
      merge_fields :{
        FNAME:firstName,
        LNAME:lastName
      }
    }
  }

var jsonData = JSON.stringify(data);
const url =  "https://us14.api.mailchimp.com/3.0/lists/"+audenceId;
const options = {
  method:"POST",
  auth:"shailesh:11f1253f196f7c1107c0e63ad988cf71-us14"
}
const requestdata =https.request(url, options, function(response){
  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})
requestdata.write(jsonData);
requestdata.end();

});

app.listen(process.env.PORT || 3000, function(){
    console.log("The server is running at port 3000");
});