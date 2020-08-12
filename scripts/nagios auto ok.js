// ==UserScript==
// @name         nagios auto ok
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Skip annoying Nagios prompts
// @author       tatref
// @match        http*://*/nagios/cgi-bin/cmd.cgi*
// @grant        none
// ==/UserScript==



function click_submit() {
    var submitlink = document.evaluate ('//input[@name="btnSubmit"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (submitlink.singleNodeValue != null) {
        submitlink.singleNodeValue.click();
    }
}
function click_checkbox() {
    var checkbox = document.evaluate ('//input[@name="force_check"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (checkbox.singleNodeValue != null && checkbox.singleNodeValue.checked == false) {
        checkbox.singleNodeValue.click();
    }
}


(function() {
    'use strict';

    var url = new URL(window.location.href);
    var cmd = url.searchParams.get("cmd_typ");
    //console.log(window.location.href);


    switch(cmd) {
        case "7" : // reschedule service
        case "17": // reschedule all services
        case "28": // enable notification for all services
        case "29": // disable notification for all services
            click_checkbox();
            click_submit();
    }

    switch(cmd) {
        case "5": // enable active checks for this service
        case "6": // disable active checks for this service
        case "22": // enable notifications for a service
        case "23": // disable service notifications
        case "25": // disable host notifications
        case "47": // enable active checks
        case "48": // disable active checks
        case "96": // reschedule host
            click_submit();
    }


    var oklink = document.evaluate ('//div[@class="infoMessage"]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

    if (oklink.singleNodeValue != null) {
        oklink.singleNodeValue.click();
    }
})();
