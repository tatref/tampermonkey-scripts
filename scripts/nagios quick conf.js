// ==UserScript==
// @name         nagios quick conf
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add a link to the services configuration
// @author       tatref
// @match        http*://*/nagios/cgi-bin/extinfo.cgi*
// @grant        none
// ==/UserScript==




(function() {
    'use strict';

    var url = new URL(window.location.href);
    var cmd = url.searchParams.get("type");
    //console.log(window.location.href);


    switch(cmd) {
        case "1" : // host status
        case "2" : // service status
            var current_host = url.searchParams.get("host");

            var linkBox = document.evaluate ('//td[@class="linkBox"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

            var br = document.createElement("br");
            linkBox.singleNodeValue.appendChild(br);
            linkBox.singleNodeValue.appendChild(br.cloneNode(true));

            var e = document.createElement("a");
            e.setAttribute("href", "config.cgi?type=services&expand=" + current_host);
            e.innerText = "Service configuration";
            linkBox.singleNodeValue.appendChild(e)

    }

})();
