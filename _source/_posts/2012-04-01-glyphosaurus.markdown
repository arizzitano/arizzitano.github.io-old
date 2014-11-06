---
layout: post
title:  "Glyphosaurus"
subtitle: "searchable letterform database"
image: "glyphosaurusThumb.jpg"
date:   2012-04-01 00:00:00
categories: work
size: 1
---

Glyphosaurus is a typographic database for sharing and discovering letterforms from around the world. It provides an easy interface for uploading, cropping, and tagging images of letterforms. Users can browse and search (by letters or tags), follow other users, and favorite glyphs.

The application is built on Django with masonry.js on the frontend. Users can authenticate via Twitter or Facebook with OAuth (or just use their own emails). I used PIL for cropping, resizing, and processing user-submitted images. Images are batch uploaded to S3 with boto. We also created a mobile app in Phonegap, but it didn't get approved for the iOS App Store. Tough luck.

<ul class="workMeta">
    <li class="link"><a href="http://glyphosaurus.com" target="_blank">http://glyphosaurus.com</a></li>
    <li class="company">Upstatement</li>
    <li class="builtWith">Django, masonry.js, PIL, OAuth, Phonegap</li>
    <li class="role">lead developer, project manager</li>
    <li class="readMore"><a href="http://upstatement.com/portfolio/glyphosaurus" target="_blank">Upstatement portfolio writeup</a></li>
</ul>
