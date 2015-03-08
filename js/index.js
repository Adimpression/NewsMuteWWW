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

const unsubscribe_url = "unsubscribe_url";

const clearCss = "body{width:100%!important;line-height:1.4;word-spacing:1.1pt;letter-spacing:.2pt;font-family:Garamond,'Times New Roman', serif;color:#000;font-size:12pt;margin:0!important;padding:0!important;}h1,h2,h3,h4,h5,h6{font-family:Helvetica, Arial, sans-serif;}h1{font-size:19pt;}h2{font-size:17pt;}h3{font-size:15pt;}h4,h5,h6{font-size:12pt;}code{font:10pt Courier, monospace;}blockquote{font-size:10pt;margin:1.3em;padding:1em;}hr{background:#ccc;}img{float:left;margin:1em 1.5em 1.5em 0;}a img{border:none;}a:link,a:visited{font-weight:700;text-decoration:underline;color:#333;}a:link[href^=http://]:after,a[href^=http://]:visited:after{content:' (' attr(href) ') ';font-size:90%;}a[href^=http://]{color:#000;}table{text-align:left;margin:1px;}th{border-bottom:1px solid #333;font-weight:700;}td{border-bottom:1px solid #333;}th,td{padding:4px 10px 4px 0;}tfoot{font-style:italic;}caption{margin-bottom:2em;text-align:left;background:#fff;}thead{display:table-header-group;}tr{page-break-inside:avoid;}";

var nordova = true;//True if no cordova support is found
var currentFeedItems = 11;

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

