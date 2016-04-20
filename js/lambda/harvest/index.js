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

                console.log("item:" + JSON.stringify(item));

                var me = item.me;
                var ref = item.ref;

                console.log("ref:", ref);

                var req = request(ref);
                var feedparser = new FeedParser();

                req.on('error', function (error) {
                    console.log('req.on/error');
                    console.log(error);
                });
                req.on('response', function (res) {
                    console.log('response');
                    var stream = this;

                    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

                    stream.pipe(feedparser);
                });

                feedparser.on('error', function (error) {
                    console.log('feedparser.on/error');
                    console.log(error);
                });

                feedparser.on('readable', function () {
                    console.log('feedparser.on/readable');
                    var stream = this;
                    var item;

                    async.whilst(function () {
                            var state = item = stream.read();
                            var returnVal = state != null;
                            console.log("returnVal :" + state);
                            return returnVal;
                        },
                        function (asyncCallback) {
                            dynamo.query(
                                {
                                    'TableName': 'Yawn',
                                    'KeyConditionExpression': 'me = :me and #ref = :moodref',
                                    'ExpressionAttributeNames': {
                                        '#ref': 'ref'
                                    },
                                    'ExpressionAttributeValues': {
                                        ':me': me,
                                        ':moodref': '0' + item.link
                                    }
                                },
                                function (hmmWhatsThis, goodStuff, hmmmNoIdea) {
                                    // console.log("hmmWhatsThis:" + JSON.stringify(hmmWhatsThis));
                                    console.log("goodStuff:" + JSON.stringify(goodStuff));
                                    // console.log("hmmmNoIdea:" + JSON.stringify(hmmmNoIdea));

                                    var p = new parse.Parse();

                                    var rootObject = p.rootObject(goodStuff);
                                    var presentInAlreadyReadItems = rootObject.Items.length != 0;

                                    if (!presentInAlreadyReadItems) {
                                        dynamo.putItem({
                                            'TableName': 'Yawn',
                                            'Item': {
                                                'me': me,
                                                'ref': '1' + item.link,
                                                'title': item.title,
                                                'content': item.description
                                            }
                                        }, function () {
                                            console.log("Inserted item into database");
                                            asyncCallback();
                                        });
                                    } else {
                                        console.log("Ignoring dead item");
                                        asyncCallback();
                                    }
                                });
                        },
                        function (error, ignore) {
                            if (error != null) {
                                console.log("error:" + error);
                                callback(error, item);
                            } else {
                                console.log("Done processing all items for " + ref + ", calling callback function");
                                callback(null, item);
                            }
                        }
                    );
                });
            };

            async.map(rootObject.Items, fetch, function (err, results) {
                console.log("Results:" + results);
                console.log("Errors:" + err);
                context.done(null, event);
            });
        });
};
