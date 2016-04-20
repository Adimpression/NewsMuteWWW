console.log('Starting to Yawn');

var doc = require('dynamodb-doc');

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
                                    'me': context.identity.cognitoIdentityId,
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
                        }
                        , context.done);
                    break;
                default:
                    context.fail(new Error('Unrecognized operation "' + operation + '"'));
            }
        }
    );
};
