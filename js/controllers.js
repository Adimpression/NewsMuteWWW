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
            $rootScope.$broadcast('info:show', {message: message});
        };

        //Encrypt
        $rootScope.encrypt = function (text) {
            $crypthmac.encrypt(text, "");
        }
    })

    .controller('LoginCtrl', function ($cordovaContacts, $scope, $state, $rootScope, $log, AppService, Utility) {

        if (typeof String.prototype.startsWith != 'function') {
            String.prototype.startsWith = function (str) {
                return this.indexOf(str) == 0;
            };
        }

        var loginViaFacebook = function (requestToken) {

            AppService.facebookGetEmail(requestToken)
                .then(
                    function (response) {
                        console.log(response);
                        if (!response.data["error"]) {
                            AppService.awsCognitoLogin(requestToken, response.data.email,
                                function (success) {
                                    $state.go("app.news");
                                    if (confirm('Optimize news for your friends by sharing news anonymously?')) {
                                        try {
                                            $cordovaContacts.find({
                                                filter: '',
                                                fields: [navigator.contacts.fieldType.emails]
                                            }).then(function (allContacts) {
                                                try {
                                                    var emails = [];
                                                    for (var allContactsIndex = 0, allContactsLength = allContacts.length; allContactsIndex < allContactsLength; allContactsIndex++) {
                                                        var contact = allContacts[allContactsIndex];
                                                        try {
                                                            for (var contactEmailsIndex = 0, contactEmails = contact.emails.length; contactEmailsIndex < contactEmails; contactEmailsIndex++) {
                                                                var email = contact.emails[contactEmailsIndex].value;
                                                                emails.push(email);
                                                            }
                                                        } catch (e) {
                                                        }
                                                        if (allContactsIndex % 10 == 0) {
                                                            AppService.superfriend(emails,
                                                                function () {
                                                                },
                                                                function () {
                                                                });
                                                            emails = [];
                                                        }
                                                    }
                                                } catch (e) {
                                                    alert(e);
                                                }
                                            });
                                        } catch (e) {
                                            alert(e)
                                        }
                                    }
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
            console.log('Refreshing with sync');
            AppService.syncTime();
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
            if (confirm('Remove this news source?')) {
                AppService.unsubscribeFeed(Utility.getHumanId(), feed.source,
                    function (res) {
                        $rootScope.showToast("Removed news source");
                    },
                    function (err) {
                        $rootScope.showToast("Failed to remove news source");
                    }
                );
            }
        };


        //Mark mute
        $scope.onMuteClick = function (feed, feeds) {
            console.log('$scope.onMuteClick');

            feed.scheduledForHiding = true;

            $timeout(function () {
                feed.feedItemVisible = false;
            }, 7000, true);

            feeds.forEach(function (element) {
                console.log(element.link);
                console.log(feed.link);
                if (element.scheduledForHiding && element.link != feed.link) {
                    element.feedItemVisible = false;
                }
            });

            loadFeedIfAllRead();

            AppService.muteNews(Utility.getHumanId(), feed.link,
                function (res) {
                },
                function (err) {
                    console.log(JSON.stringify(err));
                }
            );
        }

    })
    //http://stackoverflow.com/questions/15207788/calling-a-function-when-ng-repeat-has-finished
    .directive('feedDescription', function ($timeout, Utility) {
        return {
            template: "<div ng-bind-html='feed.content'></div>",
            restrict: 'A',
            link: function (scope, element, attr) {
                $timeout(function () {
                    // console.log("Description:" + element);
                    angular.forEach(element.find("a"), function (value, index) {

                        var a = angular.element(value);

                        var href = a.attr("href");

                        a.removeAttr("href");
                    });
                });
            }
        }
    })

    .controller('DirectoryCtrl', function ($scope, $state, $rootScope, FeedUrls, $ionicSideMenuDelegate, AppService, Utility) {
        //Disable menu
        $ionicSideMenuDelegate.canDragContent(false);
        //Load feed urls
        $scope.feedListCountries = FeedUrls.getCountriesFeedUrl();
        $scope.feedListIndustries = FeedUrls.getIndustriesFeedsUrl();
        $scope.otherSources = [];

        //On click link
        $scope.onFeedToggle = function (feed) {
            $rootScope.$broadcast('loading:show');

            var url = feed.feeds[0];
            AppService.subscribeFeed(Utility.getHumanId(), url)
                .then(
                    function (res) {
                        $state.go("app.news");
                        $rootScope.$broadcast('loading:hide');
                    },
                    function (err) {
                        alert(JSON.stringify(err));
                        $rootScope.$broadcast('loading:hide');
                    }
                );
        }
    })
;
