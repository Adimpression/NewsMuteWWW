console.log('Starting to Scream');

var doc = require('dynamodb-doc');
var request = require('request');
var FeedParser = require('feedparser');
var async = require('async');
var parse = require('./ts/Parse');


var dynamo = new doc.DynamoDB();

exports.handler = function (event, context) {
    console.log('event:', JSON.stringify(event));
    console.log('context:', JSON.stringify(context));

    dynamo.query(
        {
            'TableName': 'Stalk',
            'KeyConditionExpression': "me = :me",
            'ExpressionAttributeValues': {
                ':me': event.identityId
            }
        }, function (hmmWhatsThis, goodStuff, hmmmNoIdea) {
            console.log(JSON.stringify(goodStuff));

            var p = new parse.Parse();

            var rootObject = p.rootObject(goodStuff);

            var fetch = function (element, callback) {
                var item = p.item(element);

                console.log(JSON.stringify(item));

                var me = item.me;
                var ref = item.ref;

                console.log(ref);

                var req = request(ref);
                var feedparser = new FeedParser();

                req.on('error', function (error) {
                    console.log('error');
                    console.log(error);
                });
                req.on('response', function (res) {
                    console.log('response');
                    var stream = this;

                    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

                    stream.pipe(feedparser);
                });


                feedparser.on('error', function (error) {
                    console.log('error');
                    console.log(error);
                });
                feedparser.on('readable', function () {
                    console.log('readable');
                    var stream = this;
                    var meta = this.meta;
                    var item;

                    while (item = stream.read()) {
                        dynamo.putItem({
                            'TableName': 'Yawn',
                            'Item': {
                                'me': me,
                                'ref': item.link,
                                'title': item.title,
                                'content': item.description
                            }
                        }, function () {
                        });
                    }

                    callback();
                });
            };

            async.map(rootObject.Items, fetch, function (err, results) {
                console.log("Results:" + results);
                console.log("Errors:" + err);
                context.done(null, event);
            });
        });
};
