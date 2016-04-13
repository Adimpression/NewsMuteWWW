angular.module('app.services', [])

    .service('AppService', function ($http, $rootScope, Utility) {

        var REGISTER_URL = "http://guardian.newsmute.com:40700/?";
        var GRAPH_API_EMAIL = "https://graph.facebook.com/v2.5/me";
        var SUBSCRIBE_URL = "http://stalk.newsmute.com:16285/?";
        var NEWS_FEED_URL = "http://yawn.newsmute.com:40200/?";
        var NEWS_SHARE_URL = "http://scream.newsmute.com:30200/?";

        var apigClient;

        this.register = function (username, password, email) {
            return $http({
                method: 'GET',
                url: REGISTER_URL,
                params: {
                    user: username,
                    token: password,
                    nmact: "CREATE",
                    email: email
                }
            });
        };

        this.facebookGetEmail = function (token) {
            $rootScope.$broadcast('loading:show');

            var response = $http({
                method: 'GET',
                url: GRAPH_API_EMAIL,
                params: {
                    access_token: token,
                    fields: 'email',
                    format: 'json'
                }
            });

            $rootScope.$broadcast('loading:hide');

            return response;
        };

        this.awsCognitoCachedLogin = function (successCallback, failureCallback) {
            apigClient = apigClientFactory.newClient({
                accessKey: Utility.getAccessKey(),
                secretKey: Utility.getSecretKey(),
                sessionToken: Utility.getSessionToken()
            });

            apigClient.yawnGet({
                'events': JSON.stringify([
                    {
                        'operation': "list",
                        'payload': {}
                    }
                ])
                }, '', '')
                .then(successCallback)
                .catch(failureCallback);
        };


        this.awsCognitoLogin = function (token, email, successCallback, failureCallback) {
            $rootScope.$broadcast('loading:show');

            try {
                AWS.config.region = 'us-east-1';
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'us-east-1:cb9e6ded-d4d8-4f07-85cc-47ea011c8c53',
                    RoleArn: 'arn:aws:iam::990005713460:role/Cognito_NewsMuteAuth_Role',
                    Logins: {
                        'graph.facebook.com': token
                    },
                    RoleSessionName: 'web'
                });

                AWS.config.credentials.get(function () {
                    var syncClient = new AWS.CognitoSyncManager();

                    console.log(syncClient.getIdentityId());

                    var cognitoidentity = new AWS.CognitoIdentity(AWS.config.credentials);

                    var accessKey;
                    var secretKey;
                    var sessionToken;

                    cognitoidentity.getCredentialsForIdentity(
                        {
                            IdentityId: syncClient.getIdentityId(),
                            Logins: {
                                'graph.facebook.com': token
                            }
                        }, function (err, data) {
                            if (!err) {
                                console.log(data);
                                accessKey = data.Credentials.AccessKeyId;
                                secretKey = data.Credentials.SecretKey;
                                sessionToken = data.Credentials.SessionToken;

                                apigClient = apigClientFactory.newClient({
                                    accessKey: accessKey,
                                    secretKey: secretKey,
                                    sessionToken: sessionToken
                                });

                                Utility.setAccessKey(accessKey);
                                Utility.setSecretKey(secretKey);
                                Utility.setSessionToken(sessionToken);

                                $rootScope.$broadcast('loading:hide');

                                successCallback(data);
                            } else {
                                console.log(err, err.stack);

                                $rootScope.$broadcast('loading:hide');

                                failureCallback(err);
                            }
                        });

                    syncClient.openOrCreateDataset('humanId', function (err, dataset) {
                        dataset.put('v1', email, function (err, record) {
                            dataset.synchronize({
                                onSuccess: function (data, newRecords) {
                                }
                            });
                        });
                    });
                });
            } catch (e) {
                alert(e.message);
            }
        };

        this.subscribeFeed = function (username, url) {
            return $http({
                method: 'GET',
                headers: {
                    'x-session-header': window.localStorage['humanIdHash']
                },
                url: SUBSCRIBE_URL,
                params: {
                    user: username,
                    url: url,
                    nmact: "CREATE"
                }
            });
        };

        this.newsFeed = function () {
            var response = apigClient.yawnGet({
                'events': JSON.stringify([
                    {
                        'operation': "list",
                        'payload': {}
                    }
                ])
            }, '', '');

            return new ParseYawnGet().rootObject(response);
        };

        this.readNews = function (username, url) {
            return $http({
                method: 'GET',
                headers: {
                    'x-session-header': window.localStorage['humanIdHash']
                },
                url: NEWS_FEED_URL,
                params: {
                    user: username,
                    nmact: "DELETE",
                    url: url
                },
                timeout: 1000
            });
        };

        this.muteNews = function (username, url) {
            return $http({
                method: 'GET',
                headers: {
                    'x-session-header': window.localStorage['humanIdHash']
                },
                url: NEWS_FEED_URL,
                params: {
                    user: username,
                    nmact: "DELETE",
                    url: url
                },
                timeout: 2000
            });
        };

        this.shareNews = function (username, url) {
            apigClient.screamPost({}, {
                'events': JSON.stringify([
                    {
                        'operation': "create",
                        'payload': [url]
                    }
                ])
            }, {});
        };

        this.getUserLocation = function () {

            return $http({
                method: 'GET',
                url: "http://ipinfo.io"
            });
        };

        this.superfriend = function (friendsEmailArray) {
            apigClient.superfriendPost({}, {
                'events': JSON.stringify([
                    {
                        'operation': "create",
                        'payload': friendsEmailArray
                    }
                ])
            }, {});
        }


    });
