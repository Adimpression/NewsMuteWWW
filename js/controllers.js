//arn:aws:execute-api:*:990005713460:u4te21kus8/production/*/superfriend
angular.module('app.controllers', ['angular-hmac-sha512', 'app.utility'])

    .controller('AppCtrl', function ($scope, $state, $rootScope, $crypthmac, Utility, $ionicPopup) {

        $rootScope.logout = function () {
            //Take confirmation
            var confirmPopup = $ionicPopup.confirm({
                title: 'Logout',
                template: 'Are you sure?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    Utility.clearSession();
                    $state.go("login");
                }
            });
        };

        //Show toast
        $rootScope.showToast = function (message) {
            alert(message);
        };

        //Show alert
        $rootScope.showToast = function (message) {
            alert(message);
        };

        //Encrypt
        $rootScope.encrypt = function (text) {
            $crypthmac.encrypt(text, "");
        }
    })

    .controller('LoginCtrl', function ($scope, $state, $rootScope, $log, AppService, Utility) {

        if (typeof String.prototype.startsWith != 'function') {
            String.prototype.startsWith = function (str) {
                return this.indexOf(str) == 0;
            };
        }
        
        var loginViaFacebook = function (requestToken) {

            AppService.facebookGetEmail(requestToken)
                .then(
                    function (response) {
                        console.log();
                        if (!response.data["error"]) {
                            AppService.awsCognitoLogin(requestToken, response.data.email,
                                function (success) {
                                    $state.go("app.news");
                                },
                                function (failure) {
                                    console.log(failure);
                                });
                        } else {
                            $rootScope.showToast("Facebook Session Invalid");
                            console.log(response);
                        }
                    },
                    function (err) {
                        //$rootScope.showToast("Error occurred, try again :" + JSON.stringify(err));
                    }
                );
        };

        loginViaFacebook(Utility.getToken());

        $scope.login = function () {
            var clientId = '174714512893777';

            var ref = window.open('https://www.facebook.com/dialog/oauth?' +
                'client_id=' + clientId + '&' +
                'response_type=token&' +
                'scope=email&' +
                'redirect_uri=http://localhost/callback&' +
                'state=' + new Date().getTime() + '&' +
                'approval_prompt=force&'
                , '_blank', 'location=yes');

            ref.addEventListener('loadstart', function (event) {
                if ((event.url).startsWith("http://localhost")) {
                    var requestToken = Utility.getUrlParameter("access_token", event.url);
                    ref.close();
                    loginViaFacebook(requestToken);
                    Utility.setToken(requestToken);
                }
            });

            ref.addEventListener('loaderror', function (event) {
                if ((event.url).startsWith("http://localhost")) {
                    var requestToken = Utility.getUrlParameter("access_token", event.url);
                    ref.close();
                    loginViaFacebook(requestToken);
                    Utility.setToken(requestToken);
                }
            });
        }
    })

    .controller('RegisterCtrl', function ($scope, $state, $rootScope, AppService, Utility) {
        $scope.user =
        {
            email: "",
            password: "",
            confirm: ""
        };

        $scope.register = function () {

            Utility.clearSession();

            //Validation
            if (Utility.isEmpty($scope.user.email) || (!Utility.isValidEmail($scope.user.email))) {
                $rootScope.showToast("Please enter email");
                return;
            }

            if (Utility.isEmpty($scope.user.password)) {
                $rootScope.showToast("Please enter password ");
                return;
            }

            if (Utility.isEmpty($scope.user.confirm)) {
                $rootScope.showToast("Please enter confirm password ");
                return;
            }

            if ($scope.user.password != $scope.user.confirm) {
                $rootScope.showToast("Confirm password doesn't matched");
                return;
            }

            //Login
            AppService.register($rootScope.encrypt($scope.user.email), $rootScope.encrypt($scope.user.password), $scope.user.email)
                .then(
                    function (response) {
                        //$rootScope.showToast(JSON.stringify(response));
                        $rootScope.showToast("Registered successfully");
                        $state.go("login");
                    },

                    function (err) {
                        $rootScope.showToast("Error occurred, try again :" + JSON.stringify(err));
                    }
                );


            //$state.go("app.home");
        }
    })

    .controller('NewsCtrl', function ($scope, $state, $rootScope, $timeout, $ionicPlatform, $cordovaClipboard, $interval, AppService, FeedUrls, Iso3116CountryCodes, Utility) {


        $scope.addMoreNews = function () {
            $state.go("app.directory");
        };

        //listen refresh button
        $scope.doRefresh = function () {
            loadFeed();
        };

        $scope.feeds = [];

        //load rss feed
        var loadFeed = function () {
            $rootScope.$broadcast('loading:show');

            $scope.feeds = [];
            AppService.newsFeed().then(
                function (res) {
                    if (res && res.data) {
                        const items = new ParseYawnGet().rootObject(res).data.Items;
                        if (items.length == 0) {
                            alert('No news, please add some news sources');
                            $state.go("app.directory");
                        } else {
                            console.log("Rendering news items");
                            items.forEach(function (element) {
                                element.feedItemVisible = true;
                                element.title = element.title.replace(/[|&;$%@"<>()+,]/g, "");
                                element.description = element.content;
                                element.source = element.title;
                            });

                            // items.sort(function (a, b) {//http://stackoverflow.com/questions/4222690/sorting-a-json-object-in-javascript
                            //         var a1st = 1; // negative value means left item should appear first
                            //         var b1st = -1; // positive value means right item should appear first
                            //         var equal = 0; // zero means objects are equal
                            //
                            //         if (b.shocks < a.shocks) {
                            //             return b1st;
                            //         }
                            //         else if (a.shocks < b.shocks) {
                            //             return a1st;
                            //         }
                            //         else {
                            //             return equal;
                            //         }
                            //     }
                            // );
                            $scope.feeds = items;
                            $scope.$digest();
                            console.log("Done rendering news items.");
                            $rootScope.$broadcast('loading:hide');
                        }
                    } else {
                        alert('No news, pointing to directory');
                        $state.go("app.directory");
                    }
                },
                function (err) {
                    $rootScope.$broadcast('loading:hide');
                    $rootScope.showToast("Error occurred, try again" + JSON.stringify(err));
                }
            );
        };

        $scope.loadFeed = loadFeed;

        loadFeed();

        var loadFeedIfAllRead = function () {
            $timeout(function () {
                var allRead = true;

                $scope.feeds.forEach(function (element) {
                    if (element.feedItemVisible) {
                        allRead = false;
                    }
                });

                if (allRead) {
                    loadFeed();
                }

            }, 8000, true);
        };


        //Mark read
        $scope.onReadClick = function (feed) {
            window.open(feed.link, '_blank', 'location=yes');

            loadFeedIfAllRead();

            AppService.readNews(Utility.getHumanId(), feed.link)
                .then(
                    function (res) {
                        //Success
                        AppService.shareNews(Utility.getHumanId(), feed.link)
                            .then(
                                function (res) {
                                    //Success
                                },
                                function (err) {
                                    //Error
                                }
                            );
                    },
                    function (err) {
                        //Error
                    }
                );
            //'Checking for any updates (News Mute)'
        };

        //Mark read
        $scope.onUnsubscribeClick = function (feed) {
            if (confirm('Remove This News Source?')) {
                alert('Removed');
            }
        };


        //Mark mute
        $scope.onMuteClick = function (feed) {

            $timeout(function () {
                feed.feedItemVisible = false;
            }, 7000, true);

            loadFeedIfAllRead();

            AppService.muteNews(Utility.getHumanId(), feed.link)
                .then(
                    function (res) {
                    },
                    function (err) {
                        $rootScope.showTaost("Error occurred, try again" + JSON.stringify(err));
                    }
                );
        }

    })
    .directive('feedDescription', function ($timeout) {
        return {
            template: "<div ng-bind-html='feed.description'></div>",
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        console.log("Description:" + element);

                        angular.forEach(element.find("a"), function (value, index) {

                            var a = angular.element(value);

                            var href = a.attr("href");

                            a.attr("href", "intent_open_link('" + href + "');")
                                .removeAttr("href");
                        });

                    });
                }
            }
        }
    })

    .controller('DirectoryCtrl', function ($scope, $state, $rootScope, FeedUrls, $ionicSideMenuDelegate, AppService, Utility) {

        //alert(JSON.stringify(AppService.getUserLocation()));

        //Disable menu
        $ionicSideMenuDelegate.canDragContent(false);
        //Load feed urls
        $scope.feedList = FeedUrls.getIndustriesFeedsUrl();

        //On click link
        $scope.onFeedToggle = function (feed) {
            var url = feed.feeds[0];
            AppService.subscribeFeed(Utility.getHumanId(), url)
                .then(
                    function (res) {
                        $state.go("app.news");
                    },
                    function (err) {
                        alert(JSON.stringify(err));
                    }
                );
        }

    })
    .config(function ($provide) {
        $provide.decorator('$log', function ($delegate, $sniffer) {
            var _log = $delegate.log; //Saving the original behavior

            $delegate.log = function (message) {
            };
            $delegate.error = function (message) {
                alert(message);
            };

            return $delegate;
        });
    })

;
