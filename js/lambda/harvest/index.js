console.log('Starting to Scream');

var doc = require('dynamodb-doc');


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
            context.done(null, event);
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
