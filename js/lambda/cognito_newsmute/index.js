console.log('Starting to cognito_newsmute');

var _ = require('highland');
var AWS = require('aws-sdk');
var bunyan = require('bunyan');

var log = bunyan.createLogger({
    name: "cognito_newsmute",
    level: 'debug',
    src: true
});

AWS.config.region = 'us-east-1';
var sns = new AWS.SNS();

exports.handler = function (event, context) {
    console.log('event:', JSON.stringify(event));
    console.log('context:', JSON.stringify(context));

    var cognito_newsmute_harvest = 'arn:aws:sns:us-east-1:990005713460:cognito_newsmute_harvest';

    sns.publish({
        Message: JSON.stringify(event),
        TopicArn: cognito_newsmute_harvest
    }, function (err, data) {
        if (err) {
            console.log(err.stack);
            return;
        }
        log.debug('Published to ' + cognito_newsmute_harvest);
        log.debug(data);
        context.done(null, 'Function Finished!');
    });

};

