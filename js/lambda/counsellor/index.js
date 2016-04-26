console.log('Starting to Counsel');

var _ = require('highland');
var async = require('async');
var bunyan = require('bunyan');
var cheerio = require('cheerio');
var doc = require('dynamodb-doc');
var http = require('http');
var request = require('request');

var parse = require('./ts/Parse');
var parseKinesis = require('./ts/ParseKinesis');

var dynamo = new doc.DynamoDB();

exports.handler = function (event, context) {
    console.log('event:', JSON.stringify(event));
    console.log('context:', JSON.stringify(context));

    var log = bunyan.createLogger({
        name: "counsellor",
        level: 'info',
        src: true
    });


    _(new parse.Parse().rootObject(event).Records).flatFilter(function (entry) {

        return _(function (pushFunc2, next) {
            var record = new parse.Parse().record(entry);

            switch (record.eventName) {
                case "INSERT":

                    var me = record.dynamodb.NewImage.me.S;
                    var link = record.dynamodb.NewImage.ref.S;

                    log.debug(me);
                    log.debug(link);

                    request(link, function (error, response, html) {
                        if (!error && response.statusCode == 200) {
                            var $ = cheerio.load(html);
                            var title = $('title').text();
                            var content = $('meta[name=description]').attr("content");

                            dynamo.query(
                                {
                                    'TableName': 'SuperFriend',
                                    'KeyConditionExpression': "me = :me",
                                    'ExpressionAttributeValues': {
                                        ':me': me
                                    }
                                }, function (error, dataFromSuperFriend) {
                                    if (error != null) {
                                        log.error(error);
                                        pushFunc2(error, false);
                                        return;
                                    }

                                    log.debug(dataFromSuperFriend);

                                    dynamo.deleteItem({
                                        'TableName': 'Scream',
                                        'Key': {
                                            'me': me,
                                            'ref': link
                                        }
                                    }, function () {
                                        _(new parseKinesis.Parse().rootObject(dataFromSuperFriend).Items)
                                            .flatFilter(
                                                function (element) {
                                                    return _(function (pushFunc, next) {
                                                        dynamo.putItem({
                                                                'TableName': 'Yawn',
                                                                'Item': {
                                                                    'me': element.friend,
                                                                    'ref': link,
                                                                    'title': title,
                                                                    'content': content
                                                                }
                                                            }
                                                            , function () {
                                                                pushFunc(null, true);
                                                            });

                                                    });
                                                })
                                            .done(
                                                function (err, results) {
                                                    log.info('outer done');
                                                    pushFunc2(null, true);
                                                });
                                    });

                                });
                        } else {
                            context.done('HTTP Status Code:' + response.statusCode);
                            pushFunc2(null, true);
                        }
                    });
                    break;
                default:
                    console.log("Ignored eventName:" + record.eventName);
                    pushFunc2(null, true);
            }
        });

    }).done(function () {
        context.done();
    });


};

