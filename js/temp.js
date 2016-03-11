console.log('Loading function');

var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();

/**
 * Provide an event that contains the following keys:
 *
 *   - operation: one of the operations in the switch statement below
 *   - tableName: required for operations that interact with DynamoDB
 *   - payload: a parameter to pass to the operation being performed
 */
exports.handler = function (event, context) {
    console.log('Received events:', JSON.stringify(event, null, 2));

    event.forEach(function (action) {
        "use strict";
        var operation = action.operation;

        if (action.tableName) {
            action.payload.TableName = action.tableName;
        }

        switch (operation) {
            case 'create':
                dynamo.putItem(action.payload, context.done);
                break;
            case 'read':
                dynamo.getItem(action.payload, context.done);
                break;
            case 'update':
                dynamo.updateItem(action.payload, context.done);
                break;
            case 'delete':
                dynamo.deleteItem(action.payload, context.done);
                break;
            case 'list':
                dynamo.scan(action.payload, context.done);
                break;
            case 'echo':
                context.succeed(action.payload);
                break;
            case 'ping':
                context.succeed('pong');
                break;
            default:
                context.fail(new Error('Unrecognized operation "' + operation + '"'));
        }
    });
};
