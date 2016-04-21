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
        }, function (error, dataFromStalk) {
            async.mapSeries(new parse.Parse().rootObject(dataFromStalk).Items, function (element, callback) {

                var item = new parse.Parse().item(element);

                var req = request(item.ref);
                var feedparser = new FeedParser();

                req.on('error', function (error) {
                    console.log(error);
                });

                req.on('response', function (res) {
                    var stream = this;

                    if (res.statusCode != 200) {
                        return this.emit('error', new Error('Bad status code'));
                    }

                    stream.pipe(feedparser);
                });

                feedparser.on('error', function (error) {
                    console.log(error);
                });

                feedparser.on('readable', function () {
                    var stream = this;

                    var streamedItem;

                    async.whilst(function () {
                            return (streamedItem = stream.read()) != null;
                        },
                        function (asyncCallback) {

                            asyncCallback(null, streamedItem);

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
                            //     function (error, data) {
                            //         // console.log("error:" + JSON.stringify(error));
                            //         // console.log("data:" + JSON.stringify(data));
                            //         // console.log("hmmmNoIdea:" + JSON.stringify(hmmmNoIdea));
                            //         asyncCallback(null, streamedItem);
                            //
                            //         // var rootObject = new parse.Parse().rootObject(data);
                            //         // var presentInAlreadyReadItems = rootObject.Items.length != 0;
                            //         //
                            //         // if (!presentInAlreadyReadItems) {
                            //         //     dynamo.putItem({
                            //         //         'TableName': 'Yawn',
                            //         //         'Item': {
                            //         //             'me': me,
                            //         //             'ref': '1' + streamedItem.link,
                            //         //             'title': streamedItem.title,
                            //         //             'content': streamedItem.description
                            //         //         }
                            //         //     }, function () {
                            //         //         console.log("Inserted item into database");
                            //         //         asyncCallback(null, streamedItem);
                            //         //     });
                            //         // } else {
                            //         //     console.log("Ignoring dead item");
                            //         //     asyncCallback(null, streamedItem);
                            //         // }
                            //     });
                        },
                        function (error, ignore) {
                            callback(error, element);
                        }
                    );
                });
            }, function (err, results) {
                context.done(null, event);
            });
        });
};
