angular.module('app.newsmute', ['ionic', 'ionic.service.core', 'app.controllers', 'app.factory', 'app.feedurls', 'app.iso3116CountryCodes', 'app.services', 'ngCordova'])

    .run(function ($ionicPlatform, $rootScope, $ionicLoading, $timeout) {
        $ionicPlatform.ready(function () {

            //Show loading
            $rootScope.$on('loading:show', function () {
                $ionicLoading.show(
                    {
                        template: '<h3>Control your news!</h3><b>Touch</b> to read or <b>Swipe Right</b> to ignore<br/><ion-spinner icon="lines"></ion-spinner><br/>Loading, please wait'
                    }
                )
            });
            //Hide loading
            $rootScope.$on('loading:hide', function () {
                $ionicLoading.hide()
            });

            //Show loading
            $rootScope.$on('error:show', function (event, error) {
                var errorString = error.toString().substring(0, 10);

                $ionicLoading.show(
                    {
                        template: '<h3>An error occured</h3><ion-spinner icon="lines"></ion-spinner><br/>' + errorString
                    }
                );

                $timeout(function () {
                    $ionicLoading.hide();
                }, 3000);

            });

            //Show loading
            $rootScope.$on('info:show', function (event, args) {
                $ionicLoading.show(
                    {
                        template: '&nbsp;&nbsp;&nbsp;<h3>' + args.message + '</h3>&nbsp;&nbsp;&nbsp;'
                    }
                );

                $timeout(function () {
                    $ionicLoading.hide();
                }, 3000);
            });

        });
    })

    .config(function ($httpProvider, $ionicConfigProvider) {
        $ionicConfigProvider.platform.android.views.maxCache(5);
    })


    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('login', {
                url: "/login",
                templateUrl: "templates/login.html",
                controller: 'LoginCtrl'
            })

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.news', {
                url: "/news",
                views: {
                    'menuContent': {
                        templateUrl: "templates/news.html",
                        controller: 'NewsCtrl'
                    }
                }
            })

            .state('app.directory', {
                url: "/directory",
                views: {
                    'menuContent': {
                        templateUrl: "templates/directory.html",
                        controller: 'DirectoryCtrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('/login');
    })
;
