

const endpointYawn = "http://yawn.newsmute.com:40200";
const endpointScream = "http://scream.newsmute.com:30200";
const endpointStalk = "http://stalk.newsmute.com:16285";
const endpointSuperFriend = "http://superfriend.newsmute.com:20200";
const endpointGuardian = "http://guardian.newsmute.com:50200";
const endpointGodFather = "http://guardian.newsmute.com:40700";

$.ajaxSetup(
    {
        statusCode:{
            401: function(){
                window.localStorage.removeItem("humanId");//This will cause the InitializeHuman to run with a new signup
                d('401');
                window.location.href = window.location.href;//This will cause the InitializeHuman to run with a new signup
            }
        }
    }
);

function ajax_sign_up(email, passwordHash, successCallback, failureCallback) {
    $.ajax({
        type: "GET",
        url: endpointGodFather +
            "/?user=" + get_hash(email) + "&token=" + passwordHash + "&nmact=" + "CREATE" + "&email=" + email,
        crossDomain: true,
        beforeSend: function () {
        },
        complete: function () {
        },
        data: {},
        dataType: 'text', //json
        success: function (response, statusText, request) {
            f(successCallback)(response, statusText, request);
        },
        error: function (e) {
            f(failureCallback)(e);
        }
    });
}



function ajax_sign_in(email, passwordHash, successCallback, failureCallback){
    d('Signing in');
    $.ajax({
        type: "GET",
        url: endpointGuardian +
            "/?user=" + get_hash(email) + "&token=" + passwordHash + "&nmact=" + "READ",
        crossDomain: true,
        beforeSend: function () {
        },
        complete: function () {
        },
        data: {},
        dataType: 'text', //json
        success: function (response, statusText, request) {
            f(successCallback)(email, passwordHash, response, statusText, request);
        },
        error: function (e) {
            f(failureCallback)(e);
        }
    });
}


function ajax_yawn_read(beforeSend, complete, error, ajax_yawn_read_success) {
    $.ajax({
        type: "GET",
        headers: { 'x-session-header': get_session_value()},
        url: endpointYawn +
            "/?nmact=READ&user=" + humanId,
        crossDomain: true,
        beforeSend: beforeSend,
        complete: complete,
        data: {},
        dataType: 'text', //json
        success: ajax_yawn_read_success,
        error: error
    });
}


function ajax_scream_link(url, successCallback, failureCallback) {
    $.ajax({
        type: "GET",
        headers: { 'x-session-header': get_session_value()},
        url: endpointScream +
            "/?user=" + humanId + "&url=" + encodeURIComponent(url),
        crossDomain: true,
        beforeSend: function () {
        },
        complete: function () {
        },
        data: {},
        dataType: 'text', //json
        success: function (response) {
            successCallback(response);
        },
        error: function (e) {
            failureCallback(JSON.stringify(e));
        }
    });
}



function ajax_scream_link(url, successCallback, failureCallback){
    $.ajax({
        type: "GET",
        headers: { 'x-session-header': get_session_value()},
        url: endpointScream +
            "/?user=" + humanId + "&url=" + encodeURIComponent(url),
        crossDomain: true,
        beforeSend: function () {
        },
        complete: function () {
        },
        data: {},
        dataType: 'text', //json
        success: function (response) {
            successCallback(response);
        },
        error: function (e) {
            failureCallback(JSON.stringify(e));
        }
    });
}

function ajax_stalk(url, beforeSend, complete, success, error) {
    $.ajax({
        type: "GET",
        headers: { 'x-session-header': get_session_value()},
        url: endpointStalk +
            "/?user=" + humanId + "&url=" + encodeURIComponent(url) + "&nmact=CREATE",
        crossDomain: true,
        beforeSend: beforeSend,
        complete: complete,
        data: {},
        dataType: 'text', //json
        success: success,
        error: error
    });
}



function ajax_unshare(url, beforeSend, complete, success, error) {
    $.ajax({
        type: "GET",
        headers: { 'x-session-header': get_session_value()},
        url: endpointStalk +
            "/?user=" + humanId + "&url=" + encodeURIComponent(url) + "&nmact=DELETE",
        crossDomain: true,
        beforeSend: beforeSend,
        complete: complete,
        data: {},
        dataType: 'text', //json
        success: success,
        error: error
    });
}



function ajax_mark_read(url, beforeSend, complete, success, error) {
    $.ajax({
        type: "GET",
        headers: { 'x-session-header': get_session_value()},
        url: endpointYawn +
            "/?user=" + humanId + "&url=" + encodeURIComponent(url) + "&nmact=DELETE",
        crossDomain: true,
        beforeSend: beforeSend,
        complete: complete,
        data: {},
        dataType: 'text', //json
        success: success,
        error: error
    });
}


function ajax_super_friend(contactSet, beforeSend, complete, success, error) {
    $.ajax({
        type: "GET",
        headers: { 'x-session-header': get_session_value()},
        url: endpointSuperFriend +
            "/?user=" + humanId + "&users=" + contactSet,
        crossDomain: true,
        beforeSend: beforeSend,
        complete: complete,
        data: {},
        dataType: 'text', //json
        success: success,
        error: error
    });
}


function ajax_stalk(url, beforeSend, complete, success, error) {
    $.ajax({
        type: "GET",
        headers: { 'x-session-header': get_session_value()},
        url: endpointStalk +
            "/?user=" + humanId + "&url=" + encodeURIComponent(url) + "&nmact=CREATE",
        crossDomain: true,
        beforeSend: beforeSend,
        complete: complete,
        data: {},
        dataType: 'text', //json
        success: success,
        error: error
    });
}
