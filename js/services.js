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
            }

            return apigClient;
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

        this.loginWithNewsMute = function (email, password, successCallback, failureCallback) {

            AWSCognito.config.region = 'us-east-1';

            var authenticationData = {
                Username: email,
                Password: password,
            };

            var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
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
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    console.log('access token + ' + result.getAccessToken().getJwtToken());

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

                },

                onFailure: function (err) {
                    alert(err);
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

            var attributeList = [];

            var dataEmail = {
                Name: 'email',
                Value: email
            };

            var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);

            attributeList.push(attributeEmail);

            userPool.signUp(email, password, attributeList, null, function (err, result) {
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
                        //$rootScope.$broadcast('loading:hide');
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
                                                    failureCallback(err);
                                                }
                                            });
                                        } else {
                                            console.log(err);
                                            failureCallback(err)
                                        }
                                    });
                                },
                                inputVerificationCode() {
                                    var verificationCode = prompt("Enter the verification code sent to " + email + " here");
                                    cognitoUser.confirmPassword(verificationCode, password, this);
                                    successCallback("Please login with the your email and password");
                                }
                            });

                            //$rootScope.$broadcast('loading:hide');
                            break;

                        case 'InvalidPasswordException':
                            console.log(err);
                            $rootScope.showToast(err.message);

                            //$rootScope.$broadcast('loading:hide');
                            break;

                        default:
                            console.log(err);
                            failureCallback(err.message);

                            //$rootScope.$broadcast('loading:hide');
                            break;
                    }
                }

            });
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

        this.unsubscribeFeed = function (username, url, successCallback, failureCallback) {
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
