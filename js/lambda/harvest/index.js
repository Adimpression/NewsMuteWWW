console.log('Starting to Scream');

var doc = require('dynamodb-doc');
var request = require('request');
var FeedParser = require('feedparser');
var async = require('async');
var _ = require('highland');
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
            console.log(JSON.stringify(dataFromStalk));
            _(new parse.Parse().rootObject(dataFromStalk).Items)
                .flatFilter(
                    function (element) {
                        return _(function (pushFunc, next) {

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
                                _(this)
                                    .flatFilter(function (streamedItem) {
                                        return _(function (pushFunc2, next2) {
                                            dynamo.query(
                                                {
                                                    'TableName': 'Yawn',
                                                    'KeyConditionExpression': 'me = :me and #ref = :moodref',
                                                    'ExpressionAttributeNames': {
                                                        '#ref': 'ref'
                                                    },
                                                    'ExpressionAttributeValues': {
                                                        ':me': event.identityId,
                                                        ':moodref': '0' + streamedItem.link
                                                    }
                                                },
                                                function (error, data) {
                                                    // console.log("error:" + JSON.stringify(error));
                                                    console.log("data:" + JSON.stringify(data));

                                                    var rootObject = new parse.Parse().rootObject(data);
                                                    var presentInAlreadyReadItems = rootObject.Items.length != 0;

                                                    if (!presentInAlreadyReadItems) {
                                                        dynamo.putItem({
                                                            'TableName': 'Yawn',
                                                            'Item': {
                                                                'me': event.identityId,
                                                                'ref': '1' + streamedItem.link,
                                                                'title': streamedItem.title,
                                                                'content': streamedItem.description
                                                            }
                                                        }, function () {
                                                            console.log("Inserted item into database");
                                                            pushFunc2(null, true);
                                                        });
                                                    } else {
                                                        console.log("Ignoring dead item");
                                                        pushFunc2(null, true);
                                                    }
                                                });
                                        });
                                    })
                                    .done(function () {
                                        console.log('inner done');
                                        pushFunc(null, true);
                                    });
                            });
                        });
                    })
                .done(
                    function (err, results) {
                        console.log('outer done');
                        context.done(null, event);
                    });
        });
};

