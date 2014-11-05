---
layout: post
title:  "Tomquest: How I Used Django to Throw a Kickass Party"
date:   2012-09-05
categories: writing
summary: "Rundown of django_scavenger, the Django app I wrote for creating secure, customizable scavenger hunts, such as Tomquest."
---

[Tomquest](http://www.tomquest2012.com/) is a city-wide scavenger hunt that I built specifically for my boyfriend Tom's 24th birthday. To handle the clues, I built a Django app that Tom accessed from his phone while on the hunt. I've been putting together scavenger hunts since I was a kid – sending my little brother around the house, entertaining friends at birthday parties, keeping kids busy at summer camp – and I drew inspiration from all of these hunts when coming up with the framework for Tomquest.

Scavenger hunts are usually pretty simple. In one version, which is usually competitive, you have to collect several unrelated items or clues and bring them to a predetermined endpoint for judging. In the other, linear version, which can also be competitive, you seek out clues in sequential order in order to reach a prize at the end. I wanted to make Tom a linear scavenger hunt, and I wanted to send him out to do it all by himself (so we could all surprise him at the end).

Scavenger hunts in controlled environments (like your backyard) are very easy to plan. However, when you have to plan your hunt around a city full of other people, a scavenger hunt becomes quite an interesting problem.

My first idea was to draw or print cool, artsy clue cards. No tech, just pretty clues that could maybe be framed or go into a scrapbook or something. This is very basic – it's how most scavenger hunts work. My inner engineer, sensing security flaws, vetoed this system. What if somebody that wasn't Tom found a clue and decided to follow it? What if Tom found a clue out of sequence and could thus "cheat"?

The solution here was to require the entire set of clues to be collected in order to reach the endpoint. There were a number of ways to do this.

1. I could treat each clue like a physical puzzle piece, maybe with an image or words on the back, so when they were all assembled, the endpoint clue would be revealed. Too easy to guess.
2. I could stick a letter or number in with each clue so the name of the endpoint would be spelled out when it was done, kind of like [these elementary school math worksheets](http://www.educational-freeware.com/images/store/riddle_worksheet.jpg). Again, too easy to guess.
3. I could follow the same process as #2, but use a cipher to encode the name of the endpoint and leave the key with the last clue. Too complicated. Not user-friendly.

These were better than the first idea, but still subject to curious randos finding the clues and following them or otherwise messing things up. I also wanted to run one of the clues as a fake ad in our favorite alt-weekly [the Dig](http://digboston.com/), and if the full text of a clue went in there, I ran a big risk of someone else finding and following it.

Furthermore, corraling people to the party beforehand would be a problem as well. I planned to do a dry run of the hunt beforehand by myself, to get a rough estimate of how long it might take Tom. Our friends were all coming in from different directions, some walking, some taking the T, some biking, some driving. What if people didn't show up on time? If there were only a few people to yell "surprise," Tom would be disappointed. Conversely, if Tom took way too long to finish the hunt, our friends would get bored waiting. I could have someone go with him and text everyone every so often to say where they were, but I figured that would take away a good deal of the fun.

Hold on, hold on. It's 2012. Smartphones exist. I am a developer. And coding up a mobile site or app to handle this would make it a whole lot easier. Once I realized this, everything began falling into place.

My ultimate solution was as follows. Each clue consists of two main pieces: a written hint telling Tom where to find the next clue, and a keyword. Each keyword unlocks the next clue in the sequence: to view clue #4, Tom must present keyword #3. (I emailed him the first keyword.) At each location, I hid a slip of paper printed with the next clue's keyword and a QR code pointing to the current clue's URL. The page at that URL would ask Tom for the keyword he'd picked up at his last location, and once he submitted it correctly, it would display the written hint. To prevent him from cheating with URLs (e.g. trying /clue/3 or /clue/olecito), I used random hashes for URL slugs. Believe me, it sounds a lot more complicated than it is.

I built the application in Django in my spare time over a couple of weeks. Aesthetics were not important, but mobile usability was key, so I used jQuery Mobile and its default skin. Storage and server ops were not important, either, so I served it off a single Heroku dyno. The application is extraordinarily simple. I used [is.gd](http://is.gd/) to shorten the URLs so I could guarantee scannable QR codes, found a free API to generate QR codes at [qrserver.com](http://qrserver.com/), and just sent the emails with send_mail() using a dedicated Gmail address. Since my old janky phone no longer syncs email, I used [IFTTT](http://ifttt.com/) to text me instead (I had grand plans of using IFTTT for all the party guests, but you can only have one phone number per account).

Things I would have done differently, and will probably add later:

* Use users and groups to handle the clue notification lists
* Enable party guests or hunt followers to sign themselves up for notifications
* Broaden the application so teams can also participate
* Require hunters to either create accounts, or set a cookie for their names, in order to customize emails and only send an email the first time they unlock a clue
* Integrate Twilio to send text messages rather than (or in addition to) emails
* Output a printable PDF of all the clues, to make things easier for the admin
* Maybe do something with continuous location tracking (although this would probably kill a phone's battery quickly)
* Hook into Twitter/Facebook and Google Maps so the world can follow along with the hunt

The code for the Django app is [available on Github](https://github.com/arizzitano/django_scavenger), although it is still fairly rough around the edges. If you're interested in how the hunt went IRL, check out [Tomquest, part 2: The surprise]({% post_url 2012-09-10-tomquest-part-2-the-surprise %})!
