angular.module('app.controllers', ['angular-hmac-sha512', 'app.utility'])

    .controller('AppCtrl', function ($scope, $state, $rootScope, $crypthmac, Utility, $ionicPopup) {

        $rootScope.logout = function () {
            //Take confirmation
            var confirmPopup = $ionicPopup.confirm({
                title: 'Logout',
                template: 'Are you sure you want to logout?'
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
            email: "",
            password: ""
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

            console.log($scope.user.email);
            console.log($scope.user.password);

            //Login
            var username = CryptoJS.SHA512($scope.user.email);
            var password = CryptoJS.SHA512($scope.user.password);

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

    .controller('NewsCtrl', function ($scope, $rootScope, AppService, Utility) {

        //listen refresh button
        $scope.doRefresh = function () {
            loadFeed();
        };

        $scope.feeds = [];

        //load rss feed
        var loadFeed = function () {
            $scope.feeds = [];
            AppService.newsFeed(Utility.getHumanId())
                .then(
                function (res) {
                    if (res && res.data && res.data.returnValue && res.data.returnValue.data) {

                        const items = res.data.returnValue.data;

                        items.forEach(function (element) {
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
                },
                function (err) {
                    $rootScope.showTaost("Error occurred, try again" + JSON.stringify(err));
                }
            );
        };

        loadFeed();


        //Mark read
        $scope.onReadClick = function (feed) {
            window.open(feed.link, '_blank', 'location=yes');
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

        $scope.feedItem = true;

        //Mark mute
        $scope.onMuteClick = function (feed) {
            AppService.muteNews(Utility.getHumanId(), feed.link)
                .then(
                function (res) {
                    //$scope.feedItem = false;
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


        alert(JSON.stringify(AppService.getUserLocation()));

        //Disable menu
        $ionicSideMenuDelegate.canDragContent(false);
        //Load feed urls
        $scope.feedList = FeedUrls.getIndustriesFeedsUrl();

        //On click link
        $scope.onFeedToggle = function (feed) {
            //subcribe for feed
            if (feed.checked) {
                var url = feed.feeds[0];
                AppService.subscribeFeed(Utility.getHumanId(), url)
                    .then(
                    function (res) {
                        //alert(JSON.stringify(res));
                        //$rootScope.showToast("Subscribed successfully");
                    },
                    function (err) {
                        alert(JSON.stringify(err));
                    }
                );

            }
            //TODO: Unsubcribe
            //$state.go("app.news",{feedUrl : feed.feeds[0]});
        }

    })

;
