console.log('Loading function');

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
            break;
        default:
            events = event.Records[0].Sns.Message;
            break;
    }

    if (!event["method"]) {
        console.log("SNS");

        console.log('events:' + events);

        var cognitoEvent = JSON.parse(events);


        switch (cognitoEvent.datasetName) {
            case "syncTime":
                dynamo.query(
                    {
                        'TableName': 'SuperFriend',
                        'KeyConditionExpression': "friend = :friend",
                        'ExpressionAttributeValues': {
                            ':friend': cognitoEvent.datasetRecords.v1.newValue
                        }
                    }, function (error, dataFromStalk) {
                        if (!error) {
                            console.log(JSON.stringify(dataFromStalk))
                        } else {
                            console.log(error);
                        }
                    }
                );
                break;
            case "humanId":
                break;
            default:
                console.log("Unknown datasetName:" + event.datasetName);
        }
    } else {
        console.log("API Gateway");

        JSON.parse(events).forEach(function (action) {
                "use strict";
                var operation = action.operation;

                action.payload.TableName = 'SuperFriend';

                switch (operation) {
                    case 'create':
                        action.payload.forEach(function (contact) {
                            dynamo.putItem(
                                {
                                    'TableName': 'SuperFriend',
                                    'Item': {
                                        'me': context.identity.cognitoIdentityId,
                                        'friend': contact
                                    }
                                }
                                , context.done);
                        });
                        break;
                    case 'list':
                        dynamo.query(
                            {
                                'TableName': 'SuperFriend',
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
    }
};


