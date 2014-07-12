const $feedsList = $('#feedsList');
const $itemTemplate = $('.itemTemplate');
const $countryItemTemplate = $('.countryItemTemplate');
const $industryItemTemplate = $('.industryItemTemplate');
const $countryList = $('.countryList');
const $industryList = $('.industryList');
const $FeedSetupSubscribe = $('.FeedSetupSubscribe');
const $FeedSetupCountries = $('.FeedSetupCountries');
const $FeedSetupIndustries = $('.FeedSetupIndustries');
const $Loader = $(".Loader");
const $Login = $(".Login");
const $FeedSetup = $(".FeedSetup");
const $FeedInterface = $(".FeedInterface");
const $Inception = $(".Inception");
const $Busy = $(".Busy");

const clsItemTitle = '.itemTitle';
const clsItemSource = '.itemSource';
const clsItemDescription = '.itemDescription';
const clsItemBookmark = '.itemBookmark';
const clsItemBookmarkText = '.itemBookmarkText';
const clsItemAdvanced = '.itemAdvanced';
const clsItemHide = '.itemHide';

const strId = "id";
const strClass = "class";

const flag_super_friend = "flag_super_friend";
const flag_app_launched = "flag_app_launched";

const clearCss = "body{width:100%!important;line-height:1.4;word-spacing:1.1pt;letter-spacing:.2pt;font-family:Garamond,'Times New Roman', serif;color:#000;font-size:12pt;margin:0!important;padding:0!important;}h1,h2,h3,h4,h5,h6{font-family:Helvetica, Arial, sans-serif;}h1{font-size:19pt;}h2{font-size:17pt;}h3{font-size:15pt;}h4,h5,h6{font-size:12pt;}code{font:10pt Courier, monospace;}blockquote{font-size:10pt;margin:1.3em;padding:1em;}hr{background:#ccc;}img{float:left;margin:1em 1.5em 1.5em 0;}a img{border:none;}a:link,a:visited{font-weight:700;text-decoration:underline;color:#333;}a:link[href^=http://]:after,a[href^=http://]:visited:after{content:' (' attr(href) ') ';font-size:90%;}a[href^=http://]{color:#000;}table{text-align:left;margin:1px;}th{border-bottom:1px solid #333;font-weight:700;}td{border-bottom:1px solid #333;}th,td{padding:4px 10px 4px 0;}tfoot{font-style:italic;}caption{margin-bottom:2em;text-align:left;background:#fff;}thead{display:table-header-group;}tr{page-break-inside:avoid;}";

Object.defineProperty(window, 'humanId', {
    get: function () {
        return window.localStorage.getItem('humanId');
    },
    set: function (humanId) {
        window.localStorage.setItem('humanId', humanId);
    }
});

var feedRefreshTimeout;
var isFirstWake = true;

const Country_Global_ABC = 'http://feeds.abcnews.com/abcnews/internationalheadlines';
const Industry_Technology_Y_Combinator = 'https://news.ycombinator.com/rss';

const industries = [
    {'title': 'SKIP THIS STEP                     ', 'feeds': []},//Don't put anything here, this is the users exit strategy in case (s)he doesn't want to chose anything
//    {'title': 'Agriculture                      ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Beverage & Tobacco               ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Accounting                       ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Advertising                      ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Aerospace                        ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Aircraft                         ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Airline                          ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Apparel & Accessories            ', 'feeds': [Industry_Technology_Y_Combinator]},
    {'title': 'Architecture                     ', 'feeds': ['http://www.apartmenttherapy.com/ahoy-rss-feed-readers-38066']},
//    {'title': 'Automotive                       ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Banking                          ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Broadcasting                     ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Brokerage                        ', 'feeds': [Industry_Technology_Y_Combinator]},
    {'title': 'Biotechnology                    ', 'feeds': ['http://www.cell.com/rssFeed/biotechnology/rss.mostread.xml']},
//    {'title': 'Chemical                         ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Consumer Products                ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Cosmetics                        ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Defense                          ', 'feeds': [Industry_Technology_Y_Combinator]},
    {'title': 'Design                           ', 'feeds': ['http://500pixels.tumblr.com/rss']},
//    {'title': 'Department Stores                ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Software                         ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Education                        ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Sports                           ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Electronics                      ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Energy                           ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Entertainment & Leisure          ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Television                       ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Executive Search                 ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Financial Services               ', 'feeds': [Industry_Technology_Y_Combinator]},
    {'title': 'Food                             ', 'feeds': ['http://www.food.com/rss?']},
//    {'title': 'Health Care                      ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Internet Publishing              ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Investment Banking               ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Legal                            ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Manufacturing                    ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Motion Picture & Video           ', 'feeds': [Industry_Technology_Y_Combinator]},
    {'title': 'Music                            ', 'feeds': ['http://www.rollingstone.com/siteServices/rss/songReviews']},
//    {'title': 'Newspaper Publishers             ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Publishing                       ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Real Estate                      ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Retail & Wholesale               ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Securities & Commodity Exchanges ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Service                          ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Soap & Detergent                 ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Technology                       ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Telecommunications               ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Transportation                   ', 'feeds': [Industry_Technology_Y_Combinator]},
//    {'title': 'Venture Capital                  ', 'feeds': [Industry_Technology_Y_Combinator]},
    {'title': 'Other Industries                 ', 'feeds': [Industry_Technology_Y_Combinator]}
];


