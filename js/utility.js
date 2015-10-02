'use strict';

angular.module('app.utility', [])

    .factory('Utility', function ($window, $http) {
        var root = {};

        //Is valid email id
        root.isValidEmail = function (email) {
            var exp = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return exp.test(email)
        };

        //Is Numeric Number
        root.isValidNumber = function (text) {
            var exp = /\D/; //If cotain any non numeric item
            return !exp.test(text)
        };

        root.isEmpty = function (data) {
            if (typeof(data.length) != 'undefined') {
                if (/^[\s]*$/.test(data.toString())) {
                    return true;
                }
                return data.length == 0;
            }
        };
        root.getDeviceId = function () {
            return window.localStorage['did'];
        };

        root.setDeviceId = function (deviceId) {
            window.localStorage['did'] = deviceId;
        };

        root.setToken = function (token) {
            $http.defaults.headers.common["x-session-header"] = token;
            window.localStorage['token'] = token;
        };

        root.getToken = function () {
            return window.localStorage['token'];
        };

        root.setHumanId = function (humanIdHash) {
            window.localStorage['humanIdHash'] = humanIdHash;
        };

        root.getHumanId = function () {
            return window.localStorage['humanIdHash'];
        };

        root.clarSesion = function () {
            window.localStorage['humanIdHash'] = "";
            window.localStorage['token'] = "";
            $http.defaults.headers.common["x-session-header"] = "";
        };


        return root;
    });

