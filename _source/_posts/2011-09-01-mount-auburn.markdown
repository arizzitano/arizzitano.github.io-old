---
layout: post
title:  "Mount Auburn"
subtitle: "responsive site with multiple api hookins"
image: "mountauburnThumb.jpg"
date:   2011-09-01 00:00:00
categories: work
size: 2
---

Upstatement created the website for Mount Auburn Cemetery, a historical site and nonprofit located in Cambridge, MA. As primary developer on the project, I was responsible for building out the site in WordPress, styling the pages from mockups, and building some fun JS widgets, but the most interesting parts of the project were the API tie-ins.

Mount Auburn has an on-premise touchscreen kiosk visitors can use to locate specific graves. The kiosk's software was custom-built and undocumented. I managed to 1) determine how to pass queries to its endpoints from an AJAX search interface, 2) parse the response, 3) translate the proprietary geographic coordinates from the response to standard lat/lon, and 4) display the grave location on Google Maps.

Additionally, the Friends of Mount Auburn host numerous events. Site administrators needed a tool that would allow them to create ticketed events. I wrote custom WordPress functionality to hit the Eventbrite API, so site administrators could create, modify, and monitor events from within their own admin panel. The site also retrieves data from Mount Auburn's on-premise weather station.

<ul class="workMeta">
    <li class="link"><a href="http://mountauburn.org" target="_blank">http://mountauburn.org</a></li>
    <li class="company">Upstatement</li>
    <li class="role">primary developer</li>
    <li class="builtWith">JS, jQuery, PHP, SASS</li>
</ul>
