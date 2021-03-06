angular.module('app.services', [])
    .service('AppService', function ($http, $rootScope, $location, $window, $state, Utility) {

        AWS.config.region = 'us-east-1';
        AWSCognito.config.region = 'us-east-1';

        var GRAPH_API_EMAIL = "https://graph.facebook.com/v2.5/me";

        var apigClient;

        function getApigClient() {
            if (apigClient == null && $location.path() != '#/login') {
                $window.location.href = "#/login";
                window.location.reload();
            } else {
                return apigClient;
            }
        }

        function reset() {
            apigClient == null;
            Utility.clearSession();
            if ($location.path() != '#/login') {
                $window.location.href = "#/login";
                window.location.reload();
            }
        }

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
            console.log('awsCognitoCachedLogin');
            console.log('Constructing API Gateway Client with stored credentials');
            apigClient = apigClientFactory.newClient({
                IdentityId: Utility.getHumanId(),
                accessKey: Utility.getAccessKey(),
                secretKey: Utility.getSecretKey(),
                sessionToken: Utility.getSessionToken(),
                region: 'us-east-1'
            });
            console.log('Constructed API Gateway Client with stored credentials');

            console.log('Validating API Gateway Client');
            getApigClient()
                .yawnGet({
                    'events': JSON.stringify([
                        {
                            'operation': "list",
                            'payload': {}
                        }
                    ])
                }, '', '')
                .then(function () {
                    console.log('Validating API Gateway Client result: Successful');

                    console.log('AWS.config.credentials: Initializing');
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: 'us-east-1:cb9e6ded-d4d8-4f07-85cc-47ea011c8c53',
                        IdentityId: Utility.getHumanId(),
                        RoleArn: 'arn:aws:iam::990005713460:role/Cognito_NewsMuteAuth_Role',
                        Logins: {
                            'cognito-idp.us-east-1.amazonaws.com/us-east-1_qUg94pB5O': Utility.getToken()
                        }
                        //RoleSessionName: 'web'
                    });

                    console.log('AWS.config.credentials: Getting');

                    AWS.config.credentials.get(function(err){
                        if(!err) {
                            console.log('AWS.config.credentials: Successful');
                            console.log('AWS.CognitoSyncManager: Initializing');
                            syncClient = new AWS.CognitoSyncManager();
                            console.log('AWS.CognitoSyncManager: Done');
                            successCallback();
                        } else {
                            console.log('AWS.config.credentials: Failed.');
                            console.log(err);
                            failureCallback(err);
                        }
                    });
                })
                .catch(function () {
                    console.log('Validating API Gateway Client result: Failed');
                    failureCallback();
                });
        };

        this.awsCognitoLoginFacebook = function (token, email, successCallback, failureCallback) {
            console.log('awsCognitoLoginFacebook');
            $rootScope.$broadcast('loading:show');
            try {
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
                    Utility.setHumanId(syncClient.getIdentityId());

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
                                Utility.setToken(token);

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
                                    console.log("Cognito Sync humanId Complete:onSuccess");
                                },
                                onFailure: function (err) {
                                    console.log(err);
                                    console.log("Cognito Sync humanId Complete:onFailure");
                                },
                                onConflict: function (dataset, conflicts, callback) {
                                    //http://docs.aws.amazon.com/cognito/latest/developerguide/handling-callbacks.html
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
                                    console.log("Cognito Sync humanId Complete:onDatasetDeleted");
                                },
                                onDatasetMerged: function (dataset, datasetNames, callback) {
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

        this.awsCognitoLoginNewsMute = function (email, password, successCallback, failureCallback) {
            console.log('awsCognitoLoginNewsMute');
            $rootScope.$broadcast('loading:show');

            AWSCognito.config.region = 'us-east-1';

            var poolData = {
                UserPoolId: 'us-east-1_qUg94pB5O',
                ClientId: '1bk6nf4o2fc60cnonmcj5tpbn1'
            };
            var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
            var userData = {
                Username: email,
                Pool: userPool
            };
            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
            cognitoUser.authenticateUser(new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails({
                Username: email,
                Password: password,
            }), {
                onSuccess: function (result) {
                    console.log('Access Token:' + result.getAccessToken().getJwtToken());

                    var token = result.getIdToken().getJwtToken();

                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: 'us-east-1:cb9e6ded-d4d8-4f07-85cc-47ea011c8c53',
                        RoleArn: 'arn:aws:iam::990005713460:role/Cognito_NewsMuteAuth_Role',
                        Logins: {
                            'cognito-idp.us-east-1.amazonaws.com/us-east-1_qUg94pB5O': token
                        }
                        //RoleSessionName: 'web'
                    });

                    // Instantiate aws sdk service objects now that the credentials have been updated.
                    // example: var s3 = new AWS.S3();

                    AWS.config.credentials.get(function () {
                        syncClient = new AWS.CognitoSyncManager();

                        console.log(syncClient.getIdentityId());
                        Utility.setHumanId(syncClient.getIdentityId());

                        var cognitoidentity = new AWS.CognitoIdentity(AWS.config.credentials);

                        var accessKey;
                        var secretKey;
                        var sessionToken;

                        cognitoidentity.getCredentialsForIdentity(
                            {
                                IdentityId: syncClient.getIdentityId(),
                                Logins: {
                                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_qUg94pB5O': token
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
                                    Utility.setToken(token);

                                    $rootScope.$broadcast('loading:hide');

                                    successCallback(data);
                                } else {
                                    console.log(err, err.stack);
                                    $rootScope.$broadcast('loading:hide');
                                    failureCallback(err.message);
                                }
                            });

                        syncClient.openOrCreateDataset('humanId', function (err, dataset) {
                            dataset.put('v1', email, function (err, record) {
                                dataset.synchronize({
                                    onSuccess: function (data, newRecords) {
                                        console.log("Cognito Sync humanId Complete:onSuccess");
                                    },
                                    onFailure: function (err) {
                                        console.log(err);
                                        console.log("Cognito Sync humanId Complete:onFailure");
                                    },
                                    onConflict: function (dataset, conflicts, callback) {
                                        //http://docs.aws.amazon.com/cognito/latest/developerguide/handling-callbacks.html
                                        // console.log(dataset);
                                        // console.log(conflicts);
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
                                        // console.log(dataset);
                                        // console.log(datasetName);
                                        console.log("Cognito Sync humanId Complete:onDatasetDeleted");
                                    },
                                    onDatasetMerged: function (dataset, datasetNames, callback) {
                                        // console.log(dataset);
                                        // console.log(datasetNames);
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
                                            console.log("Cognito Sync syncTime Complete");
                                        }
                                    });
                                });
                            });
                        });
                    });

                },

                onFailure: function (err) {
                    $rootScope.$broadcast('loading:hide');
                    alert(err.message);
                },

            });

        };

        this.register = function (email, password, successCallback, failureCallback) {
            $rootScope.$broadcast('loading:show');

            var poolData = {
                UserPoolId: 'us-east-1_qUg94pB5O',
                ClientId: '1bk6nf4o2fc60cnonmcj5tpbn1'
            };
            var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

            userPool.signUp(email, password, [new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
                Name: 'email',
                Value: email
            })], null, function (err, result) {
                if (!err) {
                    cognitoUser = result.user;
                    console.log('user name is ' + cognitoUser.getUsername());
                    cognitoUser.confirmRegistration(prompt("Enter your verification code here"), true, function (err, result) {
                        if (!err) {
                            successCallback(result);
                        } else {
                            console.log(err);
                            failureCallback(err);
                        }
                        $rootScope.$broadcast('loading:hide');
                    });
                } else {
                    switch (err.code) {
                        case 'UsernameExistsException':
                            var userData = {
                                Username: email,
                                Pool: userPool
                            };

                            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

                            cognitoUser.forgotPassword({
                                onSuccess: function (result) {
                                    console.log('call result: ' + result);
                                },
                                onFailure: function (err) {
                                    cognitoUser.resendConfirmationCode(function (err, result) {
                                        if (!err) {
                                            console.log('call result: ' + result);
                                            cognitoUser.confirmRegistration(prompt("Enter the verification code sent to " + email + " here"), true, function (err, result) {
                                                if (!err) {
                                                    successCallback(result);
                                                } else {
                                                    console.log(err);
                                                    failureCallback(err.message);
                                                }
                                            });
                                        } else {
                                            console.log(err);
                                            failureCallback(err.message)
                                        }
                                    });
                                },
                                inputVerificationCode: function (data) {
                                    var verificationCode = prompt("Enter the verification code sent to " + email + " here");
                                    cognitoUser.confirmPassword(verificationCode, password, {
                                        onSuccess: function (result) {
                                            successCallback("Please login with the your email and password");
                                        },
                                        onFailure: function (err) {
                                            console.log(err);
                                            failureCallback(err.message);
                                        }
                                    });
                                }
                            });
                            $rootScope.$broadcast('loading:hide');
                            break;

                        case 'InvalidPasswordException':
                            console.log(err);
                            failureCallback(err.message);
                            break;

                        default:
                            console.log(err);
                            failureCallback(err.message);
                            $rootScope.$broadcast('loading:hide');
                            break;
                    }
                }
            });
        };

        this.subscribeFeed = function (url) {
            return getApigClient().stalkPost({}, {
                'events': JSON.stringify([
                    {
                        'operation': "create",
                        'payload': [url]
                    }
                ])
            }, {});
        };

        this.unsubscribeFeed = function (url, successCallback, failureCallback) {
            return getApigClient().stalkPost({}, {
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

        this.muteNews = function (url, successCallback, failureCallback) {
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

        this.shareNews = function (url) {
            getApigClient().screamPost({}, {
                'events': JSON.stringify([
                    {
                        'operation': "create",
                        'payload': [url]
                    }
                ])
            }, {});
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
                console.log('Sync client is available for use');
                syncClient.openOrCreateDataset('syncTime', function (err, dataset) {
                    dataset.remove('v1', function (err, record) {
                        dataset.put('v1', (new Date).getTime(), function (err, record) {
                            dataset.synchronize({
                                onSuccess: function (data, newRecords) {
                                    // console.log(data);
                                    // console.log(newRecords);
                                    console.log("Cognito Sync syncTime Complete");
                                },
                                onFailure: function (err) {
                                    console.log(err);
                                    reset();
                                },
                                onConflict: function (dataset, conflicts, callback) {
                                },
                                onDatasetDeleted: function (dataset, datasetName, callback) {
                                },
                                onDatasetMerged: function (dataset, datasetNames, callback) {
                                }
                            });
                        });
                    });
                });
            } else {
                console.log('Sync client has expired');
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
                                        console.log("Cognito Sync syncTime Complete");
                                    },
                                    onFailure: function (err) {
                                        console.log(err);
                                        reset();
                                    },
                                    onConflict: function (dataset, conflicts, callback) {
                                    },
                                    onDatasetDeleted: function (dataset, datasetName, callback) {
                                    },
                                    onDatasetMerged: function (dataset, datasetNames, callback) {
                                    }
                                });
                            });
                        });
                    });
                });
            }
        }
    });
