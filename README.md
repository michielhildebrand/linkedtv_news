
linkedtv_news
=============

LinkedTV News is a prototype for a second screen applications.

The files for the Web application can be served through any httpd server (e.g. Apache). The can also be served with a simple node js server included with this repository. First install connect.js version 3.

npm install connect
npm install serve-static

Now run the web server 

node webserver.js

You now have a webserver at port localhost:3000

The mainscreen is available at:

http://localhost:3000/mainscreen.html

The secondscreen at http://localhost:8080

For the synchronisation between the mainscreen and the secondscreen we provide an instance of the peerbindserver.js (https://github.com/lsl/peerbind). Start this service as:

node peerbindserver.js

You can configure the application in the config.js file. Add the video that is played on the mainscreen, the json containing the data the location of the peerbindserver and a googleAPIKey activate for the map service.

It comes with an example video from the openimages collection of the Netherlands Institute for Sound&Vision (creative commons license).
http://openbeelden.nl/media/2536/Nieuws_uit_de_West_Paramaribo. It also contains an example data file in json/example.json