'use strict';

angular.module('app.services', [])

    .service('AppService', function ($http) {

        var REGISTER_URL = "http://guardian.newsmute.com:40700/?";
        var GRAPH_API_EMAIL = "https://graph.facebook.com/v2.5/me";
        var SUBSCRIBE_URL = "http://stalk.newsmute.com:16285/?";
        var NEWS_FEED_URL = "http://yawn.newsmute.com:40200/?";
        var NEWS_SHARE_URL = "http://scream.newsmute.com:30200/?";

        this.register = function (username, password, email) {
            return $http({
                method: 'GET',
                url: REGISTER_URL,
                params: {
                    user: username,
                    token: password,
                    nmact: "CREATE",
                    email: email
                }
            });
        };

        this.facebookGetEmail = function (token) {
            return $http({
                method: 'GET',
                url: GRAPH_API_EMAIL,
                params: {
                    access_token: token,
                    fields: 'email'
                }
            });
        };

        this.subscribeFeed = function (username, url) {
            return $http({
                method: 'GET',
                headers: {
                    'x-session-header': window.localStorage['humanIdHash']
                },
                url: SUBSCRIBE_URL,
                params: {
                    user: username,
                    url: url,
                    nmact: "CREATE"
                }
            });
        };

        this.newsFeed = function (username) {
            return $http({
                method: 'GET',
                headers: {
                    'x-session-header': window.localStorage['humanIdHash']
                },
                url: NEWS_FEED_URL,
                params: {
                    user: username,
                    nmact: "READ"
                }
            });
        };

        this.readNews = function (username, url) {
            return $http({
                method: 'GET',
                headers: {
                    'x-session-header': window.localStorage['humanIdHash']
                },
                url: NEWS_FEED_URL,
                params: {
                    user: username,
                    nmact: "DELETE",
                    url: url
                },
                timeout:1000
            });
        };

        this.muteNews = function (username, url) {
            return $http({
                method: 'GET',
                headers: {
                    'x-session-header': window.localStorage['humanIdHash']
                },
                url: NEWS_FEED_URL,
                params: {
                    user: username,
                    nmact: "DELETE",
                    url: url
                },
                timeout:2000
            });
        };

        this.shareNews = function (username, url) {
            return $http({
                method: 'GET',
                headers: {
                    'x-session-header': window.localStorage['humanIdHash']
                },
                url: NEWS_SHARE_URL,
                params: {
                    user: username,
                    url: url
                }
            });
        };

        this.getUserLocation = function () {

            return $http({
                method: 'GET',
                url: "http://ipinfo.io"
            });
        }


    });
