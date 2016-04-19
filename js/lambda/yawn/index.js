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
                    action.payload.forEach(function (item) {
                        dynamo.deleteItem(
                            {
                                'TableName': 'Yawn',
                                'Key': {
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
                            'TableName': 'Yawn',
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