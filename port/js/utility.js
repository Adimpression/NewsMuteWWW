angular.module('app.utility', [])

    .factory('Utility', function ($window, $http) {
        var root = {};

        root.isMobile = (function () {
            var check = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        })();

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

        root.setHumanId = function (humanId) {
            console.log("root.setHumanId");
            window.localStorage['humanId'] = humanId;
        };

        root.getHumanId = function () {
            console.log("root.getHumanId");
            return window.localStorage['humanId'];
        };

        root.setEmail = function (humanId) {
            console.log("root.setEmail");
            window.localStorage['email'] = humanId;
        };

        root.getEmail = function () {
            console.log("root.getEmail");
            return window.localStorage['email'];
        };

        root.setPassword = function (humanId) {
            console.log("root.setPassword");
            window.localStorage['password'] = humanId;
        };

        root.getPassword = function () {
            console.log("root.getPassword");
            return window.localStorage['password'];
        };

        root.clearSession = function () {
            console.log("root.clearSession");
            //window.localStorage.removeItem('humanId');
            window.localStorage.removeItem('accessKey');
            window.localStorage.removeItem('secretKey');
            window.localStorage.removeItem('token');
        };

        root.isMobileApp = function () {
            return document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1
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


