const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require('https');


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});
   
app.post("/", function(req, res){

    
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/lists/a3ca5a6a50";

    const options = {
        method: "post",
        auth: "julia1:0eb177a4c3851ba1829312c16d6ad2ed-us7"
    }

    const request = https.request(url, options, function(response) { 

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/views/success.html");
        }else{
            res.sendFile(__dirname + "/views/failure.html");
        }
    });
     

     request.write(jsonData);
     request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000");
})


//0eb177a4c3851ba1829312c16d6ad2ed-us7

//a3ca5a6a50
