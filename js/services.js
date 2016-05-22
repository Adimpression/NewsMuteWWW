angular.module('app.services', [])

    .service('AppService', function ($http, $rootScope, $window, Utility) {

        var GRAPH_API_EMAIL = "https://graph.facebook.com/v2.5/me";

        var apigClient;

        function getApigClient() {
            if (apigClient == null) {
                //$window.location.reload("#/login");
            }

            return apigClient;
        }

        getApigClient();

        var syncClient;


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

            getApigClient().yawnGet({
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
                    syncClient = new AWS.CognitoSyncManager();

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
                                    console.log(data);
                                    console.log(newRecords);
                                    console.log("Cognito Sync humanId Complete:onSuccess");
                                },
                                onFailure: function (err) {
                                    console.log(err);
                                    console.log("Cognito Sync humanId Complete:onFailure");
                                },
                                onConflict: function (dataset, conflicts, callback) {
                                    //http://docs.aws.amazon.com/cognito/latest/developerguide/handling-callbacks.html
                                    console.log(dataset);
                                    console.log(conflicts);
                                    var resolved = [];
                                    for (var i = 0; i < conflicts.length; i++) {
                                        resolved.push(conflicts[i].resolveWithValue(conflicts[i].getLocalRecord().getValue()));
                                    }
                                    dataset.resolve(resolved, function () {
                                        console.log("Cognito Sync humanId Complete:onConflict");
                                        return callback(true);
                                    });
                                },
                                onDatasetDeleted: function (dataset, datasetName, callback) {
                                    console.log(dataset);
                                    console.log(datasetName);
                                    console.log("Cognito Sync humanId Complete:onDatasetDeleted");
                                },
                                onDatasetMerged: function (dataset, datasetNames, callback) {
                                    console.log(dataset);
                                    console.log(datasetNames);
                                    console.log("Cognito Sync humanId Complete:onDatasetMerged");
                                }
                            });
                        });
                    });

                    syncClient.openOrCreateDataset('syncTime', function (err, dataset) {
                        dataset.remove('v1', function (err, record) {
                            dataset.put('v1', (new Date).getTime(), function (err, record) {
                                dataset.synchronize({
                                    onSuccess: function (data, newRecords) {
                                        console.log(data);
                                        console.log(newRecords);
                                        console.log("Cognito Sync syncTime Complete");
                                    }
                                });
                            });
                        });
                    });
                });
            } catch (e) {
                alert(e.message);
            }
        };

        this.subscribeFeed = function (username, url) {
            return getApigClient().stalkPost({}, {
                'events': JSON.stringify([
                    {
                        'operation': "create",
                        'payload': [url]
                    }
                ])
            }, {});
        };

        this.unsubscribeFeed = function (username, url) {
            return getApigClient().stalkPost({}, {
                'events': JSON.stringify([
                    {
                        'operation': "delete",
                        'payload': [url]
                    }
                ])
            }, {});
        };

        this.newsFeed = function () {
            var response = getApigClient().yawnGet({
                'events': JSON.stringify([
                    {
                        'operation': "list",
                        'payload': {}
                    }
                ])
            }, '', '');

            return new ParseYawnGet().rootObject(response);
        };

        this.muteNews = function (username, url, successCallback, failureCallback) {
            getApigClient().yawnPost({}, {
                    'events': JSON.stringify([
                        {
                            'operation': "delete",
                            'payload': [url]
                        }
                    ])
                }, {})
                .then(successCallback)
                .catch(failureCallback);
        };

        this.shareNews = function (username, url) {
            getApigClient().screamPost({}, {
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

        this.superfriend = function (friendsEmailArray, successCallback, failureCallback) {
            getApigClient().superfriendPost({}, {
                    'events': JSON.stringify([
                        {
                            'operation': "create",
                            'payload': friendsEmailArray
                        }
                    ])
                }, {})
                .then(successCallback)
                .catch(failureCallback);
        };

        this.syncTime = function () {
            if (syncClient != undefined) {
                syncClient.openOrCreateDataset('syncTime', function (err, dataset) {
                    dataset.remove('v1', function (err, record) {
                        dataset.put('v1', (new Date).getTime(), function (err, record) {
                            dataset.synchronize({
                                onSuccess: function (data, newRecords) {
                                    console.log(data);
                                    console.log(newRecords);
                                    console.log("Cognito Sync syncTime Complete");
                                }
                            });
                        });
                    });
                });
            } else {
                AWS.config.region = 'us-east-1';
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'us-east-1:cb9e6ded-d4d8-4f07-85cc-47ea011c8c53',
                    RoleArn: 'arn:aws:iam::990005713460:role/Cognito_NewsMuteAuth_Role',
                    Logins: {
                        'graph.facebook.com': Utility.getToken()
                    },
                    RoleSessionName: 'web'
                });

                AWS.config.credentials.get(function () {
                    "use strict";
                    syncClient = new AWS.CognitoSyncManager();
                    syncClient.openOrCreateDataset('syncTime', function (err, dataset) {
                        dataset.remove('v1', function (err, record) {
                            dataset.put('v1', (new Date).getTime(), function (err, record) {
                                dataset.synchronize({
                                    onSuccess: function (data, newRecords) {
                                        console.log(data);
                                        console.log(newRecords);
                                        console.log("Cognito Sync syncTime Complete");
                                    }
                                });
                            });
                        });
                    });
                });
            }
        }
    });
