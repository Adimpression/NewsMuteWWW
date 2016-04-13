angular.module('app.utility', [])

    .factory('Utility', function ($window, $http) {
        var root = {};

        root.isValidEmail = function (email) {
            console.log("root.isValidEmail");
            return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email)
        };

        root.isValidNumber = function (text) {
            console.log("root.isValidNumber");
            return !/\D/.test(text)
        };

        root.isEmpty = function (data) {
            console.log("root.isEmpty");
            if (typeof(data.length) != 'undefined') {
                if (/^[\s]*$/.test(data.toString())) {
                    return true;
                }
                return data.length == 0;
            }
        };

        root.getAccessKey = function () {
            console.log("root.getAccessKey");
            return window.localStorage['accessKey'];
        };

        root.setAccessKey = function (accessKey) {
            console.log("root.setAccessKey");
            window.localStorage['accessKey'] = accessKey;
        };

        root.getSecretKey = function () {
            console.log("root.getSecretKey");
            return window.localStorage['secretKey'];
        };

        root.setSecretKey = function (secretKey) {
            console.log("root.setSecretKey");
            window.localStorage['secretKey'] = secretKey;
        };

        root.setSessionToken = function (sessionToken) {
            console.log("root.setSessionToken");
            window.localStorage['sessionToken'] = sessionToken;
        };

        root.getSessionToken = function () {
            console.log("root.getSessionToken");
            return window.localStorage['sessionToken'];
        };

        root.setToken = function (token) {
            console.log("root.setToken");
            window.localStorage['token'] = token;
        };

        root.getToken = function () {
            console.log("root.getToken");
            return window.localStorage['token'];
        };

        root.setHumanId = function (humanIdHash) {
            console.log("root.setHumanId");
            window.localStorage['humanIdHash'] = humanIdHash;
        };

        root.getHumanId = function () {
            console.log("root.getHumanId");
            return window.localStorage['humanIdHash'];
        };

        root.clearSession = function () {
            console.log("root.clearSession");
            window.localStorage.removeItem('humanIdHash');
            window.localStorage.removeItem('accessKey');
            window.localStorage.removeItem('secretKey');
            window.localStorage.removeItem('token');
        };

        root.isValidURL = (function () {// wrapped in self calling function to prevent global pollution
            console.log("root.isValidURL");

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

        root.functionName = function (fun) {
            console.log("root.functionName");
            var ret = fun.toString();
            ret = ret.substr('function '.length);
            ret = ret.substr(0, ret.indexOf('('));
            return ret;
        };


        root.getUrlParameter = function (name) {
            console.log("root.getUrlParameter");
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        };

        root.getUrlParameter = function (name, url) {
            console.log("root.getUrlParameter");
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        };


        root.intent_open_link = function (link) {
            console.log("root.intent_open_link");
            window.open(link, '_blank', 'location=yes');
            return false;
        };

        root.safeApply = function (scope, fn) {
            console.log("root.safeApply");
            (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
        };

        return root;
    });


