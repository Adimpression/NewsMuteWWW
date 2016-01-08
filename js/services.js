'use strict';

angular.module('app.services', [])

    .service('AppService', function ($http) {

        var REGISTER_URL = "http://guardian.newsmute.com:40700/?"
        var LOGIN_URL = "http://guardian.newsmute.com:50200/?";
        var SUBSCRIBE_URL = "http://stalk.newsmute.com:16285/?";
        var NEWS_FEED_URL = "http://yawn.newsmute.com:40200/?";
        var NEWS_SHARE_URL = "http://scream.newsmute.com:30200/?";

        this.register = function (username, password, email) {
            return $http({
                method: 'GET',
                url: REGISTER_URL + "user=" + username + "&token=" + password + "&nmact=CREATE&email=" + email
            });
        };

        this.login = function (username, password) {
            return $http({
                method: 'GET',
                headers: {
                    Accept: "text/plain"
                },
                url: LOGIN_URL,
                params: {
                    user: username,
                    token: password,
                    nmact: "READ"
                }
            });
        };

        this.subscribeFeed = function (username, url) {
            return $http({
                method: 'GET',
                headers: {
                    'x-session-header': window.localStorage['humanIdHash']
                },
                url: SUBSCRIBE_URL + "user=" + username + "&url=" + url + "&nmact=CREATE"
            });
        };

        this.newsFeed = function (username) {
            return $http({
                method: 'GET',
                headers: {
                    'x-session-header': window.localStorage['humanIdHash']
                },
                url: NEWS_FEED_URL + "user=" + username + "&nmact=READ"
            });
        };

        this.readNews = function (username, url) {
            return $http({
                method: 'GET',
                headers: {
                    'x-session-header': window.localStorage['humanIdHash']
                },
                url: NEWS_FEED_URL + "user=" + username + "&nmact=DELETE&url=" + url
            });
        };

        this.muteNews = function (username, url) {
            return $http({
                method: 'GET',
                headers: {
                    'x-session-header': window.localStorage['humanIdHash']
                },
                url: NEWS_FEED_URL + "user=" + username + "&nmact=DELETE&url=" + url
            });
        };

        this.shareNews = function (username, url) {
            return $http({
                method: 'GET',
                headers: {
                    'x-session-header': window.localStorage['humanIdHash']
                },
                url: NEWS_SHARE_URL + "user=" + username + "&url=" + url
            });
        };

        this.getUserLocation = function () {

            return $http({
                method: 'GET',
                url: "http://ipinfo.io"
            });
        }


    });
