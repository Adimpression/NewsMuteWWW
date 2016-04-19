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


        AppService.awsCognitoCachedLogin(function () {
            $state.go("app.news");
        }, function () {
            loginViaFacebook(Utility.getToken());
        });

        $scope.login = function () {
            var clientId = '174714512893777';

            var requestToken;

            var ref = window.open('https://www.facebook.com/dialog/oauth?' +
                'client_id=' + clientId + '&' +
                'response_type=token&' +
                'scope=email&' +
                'redirect_uri=http://localhost/callback&' +
                'state=' + new Date().getTime() + '&' +
                'approval_prompt=force&'
                , '_blank', 'location=yes');

            ref.addEventListener('loaderror', function (event) {
                alert(event.url);
                if ((event.url).startsWith("http://localhost")) {
                    requestToken = Utility.getUrlParameter("access_token", event.url);
                    ref.close();
                    loginViaFacebook(requestToken);
                    Utility.setToken(requestToken);
                }
            });

            var didDetectPopup = function () {
                if (requestToken == null) {
                    requestToken = prompt("Unable to detect popup window. Please paste a Facebook Access Token here");
                    loginViaFacebook(requestToken);
                    Utility.setToken(requestToken);
                }
            };

            setTimeout(didDetectPopup, 10000);
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
                            $rootScope.$broadcast('loading:hide');
                            $state.go("app.directory");
                        } else {
                            console.log("Rendering news items");
                            items.forEach(function (element) {
                                element.feedItemVisible = true;
                                element.title = element.title.replace(/[|&;$%@"<>()+,]/g, "");
                                element.description = element.content;
                                element.source = element.title;
                                element.link = element.ref;
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
            console.log('$scope.onReadClick');
            console.log('Opening link:' + feed.link);

            window.open(feed.link, '_blank', 'location=yes');

            loadFeedIfAllRead();

            AppService.muteNews(Utility.getHumanId(), feed.link,
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
            console.log("$scope.onUnsubscribeClick");
            if (confirm('Remove This News Source?')) {
                AppService.unsubscribeFeed(Utility.getHumanId(), feed.link,
                    function (res) {
                        $rootScope.showToast("Removed");
                    },
                    function (err) {
                    }
                );
            }
        };


        //Mark mute
        $scope.onMuteClick = function (feed) {
            console.log('$scope.onMuteClick');

            $timeout(function () {
                feed.feedItemVisible = false;
            }, 7000, true);

            loadFeedIfAllRead();

            AppService.muteNews(Utility.getHumanId(), feed.link,
                function (res) {
                },
                function (err) {
                    $rootScope.showToast("Error occurred, try again" + JSON.stringify(err));
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
