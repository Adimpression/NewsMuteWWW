console.log('Starting to Counsel');

var doc = require('dynamodb-doc');
var http = require('http');
var cheerio = require('cheerio');
var request = require('request');
var async = require('async');
var parse = require('./ts/Parse');

var dynamo = new doc.DynamoDB();

exports.handler = function (event, context) {
    //console.log('event:', JSON.stringify(event));
    //console.log('context:', JSON.stringify(context));

    var p = new parse.Parse();

    var rootObject = p.rootObject(event);

    var fetch = function (element, callback) {
        var record = p.record(element);

        console.log(JSON.stringify(record));

        switch (record.eventName) {
            case 'REMOVE':
                request(record.dynamodb.OldImage.ref.S, function (error, response, html) {
                    if (!error && response.statusCode == 200) {

                        var $ = cheerio.load(html);
                        console.log('Title:' + $('title'));
                        console.log('Description:' + $('meta[name=description]').attr("content"));
                        callback();
                    } else {
                        callback('HTTP Status Code:' + response.statusCode);
                    }
                });
                break;
            case "INSERT":
                request(record.dynamodb.NewImage.ref.S, function (error, response, html) {
                    if (!error && response.statusCode == 200) {

                        var $ = cheerio.load(html);
                        console.log('Title:' + $('title'));
                        console.log('Description:' + $('meta[name=description]').attr("content"));
                        callback();
                    } else {
                        callback('HTTP Status Code:' + response.statusCode);
                    }
                });
                break;
            default:
                console.log("Ignored eventName:" + record.eventName);
                callback();
        }
    };

    async.map(rootObject.Records, fetch, function (err, results) {
        console.log("Results:" + results);
        console.log("Errors:" + err);
        console.log("Invoked");
        context.done();
    });
};

