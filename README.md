
linkedtv_news
=============

in progress!!!

LinkedTV News is a prototype for a second screen applications.

A webservice for the communication between the mainscreen and the secondscreen, peerbindserver.js

node peerbindserver.js

The static file you can serve through any httpd server (e.g. Apache). For testing the server directory includes a simple node js web server based on connect.js. First install connect.js

npm install connect

Now run the web server 

node webserver.js

You now have a webserver at port localhost:8080

The mainscreen is available at:

http://localhost:8080/mainscreen.html

The secondscreen at http://localhost:8080


It comes with an example video from the openimages collection of the Netherlands Institute for Sound&Vision (creative commons license).
http://openbeelden.nl/media/2536/Nieuws_uit_de_West_Paramaribo

In two places you need to add your google api key
mainscreen.html
index.html
search for {YOUR Google API key}