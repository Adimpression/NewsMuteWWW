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
                    // handle any request errors
                    console.log('error');
                    console.log(error);
                });
                req.on('response', function (res) {
                    console.log('response');
                    var stream = this;

                    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

                    stream.pipe(feedparser);
                });


                feedparser.on('error', function(error) {
                    // always handle errors
                    console.log('error');
                });
                feedparser.on('readable', function() {
                    console.log('readable');
                    // This is where the action is!
                    var stream = this;
                    var meta = this.meta;// **NOTE** the "meta" is always available in the context of the feedparser instance
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
                

                // request(ref, function (error, response, html) {
                //     if (!error && response.statusCode == 200) {
                //         var $ = cheerio.load(html);
                //         var title = $('title').text();
                //         var content = $('meta[name=description]').attr("content");
                //
                //         dynamo.putItem({
                //             'TableName': 'Yawn',
                //             'Item': {
                //                 'me': me,
                //                 'ref': ref,
                //                 'title': title,
                //                 'content': content
                //             }
                //         }, function () {
                //             dynamo.deleteItem({
                //                 'TableName': 'Scream',
                //                 'Key': {
                //                     'me': me,
                //                     'ref': ref
                //                 }
                //             }, callback);
                //         });
                //
                //     } else {
                //         callback('HTTP Status Code:' + response.statusCode);
                //     }
                // });
            };

            async.map(rootObject.Items, fetch, function (err, results) {
                console.log("Results:" + results);
                console.log("Errors:" + err);
                context.done(null, event);
            });
            
            
            // context.done(null, event);
            // dynamo.putItem(
            //     {
            //         'TableName': 'Yawn',
            //         'Item': {
            //             'me': context.identity.cognitoIdentityId,
            //             'ref': item
            //         }
            //     }
            //     , context.done);
        });
};
