//const debug = false;
const debug = true;

const str_choice = 'choice';
const str_choice_class = '.choice';


const spinner = spinner = new Spinner({
    lines: 17, // The number of lines to draw
    length: 0, // The length of each line
    width: 2, // The line thickness
    radius: 24, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#aaa', // #rgb or #rrggbb or array of colors
    speed: 1.3, // Rounds per second
    trail: 100, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
}).spin(document.getElementById('Busy'));

function busy() {
    spinner.spin(document.getElementById('Busy'));
    render($Busy);
}

function free() {
    spinner.stop();
}


function notifyLong(message) {
    window.plugins.toast.showLongBottom(message);
}

function notifyShort(message) {
    window.plugins.toast.showShortBottom(message);
}


//http://docs.phonegap.com/en/1.8.1/cordova_connection_connection.md.html#connection.type
function isConnected() {
    return true;
//    var networkState = navigator.network.connection.type;
//
//    var states = {};
//    states[Connection.UNKNOWN]  = 'Unknown connection';
//    states[Connection.ETHERNET] = 'Ethernet connection';
//    states[Connection.WIFI]     = 'WiFi connection';
//    states[Connection.CELL_2G]  = 'Cell 2G connection';
//    states[Connection.CELL_3G]  = 'Cell 3G connection';
//    states[Connection.CELL_4G]  = 'Cell 4G connection';
//    states[Connection.NONE]     = 'No network connection';
//
    //alert('Connection type: ' + states[networkState]);
//
//    return networkState != Connection.NONE;
}

function get_session_value() {
    return  window.localStorage.getItem("x-session-header");
}


function get_hash(value) {
    return CryptoJS.SHA512(value);
}

function d(alertText) {
    if (debug) {
        try {
            //alert(alertText);
            notifyShort(alertText);
        } catch (e) {
            alert(alertText);//In case the toast plugin fails
        }
    }
    return alertText;
}

function f(fun) {
    return function () {
        if (debug) {
            try {
                return fun.apply(this, arguments);
            } catch (e) {
                d(arguments.callee.caller.toString() + "\n encountered an error invoking function \n" + (fun ? functionName(fun) : 'undefined') + "\nDetails as follows:\n" + e);
                return null;
            }
        } else {
            return fun.apply(this, arguments);
        }
    };
}

function j(alertJSON) {
    if (debug) {
        try {
            notifyShort(JSON.stringify(alertJSON));
        } catch (e) {
            alert(JSON.stringify(alertJSON));//In case the toast plugin fails
        }
    }
    return alertJSON;
}


function functionName(fun) {
    var ret = fun.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
}


function choose(id) {
    const $id = $('#' + id);
    $choose($id);
}

function $choose($id){
    if ($id.hasClass(str_choice)) {
        $id.siblings(str_choice_class).hide();
        $id.show();
    } else {
        alert('Please add class chose to element\n' + $id.attr('id'));
    }
    $id.parents(str_choice_class).each(function(){
        if(!$(this).is(":visible")){
            d('SHOW:' + this.id + ' BECAUSE:' + $id.attr('id'));
            $(this).siblings(str_choice_class).hide();
            $(this).show();
        }
    });
}


window.isValidURL = (function () {// wrapped in self calling function to prevent global pollution

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

/*
 ===============================================================================
 Crc32 is a JavaScript function for computing the CRC32 of a string
 ...............................................................................

 Version: 1.2 - 2006/11 - http://noteslog.com/category/javascript/

 -------------------------------------------------------------------------------
 Copyright (c) 2006 Andrea Ercolino
 http://www.9opensource.org/licenses/mit-license.php
 ===============================================================================
 */

(function () {
    var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";

    /* Number */
    crc32 = function (/* String */ str, /* Number */ crc) {
        if (crc == window.undefined) crc = 0;
        var n = 0; //a number between 0 and 255
        var x = 0; //an hex number

        crc = crc ^ (-1);
        for (var i = 0, iTop = str.length; i < iTop; i++) {
            n = ( crc ^ str.charCodeAt(i) ) & 0xFF;
            x = "0x" + table.substr(n * 9, 8);
            crc = ( crc >>> 8 ) ^ x;
        }
        return crc ^ (-1);
    };
})();
