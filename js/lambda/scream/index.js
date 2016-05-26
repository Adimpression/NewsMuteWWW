console.log('Starting to Scream');

var doc = require('dynamodb-doc');


var dynamo = new doc.DynamoDB();


var bunyan = require('bunyan');

var log = bunyan.createLogger({
    name: "scream",
    level: 'debug',
    src: true
});

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
                case 'create':
                    log.debug("create");
                    action.payload.forEach(function (item) {
                        dynamo.putItem(
                            {
                                'TableName': 'Scream',
                                'Item': {
                                    'me': context.identity.cognitoIdentityId,
                                    'ref': item
                                }
                            }
                            , function (error, dataFromScream) {
                                console.log({error: error});
                                console.log({dataFromSuperFriend: dataFromScream});
                                context.done(error, dataFromScream);
                            }
                        );
                    });
                    break;
                case 'list':
                    log.debug("list");
                    dynamo.query(
                        {
                            'TableName': 'Scream',
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
