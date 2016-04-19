// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app.newsmute', ['ionic', 'ionic.service.core', 'app.controllers', 'app.factory', 'app.feedurls', 'app.iso3116CountryCodes', 'app.services', 'ngCordova'])

    .run(function ($ionicPlatform, $rootScope, $ionicLoading) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            //if (window.cordova && window.cordova.plugins.Keyboard) {
            //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            //}
            //
            //if (window.StatusBar) {
            //    org.apache.cordova.statusbar required
            //StatusBar.styleDefault();
            //}

            //Show loading
            $rootScope.$on('loading:show', function () {
                $ionicLoading.show(
                    {
                        template: '<h3>Control your news!</h3><ion-spinner icon="lines"></ion-spinner><br/><br/><b>Touch</b> to read or <b>Swipe Right</b> to ignore<br/>Loading, please wait'
                    }
                )
            });
            //Hide loading
            $rootScope.$on('loading:hide', function () {
                $ionicLoading.hide()
            })

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


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');
    })
;
