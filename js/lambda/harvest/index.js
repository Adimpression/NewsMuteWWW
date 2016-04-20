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

            var rootObject = new parse.Parse().rootObject(goodStuff);

            var fetch = function (element, callback) {

                var item = new parse.Parse().item(element);

                // console.log("item:" + JSON.stringify(item));

                var me = item.me;
                var ref = item.ref;

                console.log("ref:", ref);

                var req = request(ref);
                var feedparser = new FeedParser();

                req.on('error', function (error) {
                    // console.log('req.on/error');
                    console.log(error);
                });
                req.on('response', function (res) {
                    // console.log('response');
                    var stream = this;

                    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

                    stream.pipe(feedparser);
                });

                feedparser.on('error', function (error) {
                    // console.log('feedparser.on/error');
                    console.log(error);
                });

                feedparser.on('readable', function () {
                    // console.log('feedparser.on/readable');
                    var stream = this;
                    var streamedItem;

                    async.whilst(function () {
                            streamedItem = stream.read();
                            var returnVal = streamedItem != null;
                            console.log("returnVal :" + returnVal + " for element.ref:" + element.ref);
                            return returnVal;
                        },
                        function (asyncCallback) {
                            asyncCallback(null, stream);
                            // dynamo.query(
                            //     {
                            //         'TableName': 'Yawn',
                            //         'KeyConditionExpression': 'me = :me and #ref = :moodref',
                            //         'ExpressionAttributeNames': {
                            //             '#ref': 'ref'
                            //         },
                            //         'ExpressionAttributeValues': {
                            //             ':me': me,
                            //             ':moodref': '0' + streamedItem.link
                            //         }
                            //     },
                            //     function (hmmWhatsThis, goodStuff, hmmmNoIdea) {
                            //         // console.log("hmmWhatsThis:" + JSON.stringify(hmmWhatsThis));
                            //         // console.log("goodStuff:" + JSON.stringify(goodStuff));
                            //         // console.log("hmmmNoIdea:" + JSON.stringify(hmmmNoIdea));
                            //
                            //         var rootObject = new parse.Parse().rootObject(goodStuff);
                            //         var presentInAlreadyReadItems = rootObject.Items.length != 0;
                            //
                            //         if (!presentInAlreadyReadItems) {
                            //             dynamo.putItem({
                            //                 'TableName': 'Yawn',
                            //                 'Item': {
                            //                     'me': me,
                            //                     'ref': '1' + streamedItem.link,
                            //                     'title': streamedItem.title,
                            //                     'content': streamedItem.description
                            //                 }
                            //             }, function () {
                            //                 console.log("Inserted item into database");
                            //                 asyncCallback(null, streamedItem);
                            //             });
                            //         } else {
                            //             console.log("Ignoring dead item");
                            //             asyncCallback(null, streamedItem);
                            //         }
                            //     });
                        },
                        function (error, ignore) {
                            if (error != null) {
                                console.log("error:" + error);
                                callback(error, element);
                            } else {
                                console.log("Done processing all items for " + element.ref + ", calling callback function");
                                callback(null, element);
                            }
                        }
                    );
                });
            };

            async.map(rootObject.Items, fetch, function (err, results) {
                console.log("Results:" + results);
                console.log("Errors:" + err);
                console.log('event:' + JSON.stringify(event));
                context.done(null, event);
            });
        });
};