function interact_prompt_password_reset() {
    $choose($('#passwordWrong'));
}
function post_session() {
    d('post_session');
    f(Unsubscribe)();
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


function hasLoggedIn() {
    var loggedOut = (window.humanId == null || window.humanId == "");
    return  !loggedOut;
}

function hasUrlUnsubscribed(){
    return (window.getUrlParameter('unsubscribe') != '');
}
function getUrlUnsubscribe(){
    var unsubscribe = window.getUrlParameter('unsubscribe');

    if (unsubscribe != '') {
        return decodeURIComponent(unsubscribe);
    } else {
        throw 'Not Unsubscribed';
    }
}
function hasUnsubscribed(){
    return window.localStorage.getItem(unsubscribe_url) != null;
}
function getUnsubscribed(){
    return window.localStorage.getItem(unsubscribe_url);
}
function setUnsubscribe(unsubscribe) {
    window.localStorage.setItem(unsubscribe_url, decodeURIComponent(unsubscribe));
}
function resetUnsubscribe() {
    window.localStorage.removeItem(unsubscribe_url);
}

function Unsubscribe() {
        if (!hasLoggedIn()) {
            if(hasUrlUnsubscribed()){
                setUnsubscribe(getUrlUnsubscribe());
                notifyShort('Will unsubscribe from ' + getUrlUnsubscribe());
            }
        } else {
            if(hasUrlUnsubscribed()){
                notifyShort("Unsubscribing from " + getUrlUnsubscribe());
                intent_stalk(getUrlUnsubscribe());
            }

            if(hasUnsubscribed()){
                notifyShort("Unsubscribing from " + getUnsubscribed());
                intent_stalk(getUnsubscribed());
                resetUnsubscribe();
            }
        }
}

function confirmLogOff(){
    if(nordova){
        if(confirm('Log out?')){
            intent_remove_login();
            NewsMute();
        }
    } else {
        navigator.notification.confirm(
            "Are you sure?",
            callBackFunction, // Specify a function to be called
            'Logging out',
            "Yes,No"
        );

        function callBackFunction(b) {
            if (b == 1) {
                intent_remove_login();
            } else {

            }
        }
    }
}

function NewsMute() {
    f(render_check_humanId)();

    $.getScript("js/countries.min.js", function(){
        d('Loaded Countries');
    });

    $.getScript("js/interests.min.js", function(){
        d('Loaded Interests');
    });
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
    f(track_activity)('Email Box', 'Click', 'Empty');

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

                currentFeedItems = data.length;
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
    f(ajax_sign_in)($.trim($('#loginEmail').val().toLowerCase()), 'Just checking if this user has an account with us', intent_sign_check_response, function (arg) {
        d(arg);
        j(arg);
    });//signIn
}
function intent_sign_in() {
    f(track_activity)('Sign In', 'Click', 'Empty');

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
        f(ajax_sign_in)($.trim($('#loginEmail').val().toLowerCase()), get_hash(password), intent_sign_in_response, function (arg) {
            d(arg);
            j(arg);
        });//signIn
    }
}
function intent_sign_reset() {
    f(track_activity)('Renew Password Button', 'Click', 'Empty');


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
        f(ajax_sign_up)($.trim($('#loginEmail').val().toLowerCase()), get_hash(password), intent_sign_reset_response, function (argS) {
            j(argS);
        });
    }
}
function intent_sign_up() {
    f(track_activity)('Sign Up Button', 'Click', 'Empty');

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
        f(ajax_sign_up)($.trim($('#loginEmail').val().toLowerCase()), get_hash(password), intent_sign_up_response, function (argS) {
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

               if(nordova){
                   alert('Click verification link and come back here.');
               } else {
                   navigator.notification.alert(
                       'Click verification link and come back here.',  // message
                       function(){},//Callback
                       'Check email',//Title
                       'OK'//ButtonName
                   );
               }

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
                    if(!$('#intentPasswordResetButton').is(':visible')) {
                        $choose($('#intentSignInButton'));
                    }
                    break;
                case "NO_ACCOUNT":
                    if(!$('#intentPasswordResetButton').is(':visible')) {
                        $choose($('#intentSignUpButton'));
                    }
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

                    if(nordova){
                        alert('Click verification link and come back here.');
                    } else {
                        navigator.notification.alert(
                            'Click verification link and come back here.',  // message
                            function(){},//Callback
                            'Check email',//Title
                            'OK'//ButtonName
                        );
                    }

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
    if(currentFeedItems <= 11){
        intent_subscribe_silently_if_valid_feed(link, function(){
           d("Subscribe failed on auto follow mode");
        });
    }

    if(nordova){
        var windowSize = "width=" + window.innerWidth + ",height=" + window.innerHeight + ",scrollbars=no";
        window.open(link, 'popup', windowSize);
    } else {
        window.plugins.ChildBrowser.showWebPage(link, {showNavigationBar: true });
    }
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
    f(track_activity)('Remove Feed Button', 'Click', humanId);

    try {

        if (nordova) {
            if (confirm('Remove feed permanently?')) {
                callBackFunction(1);
            }

        } else {
            navigator.notification.confirm(
                "Remove feed permanently?",
                callBackFunction, // Specify a function to be called
                'Remove News Source',
                "Yes,No"
            );
        }

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
function intent_subscribe_if_valid_feed(rssFeedUrl, successCallback) {
    try {
        intent_discover_feed_for_url(rssFeedUrl.replace(/\s+/g, ''))//We replace all spaces since a user can type something like Facebook.com which ends up with spaces in the end
            .done(function (data) {
                var queryResult = data.responseData;
                if (!!queryResult) {
                    //'http://feeds.feedburner.com/techcrunch/social?format=xml';
                    intent_stalk(queryResult.url);
                    notifyShort('Found website feed. Subscribed!');
                    successCallback();
                    //We can exit here, but why would a user want to exit after a feed subscription, except explore feeds
                } else {
                    notifyShort("Sorry, News Mute doesn't recognise this website!");
                    return false;
                }
            });
    } catch (e) {
        d(e);
    }
}
function intent_subscribe_silently_if_valid_feed(rssFeedUrl, successCallback) {
    try {
        intent_discover_feed_for_url(rssFeedUrl.replace(/\s+/g, ''))//We replace all spaces since a user can type something like Facebook.com which ends up with spaces in the end
            .done(function (data) {
                var queryResult = data.responseData;
                if (!!queryResult) {
                    //'http://feeds.feedburner.com/techcrunch/social?format=xml';
                    intent_stalk(queryResult.url);
                    //notifyShort('Found website feed. Subscribed!');
                    successCallback();
                    //We can exit here, but why would a user want to exit after a feed subscription, except explore feeds
                } else {
                    //notifyShort("Sorry, News Mute doesn't recognise this website!");
                    return false;
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

        navigator.contacts.find([navigator.contacts.fieldType.emails], intent_find_all_contancts, callback_find_all_contacts_failure, options);
    } catch (e) {
        if (debug) {
            alert(e);
        }
    }

}
function intent_get_influenced(email) {
        try {
            ajax_super_friend(email, function(){}, function(){}, function(){}, function(){});
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
    f(track_activity)('Give it to friends Button', 'Click', humanId);

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
    f(track_activity)('Subscribe Button', 'Click', humanId);

    var url = $('#subscribeSuggestionSeachEntry').val();
    intent_subscribe_if_valid_feed(url, function(){
        $('#subscribeSuggestionSeachEntry').val('');
    });
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

    feedItemTitle.text(item.title.replace(/[|&;$%@"<>()+,]/g, ""));//http://stackoverflow.com/questions/3780696/javascript-string-replace-with-regex-to-strip-off-illegal-characters
    feedItemTitle.attr("title", item.link);
    feedItemTitle.attr("style", "font-size: 20px; color: #000000; width:100%;");
    feedItemTitle.click(
        function () {
            render_toggle_content($(this).attr('title'));
            f(track_activity)('Feed Item Title', 'Click', humanId);
        }
    );

    if(item.source.substring(0, 4) == 'http'){
        feedItemSource.text(item.source);
    } else{
        var likes = (parseInt(item.shocks) + 1);
        feedItemSource.html("<span style='color: #960018; font-weight: 900;'>" + likes + " " + (likes <= 1 ? "friend" : "friends" ) + " liked this" + "</span>");
    }

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
                f(track_activity)('News Button', 'Long Click', humanId);

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
                f(track_activity)('News Button', 'Short Click', humanId);

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
                f(track_activity)('Mute Button', 'Long Click', humanId);

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
                f(track_activity)('Mute Button', 'Short Click', humanId);

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

            intent_get_influenced(item.title.replace(/ /g,'').toLowerCase() + '@adimpression.mobi');

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

        //render($Loader);

        $choose($FeedSetup);//That is, render the interface after we do all elements (there's some UI lags, that's why)
        $choose($FeedSetupCountries);

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
    if (!hasLoggedIn()) {
        render_sign_in();
        f(Unsubscribe)();
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
        clone.fadeIn(300).delay(5000).slideUp(100);

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
    var email = window.getUrlParameter('email');

    if(email != ''){
        $('#loginEmail').val(email);
    }

    $choose($('#signInPrompt'));
    //$('#loginEmail').focus();
}
function render_reset() {
    $choose($('#signInPrompt'));
    $choose($('#intentPasswordResetButton'));
}
function render_inception(){
    $choose($Inception);
    $.ajax({
        url: 'http://9ce2a77da623b7f5181c-97dce30d10f9c13337ec01a7a52138ac.r0.cf2.rackcdn.com/countries.js',
        dataType: "script"
    });
    $.ajax({
        url: 'http://9ce2a77da623b7f5181c-97dce30d10f9c13337ec01a7a52138ac.r0.cf2.rackcdn.com/interests.js',
        dataType: "script"
    });
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


function track_activity(action, itemName, humanId){
    f(_paq.push)(['trackEvent',action , itemName , humanId]);
}



