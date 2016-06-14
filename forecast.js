var https = require('https');

// var API_KEY = "your key here";

function printForecast(summary,temperature){
    console.log("The forecast summary : " + summary + "\nTemperature : "+ temperature + "");
}

function printError(error){
    console.log(error.message);
}

// var latitude = 37.8267;
// var longitude = -122.423;

function get(latitude, longitude){

    var req = https.get("https://api.forecast.io/forecast/API_KEY/"+ latitude +","+ longitude +"", function(res){

        if(res.statusCode == 200){
            var body = "";
            res.on("data", function(chunk){
                body +=chunk;

            });
            res.on("end", function(){
                try{
                    var fc = JSON.parse(body);
                    printForecast(fc.currently.summary, fc.currently.temperature);
                }catch(e){
                    printError(e);
                }
            });

        }
    });
}
module.exports.get = get;


zipcode.js

var forecast = require('./forecast.js');

var http = require('http');


function printError(error){
    console.log(error.message);
}

// var zipcode = "85719";

function get(zipcode){

    var req = http.get("http://api.zippopotam.us/us/"+ zipcode +"", function(response){

        if(response.statusCode == 200){
            var body = "";
            response.on("data", function(chunk){
                body +=chunk;

            });
            response.on("end", function(){
                try{
                    var geo = JSON.parse(body);
                    forecast.get(geo.places[0].latitude, geo.places[0].longitude);
                }catch(e){
                    printError(e);
                }
            });
        }
    }); 
 } 

 module.exports.get = get;