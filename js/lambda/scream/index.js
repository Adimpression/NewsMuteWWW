console.log('Loading function');

var doc = require('dynamodb-doc');
var http = require('http');
var cheerio = require('cheerio');


var dynamo = new doc.DynamoDB();

exports.handler = function (event, context) {
    console.log('event:', JSON.stringify(event));
    console.log('context:', JSON.stringify(context));

    var options = {
        host: 'www.google.com',
        port: 80,
        path: '/index.html'
    };

    http.get(options, function(res) {
        console.log("Got response: " + res.statusCode);
        var data = "";

        res.on("data", function (chunk) {
            // append this chunk to our growing `data` var
            data += chunk;
        });

        // this event fires *one* time, after all the `data` events/chunks have been gathered
        res.on("end", function () {
            // you can use res.send instead of console.log to output via express
            console.log(data);

            var load = cheerio.load(data);
        });

    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });

    var events;

    switch (event.method) {
        case 'GET':
            events = event.query.events;
            break;
        case 'POST':
            events = event.body.events;
    }


    JSON.parse(events).forEach(function (action) {
            "use strict";
            var operation = action.operation;


            switch (operation) {
                case 'create':
                    action.payload.forEach(function (item) {
                        dynamo.putItem(
                            {
                                'TableName': 'Scream',
                                'Item': {
                                    'me': context.identity.cognitoIdentityId,
                                    'ref': item
                                }
                            }
                            , context.done);
                    });
                    break;
                case 'list':
                    dynamo.query(
                        {
                            'TableName': 'Scream',
                            'KeyConditionExpression': "me = :me",
                            'ExpressionAttributeValues': {
                                ':me': context.identity.cognitoIdentityId
                            }
                        }
                        , context.done);
                    break;
                default:
                    context.fail(new Error('Unrecognized operation "' + operation + '"'));
            }
        }
    );
};
