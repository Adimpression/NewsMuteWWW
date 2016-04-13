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
        
        root.getAccessKey = function () {
            return window.localStorage['accessKey'];
        };

        root.SetAccessKey = function (accessKey) {
            window.localStorage['accessKey'] = accessKey;
        };
        
        root.getSecretKey = function () {
            return window.localStorage['secretKey'];
        };

        root.SetSecretKey = function (secretKey) {
            window.localStorage['secretKey'] = secretKey;
        };

        root.setToken = function (token) {
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

        root.getHumanId = function () {
            return window.localStorage['humanIdHash'];
        };

        root.clearSession = function () {
            window.localStorage.removeItem('humanIdHash');
            window.localStorage.removeItem('accessKey');
            window.localStorage.removeItem('secretKey');
            window.localStorage.removeItem('token');
        };

        root.isValidURL = (function () {// wrapped in self calling function to prevent global pollution

            //URL pattern based on rfc1738 and rfc3986
            var rg_pctEncoded = "%[0-9a-fA-F]{2}";
            var rg_protocol = "(http|https):\\/\\/";

            var rg_userinfo = "([a-zA-Z0-9$\\-_.+!*'(),;:&=]|" + rg_pctEncoded + ")+" + "@";

            var rg_decOctet = "(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])"; // 0-255
            var rg_ipv4address = "(" + rg_decOctet + "(\\." + rg_decOctet + "){3}" + ")";
            var rg_hostname = "([a-zA-Z0-9\\-\\u00C0-\\u017F]+\\.)+([a-zA-Z]{2,})";
            var rg_port = "[0-9]+";

            var rg_hostport = "(" + rg_ipv4address + "|localhost|" + rg_hostname + ")(:" + rg_port + ")?";

            // chars sets
            // safe           = "$" | "-" | "_" | "." | "+"
            // extra          = "!" | "*" | "'" | "(" | ")" | ","
            // hsegment       = *[ alpha | digit | safe | extra | ";" | ":" | "@" | "&" | "=" | escape ]
            var rg_pchar = "a-zA-Z0-9$\\-_.+!*'(),;:@&=";
            var rg_segment = "([" + rg_pchar + "]|" + rg_pctEncoded + ")*";

            var rg_path = rg_segment + "(\\/" + rg_segment + ")*";
            var rg_query = "\\?" + "([" + rg_pchar + "/?]|" + rg_pctEncoded + ")*";
            var rg_fragment = "\\#" + "([" + rg_pchar + "/?]|" + rg_pctEncoded + ")*";

            var rgHttpUrl = new RegExp(
                "^"
                + rg_protocol
                + "(" + rg_userinfo + ")?"
                + rg_hostport
                + "(\\/"
                + "(" + rg_path + ")?"
                + "(" + rg_query + ")?"
                + "(" + rg_fragment + ")?"
                + ")?"
                + "$"
            );

            // export public function
            return function (url) {
                return rgHttpUrl.test(url);
            };
        })();


        //
        //root.d = function(alertText) {
        //    if (debug) {
        //        try {
        //            //alert(alertText);
        //            notifyShort(alertText);
        //        } catch (e) {
        //            alert(alertText);//In case the toast plugin fails
        //        }
        //    }
        //    return alertText;
        //};
        //
        //root.f = function(fun) {
        //    return function () {
        //        if (debug) {
        //            try {
        //                return fun.apply(this, arguments);
        //            } catch (e) {
        //                root.d(arguments.callee.caller.toString() + "\n encountered an error invoking a function \n" + "\nDetails as follows:\n" + e +"\nFunction:\n" + (fun ? functionName(fun) : 'undefined'));
        //                return null;
        //            }
        //        } else {
        //            return fun.apply(this, arguments);
        //        }
        //    };
        //};
        //
        //root.j = function(alertJSON) {
        //    if (debug) {
        //        try {
        //            notifyShort(JSON.stringify(alertJSON));
        //        } catch (e) {
        //            alert(JSON.stringify(alertJSON));//In case the toast plugin fails
        //        }
        //    }
        //    return alertJSON;
        //};


        root.functionName = function(fun) {
            var ret = fun.toString();
            ret = ret.substr('function '.length);
            ret = ret.substr(0, ret.indexOf('('));
            return ret;
        };


        root.getUrlParameter = function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        };

        root.getUrlParameter = function (name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        };


        root.intent_open_link = function(link) {
            window.open(link, '_blank', 'location=yes');
            return false;
        };

        root.safeApply = function(scope, fn) {
            (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
        };

        return root;
    });


