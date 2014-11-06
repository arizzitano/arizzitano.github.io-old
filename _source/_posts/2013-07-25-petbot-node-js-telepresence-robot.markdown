---
layout: post
title:  "Introducing PETBOT: A Node.js Telepresence Robot"
date:   2013-07-25
categories: writing
summary: "How I designed, hacked, modded, programmed, and built a telepresence robot that runs on Node.js, a Raspberry Pi, and plenty of love."
---

_This post [originally appeared](http://www.appneta.com/blog/telepresence-robot/) on the AppNeta blog._

Recently we added a new member to our engineering team. This is PETBOT, aka Providence Engineering Telepresence roBOT.

<img class="center" src="/img/posts/petbotlogo.jpg" alt="PETBOT in its natural habitat" />

Here it is in action:

<div class="embed">
    <iframe width="560" height="315" src="//www.youtube.com/embed/Um5w7s2qQt8" frameborder="0" allowfullscreen></iframe>
</div>

It's a telepresence robot I built for our office, consisting of an iPad mounted on a lightweight chassis powered by an RC car. To operate it, you open up a video chat session with the iPad, then control the robot from your browser using the web interface.

PETBOT can see, move, talk, and, like any startup employee, play foosball. Or at least try to.

<img class="center" src="/img/posts/petbot8.jpg" alt="PETBOT vs. Ari" />

The car is controlled by a radio transmitter wired to a Raspberry Pi running a local node.js server. Commands are sent via socket.io through a web UI & second node.js server hosted remotely on Heroku. The local server connects to the remote server as a socket.io client, thus allowing commands to be sent to the Pi from anywhere in the world with very low latency.

I originally made the circuit and local server for Arduino, but without an expensive wifi shield, PETBOT's range was limited to the range of the radio transmitter. To remedy this, I wired it up to my wifi-enabled Raspberry Pi instead. Most of the time, the Pi stays plugged into the wall and powers the transmitter from there, but if we want to send PETBOT further away (say, to other floors in the building), we can mount the Pi and transmitter directly on PETBOT and run it off battery power.

### The Idea

Here at AppNeta, we have engineering teams in Boston, Providence, and Vancouver, plus remote employees in various locations. Although we're big on asynchronous communication (via HipChat, Github, etc.), chatting face to face is still important, so we do a lot of videoconferencing. In our Boston office, we share a persistent VSee window with Providence.

Recently our team acquired a couple of iPads. We joked about making our own telepresence robot: duct taping an iPad to a Segway or a Roomba. But while sitting in a meeting one afternoon, it occurred to me that this really wouldn't be so hard to make. A remote control car could probably be controlled from an Arduino or Raspberry Pi, and it couldn't be too hard to control the board over the web.

A few weeks ago I stopped into Radio Shack and that's when I spotted it. The Desert Blaster. A large, sturdy RC car, marked down from $80 to $11. It was a sign. I HAD to build it.

<img class="center" src="/img/posts/petbot1.jpg" alt="Unboxed Desert Blaster" />

### The Circuit

I brought the Desert Blaster home and immediately began dismantling it. Once I got to the board inside the remote I discovered the car's signals were controlled by sliding switches:

<img class="center" src="/img/posts/petbot2.jpg" alt="Desert Blaster controls" />

I soldered leads to the connections, then routed them through transistors to translate the action of the sliding switches to the I/O ports of the Arduino or Pi.

<img class="center" src="/img/posts/petbot3.jpg" alt="Hacking the control board" />

Originally I set up the circuit with the Arduino in mind, but it works just as well with the Raspberry Pi's GPIO pins. Here's a schematic:

<img class="center" src="/img/posts/petbot4.jpg" alt="Circuit diagram" />

Remotes probably vary for different RC car models, so this may not work for everyone, but it was easy enough to figure out with my trusty multimeter!

### The Application

Before going through the trouble of building a case for the car, I wanted to make sure that I could control it over the web with latency comparable to a video chat program. Socket.io on node.js seemed like a good starting point, due to its ease in passing messages between browsers and servers. For the Arduino, I used [duino](https://github.com/ecto/duino) to facilitate PC-to-Arduino communication; for the Pi, i used [pi-gpio](https://github.com/rakeshpai/pi-gpio).

I got a single test server running on my laptop to serve the page, catch user events, and translate them to Arduino signals. This was only partly useful, however — it could control PETBOT from my local machine, but not from Providence. I needed two servers: one remote to serve the controller page and catch the user-initiated events, and one local to receive the events and route them to the Arduino.

I set up a remote server to re-broadcast the user input events from the control page and deployed it to Heroku. The local server connects to the remote one as a client, allowing it to catch the relayed user events. Even over the web, latency remained pretty low.

If you're interested in the specifics of how the servers work together, the code is [available on Github](https://github.com/arizzitano/petbot) for your perusal.

### The Chassis

Finally came the problem of designing a chassis. It had to be fairly lightweight, so it wouldn't slow or weigh down the car. But it also had to be sturdy, since if I broke the company iPad it would be coming out of my paycheck. It had to be tall enough to make eye contact, but it also needed a fairly low center of gravity.

I used some scrap particle board held together with carriage bolts to build the chassis. Someday I will own a circular saw...

<img class="center" src="/img/posts/petbot5.jpg" alt="Building the chassis" />

The first design I built was very unstable. The [iPad clip](http://www.amazon.com/Talent-iMS-1-Music-Stand-Holder/dp/B007K7JTY4) was bulky and off-center, and the iPad was much heavier than I'd anticipated. Although I'd fixed extension springs to the post, its high center of gravity caused it to wobble uncontrollably. The car's single-speed, high-torque motor, combined with its loose shocks and soft tires, didn't help matters.

I iterated on this design a few more times, trying various different configurations of springs, post placement, ballast, and iPad until I reached a decent solution:

<img class="center" src="/img/posts/petbot_diagram.jpg" alt="How it works" />

Sacrificing adjustability for balance and lightness, I removed most of the iPad clip, screwing the bracket directly to the post. The springs attach to the car itself, rather than the top deck. I tightened the front shocks with some tiny compression springs. Most importantly, I added two skid plates underneath the bottom deck to catch the car when it tilted too far in either direction.

The box the iPad clip came in was the perfect size to attach between the top and middle decks as an optional housing for the Pi assembly. I extended the hookup cable for the car's battery pack and stored that in there as well. Eventually, I'd like to run both devices off one power source. The police light is just for fun – I had it kicking around in my stash of junky USB devices.

### The Verdict

PETBOT is a motley mongrel, by no means comparable to its consumer market peers in form factor or general coolness. It's the Wall-E to [Double Robotics'](http://www.doublerobotics.com/) Eve. But for short money (I spent under $100), it does basically the same thing as its telepresence brethren for a fraction of the cost. It does the job, it has personality, and most importantly, it's customizable. If our team, or anyone really, wants to improve upon it or build in office-specific features, PETBOT is an open book.

And PETBOT is far from finished — there's plenty of room for improvement, both for our model, and anyone else who might want to build one. Our team has already started contributing code as well as some great suggestions. With a team of engineers to help perfect it, PETBOT will be thinking for itself in no time.

### Parts List

Chassis:

* [Desert Blaster](http://www.toysrus.com/buy/vehicles-hobby-r-c/vehicles-play-sets/cars/fast-lane-desert-blaster-1-12-scale-radio-control-vehicle-red-5f5f2e8-12925247)
* Two packages of assorted extension springs
* Two small compression springs
* 4 – 8" carriage bolts
* 12 – 3/8" nuts
* 12 – 3/8" washers
* scrap plywood
* 4' x 1" round dowel
* 4' x 1/2" square dowel
* package of screw hooks
* iPad bracket
* scrap cardboard

Circuit:

* Desert Blaster Remote
* 4 NPN transistors
* 8 1K&#937; resistors
* Mini breadboard
* Hookup wire & solder
* EITHER:
    * Arduino (I used my old Duemilanove) & USB cable, or
    * Raspberry Pi with wifi dongle & power supply (USB cable/wallwart or battery pack like [this one](http://www.amazon.com/Gomadic-Advanced-Raspberry-Battery-Charge/dp/B00BR22W0Q/))
