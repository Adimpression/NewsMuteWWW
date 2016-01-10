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
        $scope.user =
        {
            email: "ravindranathakila@gmail.com",
            password: "wwwwww"
        };

        $scope.login = function () {

            Utility.clearSession();

            ////Validation
            if (Utility.isEmpty($scope.user.email) || (!Utility.isValidEmail($scope.user.email))) {
                $rootScope.showToast("Please enter email");
                return;
            }

            if (Utility.isEmpty($scope.user.password)) {
                $rootScope.showToast("Please enter password ");
                return;
            }

            //Login
            var username = CryptoJS.SHA512($scope.user.email).toString();
            var password = CryptoJS.SHA512($scope.user.password).toString();

            console.log(username.toString());
            console.log(password.toString());

            AppService.login(username, password)
                .then(
                function (response) {
                    try {
                        var returnData = response.data.returnValue.data[0];
                        $log.log(JSON.stringify(response.data));
                        if (returnData.status == "OK") {
                            //Set token
                            Utility.setToken(returnData.tokenHash);
                            Utility.setHumanId(returnData.humanIdHash);

                            $state.go("app.news");
                        }
                        else {
                            $rootScope.showToast(response.data.returnMessage);
                        }
                    }
                    catch (ex) {
                        $log.log("Login => Error : " + JSON.stringify(ex));
                    }
                },

                function (err) {
                    $rootScope.showToast("Error occurred, try again :" + JSON.stringify(err));
                }
            )
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

        AppService.getUserLocation().then(
            function (res) {

                var iso3116CountryCodes = Iso3116CountryCodes.getIso3116CountryCodes();

                iso3116CountryCodes.forEach(
                    function (countryJson) {
                        if (countryJson["alpha-2"] == res.data.country) {
                            FeedUrls.getCountriesFeedUrl().forEach(function (ourCountry) {
                                if (ourCountry.title.toLowerCase().match(countryJson.name.toLowerCase())) {
                                    ourCountry.feeds.forEach(function (feed) {
                                        AppService.subscribeFeed(Utility.getHumanId(), feed);
                                    })
                                }
                            });
                        }
                    }
                );

                //alert(JSON.stringify(res));
            },
            function (err) {
                //alert(JSON.stringify(err));
            }
        );

        $scope.haURL = false;
        $scope.comments = "";

        var theURL = "";

        var isURL = function (s) {
            //Credit: http://stackoverflow.com/a/3809435
            var expr = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
            var regex = new RegExp(expr);
            var result = s.match(regex);
            if (result) return true;
            return false;
        };

        var checkForURL = function () {
            console.log('Checking the clipboard...');
            $cordovaClipboard
                .paste()
                .then(function (result) {
                    console.log(result);
                    if (result && isURL(result)) {
                        $scope.hasURL = true;
                        theURL = result;
                    } else {
                        $scope.hasURL = false;
                        console.log('No url');
                    }
                }, function (e) {
                    // error - do nothing cuz we don't care
                });

        };


        $ionicPlatform.ready(function () {
            $interval(checkForURL, 4 * 1000);
        });


        $scope.pasteURL = function () {
            console.log("Paste " + theURL);
            $scope.comments += theURL;
            //remove from clippboard
            $cordovaClipboard.copy('').then(function () {
                $scope.theURL = '';
            }, function () {
                // error
            });
            $scope.hasURL = false;
        };


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

            $scope.feeds = [];

            AppService.newsFeed(Utility.getHumanId()).then(
                function (res) {
                    if (res && res.data && res.data.returnValue && res.data.returnValue.data) {

                        const items = res.data.returnValue.data;

                        if (items.length == 0) {
                            alert('No news, please add some news sources');
                            $state.go("app.directory");
                        } else {
                            items.forEach(function (element) {
                                element.feedItemVisible = true;
                                element.title = element.title.replace(/[|&;$%@"<>()+,]/g, "");
                            });
                            items.sort(function (a, b) {//http://stackoverflow.com/questions/4222690/sorting-a-json-object-in-javascript
                                    var a1st = 1; // negative value means left item should appear first
                                    var b1st = -1; // positive value means right item should appear first
                                    var equal = 0; // zero means objects are equal

                                    if (b.shocks < a.shocks) {
                                        return b1st;
                                    }
                                    else if (a.shocks < b.shocks) {
                                        return a1st;
                                    }
                                    else {
                                        return equal;
                                    }
                                }
                            );

                            $scope.feeds = items;
                        }

                    } else {
                        alert('No news, pointing to directory');
                        $state.go("app.directory");
                    }
                },
                function (err) {
                    $rootScope.showTaost("Error occurred, try again" + JSON.stringify(err));
                }
            ).finally(
                function () {
                    $scope.$broadcast('scroll.refreshComplete');
                }
            )
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

;
