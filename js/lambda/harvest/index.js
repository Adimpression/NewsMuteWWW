console.log('Starting to Scream');

var doc = require('dynamodb-doc');


var dynamo = new doc.DynamoDB();

exports.handler = function (event, context) {
    console.log('event:', JSON.stringify(event));
    console.log('context:', JSON.stringify(context));

    context.done(null, event);

    // dynamo.query(
    //     {
    //         'TableName': 'Stalk',
    //         'KeyConditionExpression': "me = :me",
    //         'ExpressionAttributeValues': {
    //             ':me': context.identity.cognitoIdentityId
    //         }
    //     }, function (result) {
    //         console.log(JSON.stringify(result));
    //         // dynamo.putItem(
    //         //     {
    //         //         'TableName': 'Yawn',
    //         //         'Item': {
    //         //             'me': context.identity.cognitoIdentityId,
    //         //             'ref': item
    //         //         }
    //         //     }
    //         //     , context.done);
    //     });
};