function interact_prompt_password_reset() {
    $choose($('#passwordWrong'));
}
function post_session() {
    d('post_session');
    $choose($FeedInterface);
    f(intent_yawn_read)();
    const lastVisited = window.localStorage.getItem("lastVisited");
    if (lastVisited != null) {
        var successCallback = function (e) {
        };
        var failureCallback = function (e) {
            d(e);
        };
        f(ajax_scream_link)(lastVisited, successCallback, failureCallback);
        f(intent_mark_read)(lastVisited);
        window.localStorage.removeItem("lastVisited");
    } else {
        d('lastVisited is null');
    }

    var flag_super_friend_value = window.localStorage.getItem(flag_super_friend);

    if (flag_super_friend_value == null) {
        f(intent_super_friend)();
        notifyLong('Matching friends (Emails not recorded)');
    } else {
        //Check for time and update after several days?
        //Remember that we can run a hash check
    }
}


function NewsMute() {
    f(render_check_humanId)();
}


var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        document.addEventListener('resume', function () {
            try {
                if(!is_render($FeedSetup)){
                    f(NewsMute)();//The user doesn't know that all news items need to be read to get a news refresh.
                }
            } catch (e) {
                if (debug) {
                    alert(e);
                }
            }
        }, false);

        document.addEventListener("backbutton", function(){
            navigator.notification.confirm(
                'Exit confirmation',  // message
                function(b){
                    if (b == 1) {

                        var complete = function () {
                        };
                        var beforeSend = function () {

                        };
                        var success = function (response) {
                            navigator.app.exitApp();
                        };
                        var error = function (e) {
                            j(e);
                        };
                        ajax_unshare(url, beforeSend, complete, success, error);
                    } else {

                    }
                },//Callback
                'Are you sure you want to exit News Mute?',//Title
                'Yes,No'//ButtonName
            );

        }, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'

    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        try {
            if (!isConnected()) {
                alert("Sorry, for now News Mute needs internet to start. We will fix this soon, promise!");
                return;
            }
            d("Initializing...");

            NewsMute();
            document.addEventListener("pause", function () {
                window.localStorage.removeItem(flag_app_launched);
                window.localStorage.removeItem("lastVisited");
            }, false);


        } catch (e) {
            if (debug) {
                alert('init error');
                alert(e);
            }
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
    }
};
function intent_prompt_email() {
    intent_sign_check();
    notifyShort('Your personal details will not be recorded');
}
function intent_yawn_read() {

    try {
        if (isFirstWake) {
            render($Loader);
        } else {
            busy();
        }

        var beforeSend = function () {
            if (isFirstWake) {
                render($Loader);
            } else {
                busy();
            }
        };
        var complete = function () {
            isFirstWake = false;
            render($FeedInterface);
        };
        var error = function (e) {
            j(e);
            clearInterval(feedRefreshTimeout);
            feedRefreshTimeout = setTimeout("notifyShort('Checking for any updates (News Mute)'); intent_yawn_read()", 10000);
        };

        function ajax_yawn_read_success(response) {
            try {
                var json = JSON.parse(response);

                var data = json.returnValue.data;

                data.sort(function (a, b) {//http://stackoverflow.com/questions/4222690/sorting-a-json-object-in-javascript
                        var a1st = -1; // negative value means left item should appear first
                        var b1st = 1; // positive value means right item should appear first
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

                data.reverse();
                f(render_yawn_items)(data);
            } catch (e) {
                d('Data render error' + e);
            }
        }

        f(ajax_yawn_read)(beforeSend, complete, error, ajax_yawn_read_success, 10000);
    } catch (e) {
        d('intent_yawn_read:' + e);
    }
}
function intent_sign_check() {
    notifyShort('Checking email...');
    f(ajax_sign_in)($('#loginEmail').val().toLowerCase(), 'Just checking if this user has an account with us', intent_sign_check_response, function (arg) {
        d(arg);
        j(arg);
    });//signIn
}
function intent_sign_in() {
    var password = $('#loginPassword').val();
    if (password == "") {
        //setTimeout('promptPassword();', 100);//Removing the timeout and doing a direct call will not work on iOS.
        notifyLong('Enter a password');
    } else if (password == null) {
        //setTimeout('promptPassword();', 100);//Removing the timeout and doing a direct call will not work on iOS.
        notifyLong('Enter a password');
    } else if (password.length < 6) {
        //setTimeout('promptPassword();', 100);//Removing the timeout and doing a direct call will not work on iOS.
        notifyLong('Enter a password longer that 6 characters');
    } else {
        //Now we have the email, we try to login, if we fail
        $choose($Loader);
        notifyShort('Logging in...');
        already_signed_up_user = false;
        f(ajax_sign_in)($('#loginEmail').val().toLowerCase(), get_hash(password), intent_sign_in_response, function (arg) {
            d(arg);
            j(arg);
        });//signIn
    }
}
function intent_sign_reset() {
    var password = $('#loginPassword').val();
    if (password == "") {
        //setTimeout('promptPassword();', 100);//Removing the timeout and doing a direct call will not work on iOS.
        notifyLong('Enter a password');
    } else if (password == null) {
        //setTimeout('promptPassword();', 100);//Removing the timeout and doing a direct call will not work on iOS.
        notifyLong('Enter a password');
    } else if (password.length < 6) {
        //setTimeout('promptPassword();', 100);//Removing the timeout and doing a direct call will not work on iOS.
        notifyLong('Enter a password longer that 6 characters');
    } else {
        //Now we have the email, we try to login, if we fail
        render($($Loader));
        notifyShort('Logging in...');
        f(ajax_sign_up)($('#loginEmail').val().toLowerCase(), get_hash(password), intent_sign_reset_response, function (argS) {
            j(argS);
        });
    }
}
function intent_sign_up() {
    var password = $('#loginPassword').val();
    if (password == "") {
        //setTimeout('promptPassword();', 100);//Removing the timeout and doing a direct call will not work on iOS.
        notifyLong('Enter a password');
    } else if (password == null) {
        //setTimeout('promptPassword();', 100);//Removing the timeout and doing a direct call will not work on iOS.
        notifyLong('Enter a password');
    } else if (password.length < 6) {
        //setTimeout('promptPassword();', 100);//Removing the timeout and doing a direct call will not work on iOS.
        notifyLong('Enter a password longer that 6 characters');
    } else {
        //Now we have the email, we try to login, if we fail
        render($($Loader));
        notifyShort('Signing up...');
        f(ajax_sign_up)($('#loginEmail').val().toLowerCase(), get_hash(password), intent_sign_up_response, function (argS) {
            j(argS);
        });
    }
}
function intent_sign_reset_response(response, textStatus, request) {
    try {
        window.localStorage.setItem("x-session-header", d(request.getResponseHeader('x-session-header')));
        var json = j(JSON.parse(response));
        d(JSON.stringify(json));
        var data = json.returnValue.data[0];
        switch (json.returnStatus) {
            case "OK":
                //alert('Check email. Click verification link and come back here.');

                navigator.notification.alert(
                    'Click verification link and come back here.',  // message
                    function(){},//Callback
                    'Check email',//Title
                    'OK'//ButtonName
                );
                $choose($Login, $('#signInPrompt'), $('#intentSignInButton'));
                break;

            case "ERROR":
                alert("Renew failed");//
                window.location.href = window.location.href;
                break;

            default:
                alert('News Mute sign UP error:' + json.returnStatus);
                break;
        }
    } catch (e) {
        d("intent_sign_reset_response:" + e);
    }
}

function intent_sign_in_response(email, passwordHash, response, textStatus, request) {
    try {
        window.localStorage.setItem("x-session-header", d(request.getResponseHeader('x-session-header')));
        var json = j(JSON.parse(response));
        var dataArray = json.returnValue.data;
        var data = dataArray[0];
        var status = data.status;
        if (json.returnStatus == "OK") {
            switch (status) {
                case "OK":
                    window.humanId = get_hash(email);
                    f(post_session)();
                    break;

                case "ERROR":
                    f(interact_prompt_password_reset)();
                    break;

                case "NO_ACCOUNT":
                    notifyLong("No account, we are creating one for you...");
                    f(ajax_sign_up)(email, passwordHash, intent_sign_up_response, function (argS) {
                        j(argS);
                    });
                    break;
                default:
                    alert('News Mute sign IN error:' + status);
                    break;
            }
        } else {
            d("returnStatus:" + data.returnStatus);
        }
    } catch (e) {
        d(e);
    }
}
function intent_sign_check_response(email, passwordHash, response, textStatus, request) {
    try {
        window.localStorage.setItem("x-session-header", d(request.getResponseHeader('x-session-header')));
        var json = j(JSON.parse(response));
        var dataArray = json.returnValue.data;
        var data = dataArray[0];
        var status = data.status;
        if (json.returnStatus == "OK") {
            switch (status) {
                case "OK":
                    d('Account available but this should not happen!')
                    break;
                case "ERROR":
                    //Though it was a sign in error, we faked a sign in to check account availability. So this is not RESET state
                    $choose($('#intentSignInButton'));
                    break;
                case "NO_ACCOUNT":
                    $choose($('#intentSignUpButton'));
                    break;
                default:
                    d('Account availability check unknown error');
                    break;
            }
        } else {
            d("returnStatus:" + data.returnStatus);
        }
    } catch (e) {
        d(e);
    }
}
function intent_sign_up_response(response, textStatus, request) {
    try {
        window.localStorage.setItem("x-session-header", d(request.getResponseHeader('x-session-header')));
        var json = j(JSON.parse(response));
        var data = json.returnValue.data[0];
        var status = data.status;
        switch (json.returnStatus) {
                case "OK":
                    $choose($('#intentSignInButton'));

                    navigator.notification.alert(
                        'Click verification link and come back here.',  // message
                        function(){},//Callback
                        'Check email',//Title
                        'OK'//ButtonName
                    );

                    break;
                default:
                    d("intent_sign_up_response:returnStatus:" + data.returnStatus);
                    break;
        }
    } catch (e) {
        d("intent_sign_up_response:" + e);
    }
}
function intent_open_link(link) {
    window.plugins.ChildBrowser.showWebPage(link, {showNavigationBar: true });
//    var ref = window.open(link, '_blank', 'location=yes;closebuttoncaption=Done;toolbar=yes;EnableViewportScale=yes;allowInlineMediaPlayback=yes;');
//    ref.addEventListener('loadstop', function () {
//        ref.insertCSS({code: clearCss});
//    });
//    ref.addEventListener('exit', function () {
//        //intent_yawn_read();
//    });
}
function intent_scream_link(url, successCallback, failureCallback) {
    d("Sharing:" + url)
    if (isValidURL(url)) {
        ajax_scream_link(url, successCallback, failureCallback);
    } else {
        alert('Sorry :-( This link is not recognized by News Mute')
    }
}
function intent_stalk(url) {

    if (url == null) {
        url = prompt("Enter feed URL");
        if (url == null || url == "") {
            return;
        }
    }

    if (isValidURL(url)) {
        var beforeSend = function () {
        };
        var complete = function () {
        };
        var success = function (response) {
            try {
                notifyShort("Subscribed");//@TODO: Check response
                //window.location.href = window.location.href;
            } catch (e) {
                d(e);
            }
        };
        var error = function (e) {
            j(JSON.stringify(e));
        };
        ajax_stalk(url, beforeSend, complete, success, error);
    } else {
        alert('Sorry :-( This feed is not recognized by News Mute')
    }

}
function intent_stalk(url) {
    var success = function (response) {
        try {
            //alert("Subscribed");//@TODO: Check response
            //window.location.href = window.location.href;
        } catch (e) {
            if (debug) {
                alert(e);
            }
        }
    };
    var error = function (e) {
        if (debug) {
            alert(JSON.stringify(e));
        }
    };
    var complete = function () {
    };
    var beforeSend = function () {
    };
    ajax_stalk(url, beforeSend, complete, success, error);
}
function intent_unshare(url) {
    try {

            navigator.notification.confirm(
                "Remove feed permanently?",
                callBackFunction, // Specify a function to be called
                'Remove News Source',
                "Yes,No"
            );

            function callBackFunction(b) {
                if (b == 1) {

                    var complete = function () {
                    };
                    var beforeSend = function () {

                    };
                    var success = function (response) {
                        notifyShort('Removed feed.');
                    };
                    var error = function (e) {
                        j(e);
                    };
                    ajax_unshare(url, beforeSend, complete, success, error);
                } else {

                }
            }
    } catch (e) {
        if (debug) {
            alert(e);
        }
    }
}
function intent_mark_read(url) {
    var complete = function () {
    };
    var beforeSend = function () {

    };
    var success = function (response) {
    };
    var error = function (e) {
        j(e);
    };
    ajax_mark_read(url, beforeSend, complete, success, error);
}

function intent_mark_read_one(url, success) {
    var complete = function () {
    };
    var beforeSend = function () {
    };
    var error = function (e) {
        j(e);
    };
    ajax_mark_read(url, beforeSend, complete, success, error);
}
function intent_subscribe_if_valid_feed(rssFeedUrl) {
    try {
        intent_discover_feed_for_url(rssFeedUrl.replace(/\s+/g, ''))//We replace all spaces since a user can type something like Facebook.com which ends up with spaces in the end
            .done(function (data) {
                var queryResult = data.responseData;
                if (!!queryResult) {
                    //'http://feeds.feedburner.com/techcrunch/social?format=xml';
                    intent_stalk(queryResult.url);
                    notifyShort('Found website feed. Subscribed!');
                    //We can exit here, but why would a user want to exit after a feed subscription, except explore feeds
                } else {
                    notifyShort("Sorry, News Mute doesn't recognise this website!");
                }
            });
    } catch (e) {
        d(e);
    }
}
function intent_discover_feed_for_url(pageURL) {
    var baseApiUrl = "http://ajax.googleapis.com/ajax/services/feed/lookup?v=1.0";
    var jQueryJsonpToken = "&callback=?"; // tells jQuery to treat it as JSONP request
    var pageUrlParameter = "&q=" + pageURL;
    var requestUrl = baseApiUrl + jQueryJsonpToken + pageUrlParameter;
    return $.getJSON(requestUrl);
}
function intent_super_friend() {
    d('Finding contacts');
    function intent_find_all_contancts(contacts) {
        d('Found contacts: ' + contacts.length);
        try {
            var contactSet = "";
            for (var i = 0; i < contacts.length; i++) {
                for (var j = 0; contacts[i].emails != null && j < contacts[i].emails.length; j++) {
                    if (contacts != "") {
                        contactSet = contactSet + "%7C" + get_hash(contacts[i].emails[j].value); //%7C is the pipe | sign
                    } else {
                        contactSet = get_hash(contacts[i].emails[j].value);
                    }
                }

                if (i % 20 == 0) {//Why? Because we might hit the maximum length of the URL. Right now my contacts count on the phone is some 1900+
                    var beforeSend = function () {
                    };
                    var complete = function () {
                    };
                    var success = function (response) {
                    };
                    var error = function (e) {
                        j(JSON.stringify(e));
                    };
                    ajax_super_friend(contactSet, beforeSend, complete, success, error);
                    contactSet = "";

                }
            }
            window.localStorage.setItem(flag_super_friend, "true");

        } catch (e) {
            if (debug) {
                alert(e);
            }
        }

    }

    function callback_find_all_contacts_failure(e) {
        d(e);
    }

    try {
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;

        navigator.contacts.find(['emails'], intent_find_all_contancts, callback_find_all_contacts_failure, options);
    } catch (e) {
        if (debug) {
            alert(e);
        }
    }

}
function intent_scream() {
    var url = prompt("Enter link");
    if (url == null || url == "") {
        return;
    }

    intent_scream_link(url, function (e) {
        alert(e)
    }, function (e) {
        alert(e)
    });
}
function intent_share(link) {
    try {
        window.plugins.socialsharing.share(null, null, null, link);
    } catch (e) {
        if (debug) {
            alert(e);
        }
    }

}
function intent_remove_login() {
    d('Resetting ' + window.humanId);
    window.localStorage.removeItem("humanId");
    window.localStorage.removeItem("x-session-header");
}
function intent_subscribe_search(){
    var url = $('#subscribeSuggestionSeachEntry').val();
    intent_subscribe_if_valid_feed(url);
    $('#subscribeSuggestionSeachEntry').val('');
}

function make_yawn_item(item) {
    const clone = $itemTemplate.clone();

    const id = crc32(item.link);
    const feedItemTitle = clone.find(clsItemTitle);
    const feedItemDescription = clone.find(clsItemDescription);
    const feedItemSource = clone.find(clsItemSource);
    const feedItemBookmark = clone.find(clsItemBookmark);
    const feedItemHide = clone.find(clsItemHide);
    const feedItemBookmarkText = clone.find(clsItemBookmarkText);


    clone.attr(strId, id);
    clone.attr(strClass, 'itemTemplateShown');
    clone.attr('title', item.link);

    feedItemTitle.text(item.title);
    //clone.find('.itemTitle').attr('href', item.link);
    feedItemTitle.attr("title", item.link);
    feedItemTitle.attr("style", "font-size: 20px; color: #000000; width:100%;");
    feedItemTitle.click(
        function () {
            render_toggle_content($(this).attr('title'));
        }
    );

    feedItemSource.text(item.source);
    feedItemSource.attr("style", "font-size: 10px; color: #bbbbbb;");

    //clone.find('.itemDescription').html(item.description.replace(/<(?:.|\n)*?>/gm, ''));
    const jsEscapedContent = item.description.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').replace(/<iframe\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/iframe>/gi, '');
    feedItemDescription.attr("title", item.link);
    feedItemDescription.html(jsEscapedContent);
    feedItemDescription.find('a').each(function () {
        var href = $(this).attr('href');
        $(this).attr('onclick', "intent_open_link('" + href + "');")
            .removeAttr('href');
        $(this).click(function () {
            $(this).attr("title", item.link);
            render_hide_up($(this).attr('title'));
            $('#' + id).removeClass('itemTemplateShown');
            $('#' + id).addClass('itemTemplateHidden');
            if ($feedsList.find('.itemTemplateShown').length == 0) {
                setTimeout("intent_yawn_read();", 0);//This code has two duplicates
            }
        });
    });
    //feedItemDescription.hide();

    //clone.find('.itemDescription').html(item.description.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''));
    //Without the script replacement, Chris Brogan blog renders elements wrong
    //Without the iframe replacement, Pinterest gives the following error "Application Error - There was a network error. (file://instagram.com/p/iosdfadsf/embed). This comes as a Android alert.

    {//itemBookmark
        feedItemBookmark.attr("title", item.link);

        feedItemBookmark.longpress(
            f(function(){
                const url = $('#' + id).attr('title');

                window.localStorage.setItem('lastVisited', url);

                ajax_scream_link(
                    url,
                    function (e) {
                    },
                    function (e) {
                        d(e);
                    }
                );

                intent_open_link(window.localStorage.getItem('lastVisited'));

                intent_mark_read_one(url, function(){

                    ajax_yawn_read_one(
                        item.source,
                        function(){
                            //d('before fetch one');
                        },
                        function(){
                            //d('complete fetch one');
                        },
                        function(e){
                            j(e);
                        },
                        f(function(response){
                            var json = JSON.parse(response);
                            d(json);
                            var data = json.returnValue.data;

                            if(data != undefined && data.length !=0){
                                try {
                                    var read_one = make_yawn_item(data[0]);
                                    read_one.hide();
                                    $("#" + id).replaceWith(read_one);
                                    read_one.fadeTo("slow", 1.0);
                                } catch (e) {
                                    alert(e);
                                }
                            } else {
                                d('No new entries');
                                $('#' + id).fadeOut('fast', function () {
                                    render_hide_item(id);
                                    $('#' + id).removeClass('itemTemplateShown');
                                    $('#' + id).addClass('itemTemplateHidden');
                                    if ($feedsList.find('.itemTemplateShown').length == 0) {
                                        setTimeout("intent_yawn_read();", 700);//Allows user click add more news and also allows the mark read http request to go through before the new request//This code has two duplicates
                                    }
                                });
                            }
                        }),
                        10000
                    );

                });
            }),
            f(function () {
                const url = $("#" + id).attr('title');

                window.localStorage.setItem('lastVisited', url);

                ajax_scream_link(
                    url,
                    function (e) {
                    },
                    function (e) {
                        if (debug) {
                            alert(e);
                        }
                    }
                );

                feedItemBookmarkText.text("Shared!");
                $("#" + id).fadeOut('slow', function () {
                    render_hide_up(url);
                    $('#' + id).removeClass('itemTemplateShown');
                    $('#' + id).addClass('itemTemplateHidden');
                    if ($feedsList.find('.itemTemplateShown').length == 0) {
                        setTimeout("intent_yawn_read();", 700);//Allows user click add more news and also allows the mark read http request to go through before the new request//This code has two duplicates
                    }

                    intent_open_link(window.localStorage.getItem('lastVisited'));
                });
            }),
            150);





    }

    {//itemAdvanced
        clone.find(clsItemAdvanced).attr("title", item.source);
    }

    {//itemHide
        feedItemHide.attr("title", item.link);
        feedItemHide.longpress(
            f(function(){
                intent_mark_read_one(item.link, function(){
                    $("#" + id).fadeTo("fast", 0.0, function(){
                        ajax_yawn_read_one(
                            item.source,
                            function(){
                                //d('before fetch one');
                            },
                            function(){
                                //d('complete fetch one');
                            },
                            function(e){
                                j(e);
                            },
                            f(function(response){
                                var json = JSON.parse(response);
                                d(json);
                                var data = json.returnValue.data;

                                if(data != undefined && data.length !=0){
                                    try {
                                        var read_one = make_yawn_item(data[0]);
                                        read_one.hide();
                                        $("#" + id).replaceWith(read_one);
                                        read_one.fadeTo("slow", 1.0);
                                    } catch (e) {
                                        alert(e);
                                    }
                                } else {
                                    d('No new entries');
                                    $('#' + id).fadeOut('fast', function () {
                                        render_hide_item(id);
                                        $('#' + id).removeClass('itemTemplateShown');
                                        $('#' + id).addClass('itemTemplateHidden');
                                        if ($feedsList.find('.itemTemplateShown').length == 0) {
                                            setTimeout("intent_yawn_read();", 2000);//Allows user click add more news and also allows the mark read http request to go through before the new request//This code has two duplicates
                                        }
                                    });
                                }
                            }),
                            10000
                        );
                    });
                });
            }),
            f(function () {
                $(this).fadeOut('fast', function () {
                    render_hide_item($(this).attr('title'));
                    $('#' + id).removeClass('itemTemplateShown');
                    $('#' + id).addClass('itemTemplateHidden');
                    if ($feedsList.find('.itemTemplateShown').length == 0) {
                        setTimeout("intent_yawn_read();", 2000);//Allows user click add more news and also allows the mark read http request to go through before the new request//This code has two duplicates
                    }
                });
            }),
            150);
    }
    return clone;
}
function make_country_item(item) {
    var clone;
    clone = $countryItemTemplate.clone();
    clone.find('.title').text(item.title);
    clone.click(
        function () {
            //d(item.title);
            item.feeds.forEach(function (value) {
                //d(value);
                if(value != null && value != ''){
                    intent_stalk(value);
                }
            });
            $choose($FeedSetupIndustries);
        }
    );
    return clone;
}
function make_industry_item(item) {
    const clone = $industryItemTemplate.clone();
    clone.find('.title').text(item.title);
    clone.click(
        function () {
            //alert(item.title);
            item.feeds.forEach(function (value) {
                //alert(value);
                intent_stalk(value);

            });

            $choose($FeedSetupSubscribe);

        }
    );
    return clone;
}

function render_initial_setup() {
    try {
        clearTimeout(feedRefreshTimeout);

        render($Loader);

        $FeedSetupCountries.fadeIn("fast");

        render($FeedSetup);//That is, render the interface after we do all elements (there's some UI lags, that's why)
        $FeedSetupSubscribe.hide();
        $FeedSetupIndustries.hide();

        var countryListDocumentFragment = document.createDocumentFragment();
        for (var i = 0; i < countries.length; i++) {
            (function (i, j) {
                const item = countries[i];
                const clone = make_country_item(item);
                if(clone != null){
                    clone.appendTo(countryListDocumentFragment);
                    if (i + 1 == j) {
                    }
                }
            })(i, countries.length);
        }
        $countryList.empty();
        $countryList.append(countryListDocumentFragment);

        var industryListDocumentFragment = document.createDocumentFragment();
        for (var ii = 0; ii < industries.length; ii++) {
            (function (ii, j) {
                const item = industries[ii];
                const clone = make_industry_item(item);
                clone.appendTo(industryListDocumentFragment);
                if (ii + 1 == j) {
                }

            })(ii, industries.length);
        }
        $industryList.empty();
        $industryList.append(industryListDocumentFragment);



    } catch (e) {
        alert(e);
    }
}
function render_check_humanId() {
    "use strict";
    if (window.humanId == null || window.humanId == "") {
        render_sign_in();
    } else {
        f(post_session)();
    }
}
function render_yawn_items(data) {
    const length = data.length;

    const start = new Date().getTime();

    const feedListDocumentFragment = document.createDocumentFragment();
    $feedsList.empty();

    for (var i = 0; i < length && i < 100; i++) {
        (function (i) {
            const item = data[i];
            var clone = make_yawn_item(item);
            clone.appendTo(feedListDocumentFragment);
            if (i < 5) {
                clone.animate({opacity: 0.0});
                clone.animate({opacity: 1.0}, {duration: i * 300, complete: function () {
                    for (i = 0; i < 1; i++) {
                        clone.fadeTo('slow', 0.5).fadeTo('slow', 1.0);
                        setTimeout('clone.fadeTo(0, 2.0);', 2000);//In case of UI glitches in animations
                    }
                }});
            }
        })(i);
    }

    if (length > 0) {
        //$('.no_news').hide();
        clearTimeout(feedRefreshTimeout);
    } else {
        //$('.no_news').show();
        clearTimeout(feedRefreshTimeout);
        feedRefreshTimeout = setTimeout("notifyShort('Checking for any updates (News Mute)'); intent_yawn_read()", 10000);
        notifyShort('No new news. Will recheck. (News Mute)');
    }

    $feedsList.append(feedListDocumentFragment);
    render($FeedInterface);
    if (isFirstWake) {
        //Nothing to do here
    } else {
        free();
    }

    $feedsList.slideDown();

    d('Completed in ' + (new Date().getTime() - start ));
}
function render_toggle_content(url) {
    try {
        var id = crc32(url);
        var content = $("#" + id).find('.itemDescription');
        if (content.is(":visible")) {
            content.slideUp();
        } else {
            content.slideDown();
        }
    } catch (e) {
        if (debug) {
            alert(e);
        }
    }

}
function render_hide_item(url) {
    try {
        intent_mark_read(url);
        var id = crc32(url);
        var undoid = 'undo' + id;

        var feedItem = $("#" + id);
        var clone = $('.itemUndoTemplate').clone().removeClass('itemUndoTemplate');

        clone.find('.itemTitle').text(feedItem.find('.itemTitle').text());
        clone.attr('title', url);
        clone.attr(strId, undoid);

        clone.find(('.itemBookmark')).click(function(){
                const url = $("#" + undoid).attr('title');

                window.localStorage.setItem('lastVisited', url);

                $("#" + undoid).hide();

                ajax_scream_link(
                    url,
                    function (e) {
                    },
                    function (e) {
                        if (debug) {
                            alert(e);
                        }
                    }
                );

                intent_open_link(url);

        });

        feedItem.fadeOut(0).after(clone);
        clone.fadeIn(300).delay(5000).slideUp(500);

    } catch (e) {
        if (debug) {
            alert(e);
        }
    }

}
function render_hide_up(url) {
    try {
        intent_mark_read(url);
        var id = crc32(url);
        $("#" + id).animate({opacity: 0.1}, {duration: 100, complete: function () {
            $("#" + id).slideUp(300);
        }});
    } catch (e) {
        if (debug) {
            alert(e);
        }
    }

}
function render_sign_in() {
    $choose($('#signInPrompt'));
    //$('#loginEmail').focus();
}
function render_reset() {
    $choose($('#signInPrompt'));
    $choose($('#intentPasswordResetButton'));
}


function render(sectionToShow) {
    if (sectionToShow != $Loader) {
        $Loader.hide();
    }
    if (sectionToShow != $FeedSetup) {
        $FeedSetup.hide();
    }
    if (sectionToShow != $FeedInterface) {
        $FeedInterface.hide();
    }
    if (sectionToShow != $Inception) {
        $Inception.hide();
    }
    if (sectionToShow != $Busy) {
        $Busy.hide();
    }
    if (sectionToShow != $Login) {
        $Login.hide();
    }
    sectionToShow.show();
}
function is_render(sectionToCheck) {
   return sectionToCheck.is(":visible");
}



