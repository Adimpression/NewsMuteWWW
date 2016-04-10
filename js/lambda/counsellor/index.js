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
            case "INSERT":

                var me = record.dynamodb.NewImage.me.S;
                var ref = record.dynamodb.NewImage.ref.S;

                request(ref, function (error, response, html) {
                    if (!error && response.statusCode == 200) {
                        var $ = cheerio.load(html);
                        var title = $('title').text();
                        var content = $('meta[name=description]').attr("content");

                        dynamo.putItem({
                            'TableName': 'Yawn',
                            'Item': {
                                'me': me,
                                'ref': ref,
                                'title': title,
                                'content': content
                            }
                        }, function () {
                            dynamo.deleteItem({
                                'TableName': 'Scream',
                                'Key': {
                                    'me': me,
                                    'ref': ref
                                }
                            }, callback);
                        });

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

