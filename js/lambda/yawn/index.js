console.log('Starting to Yawn');

var doc = require('dynamodb-doc');

var dynamoDBYawnParser = require('./ts/ParseYawnGet');

var dynamo = new doc.DynamoDB();

exports.handler = function (event, context) {
    console.log('event:', JSON.stringify(event));
    console.log('context:', JSON.stringify(context));

    var events;

    switch (event.method) {
        case 'GET':
            events = event.query.events;
            break;
        case 'POST':
            events = event.body.events;
    }

    var me = context.identity.cognitoIdentityId;

    JSON.parse(events).forEach(function (action) {
            "use strict";
            var operation = action.operation;

            switch (operation) {
                case 'delete':
                    action.payload.forEach(function (link) {
                        dynamo.deleteItem(
                            {
                                'TableName': 'Yawn',
                                'Key': {
                                    'me': me,
                                    'ref': '1' + link
                                }
                            },
                            function () {
                                dynamo.putItem(
                                    {
                                        'TableName': 'Yawn',
                                        'Item': {
                                            'me': me,
                                            'ref': '0' + link
                                        }
                                    },
                                    context.done);
                            });
                    });
                    break;
                case 'list':
                    dynamo.query(
                        {
                            'TableName': 'Yawn',
                            'KeyConditionExpression': 'me = :me and begins_with(#ref, :mood)',
                            'ExpressionAttributeNames': {
                                '#ref': 'ref'
                            },
                            'ExpressionAttributeValues': {
                                ':me': context.identity.cognitoIdentityId,
                                ':mood': '1'
                            }
                        }, function (error, dataFromYawn) {
                            var rootObject = new dynamoDBYawnParser.ParseYawnGet().rootObject(dataFromYawn);
                            var items = rootObject.Items;

                            var present = [];

                            var isPresent = function (array, checkedElement) {
                                return !!~array.indexOf(checkedElement)
                            };

                            for (var i = 0; i < items.length; i++) {//http://stackoverflow.com/questions/6950236/how-do-i-remove-an-element-in-a-list-using-foreach
                                if (isPresent(present, items[i].source)) {
                                    items.splice(i--, 1);
                                } else {
                                    present.push(items[i].source);
                                }
                            }

                            context.done(error, dataFromYawn);

                        });
                    break;
                default:
                    context.fail(new Error('Unrecognized operation "' + operation + '"'));
            }
        }
    );
};
