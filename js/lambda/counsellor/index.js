console.log('Starting to Counsel');

var doc = require('dynamodb-doc');
var http = require('http');
var cheerio = require('cheerio');
var run = require('./run.js');


var dynamo = new doc.DynamoDB();

exports.handler = function (event, context) {
    console.log('event:', JSON.stringify(event));
    console.log('context:', JSON.stringify(context));


    console.log("Invoking");
    new run.Run().handle(event);
    console.log("Invoked");


    //
    // var options = {
    //     host: 'www.google.com',
    //     port: 80,
    //     path: '/index.html'
    // };
    //
    // http.get(options, function (res) {
    //     console.log("Got response: " + res.statusCode);
    //     var data = "";
    //
    //     res.on("data", function (chunk) {
    //         data += chunk;
    //     });
    //
    //     res.on("end", function () {
    //         console.log(data);
    //
    //         var load = cheerio.load(data);
    //     });
    //
    // }).on('error', function (e) {
    //     console.log("Got error: " + e.message);
    // });
    //

};
