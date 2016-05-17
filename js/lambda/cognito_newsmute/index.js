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

    var snsTopicArns = ['arn:aws:sns:us-east-1:990005713460:cognito_newsmute_harvest', 'arn:aws:sns:us-east-1:990005713460:cognito_newsmute_superfriend'];

    _(snsTopicArns).flatFilter(
        function (snsTopicArn) {
            return _(function (pushFunc, next) {
                sns.publish({
                    Message: JSON.stringify(event),
                    TopicArn: snsTopicArn
                }, function (err, data) {
                    if (err) {
                        console.log(err.stack);
                        pushFunc(err.stack, true);
                    } else {
                        log.info('Published to ' + snsTopicArn);
                        log.debug(data);
                        log.info('inner done');
                        pushFunc(null, true);
                    }
                });
            });
        }
    ).done(
        function (err, results) {
            log.info('outer done');
            context.done(null, event);
        }
    );

};

