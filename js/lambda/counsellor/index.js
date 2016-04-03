console.log('Starting to Counsel');

var doc = require('dynamodb-doc');
var http = require('http');
var cheerio = require('cheerio');
var request = require('request');
var parse = require('./ts/Parse');


var dynamo = new doc.DynamoDB();

exports.handler = function (event, context) {
    console.log('event:', JSON.stringify(event));
    console.log('context:', JSON.stringify(context));

    var rootObject = new parse.Parse().parse(event);

    request('http://www.google.com', function (error, response, html) {
        if (!error && response.statusCode == 200) {

            var $ = cheerio.load(html);
            console.log('Parsed:' + rootObject.Records[0]);
            console.log('Title:' + $('title'));
            console.log('Description:' + $('meta[name=description]').attr("content"));
        }
    });

    console.log("Invoked");

};
