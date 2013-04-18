Showfavicons <img src="http://stillmaintained.com/dreur/JQuery-Showfavicons-Plugin.png"/>
============
A jQuery plugin for displaying a favicon on links. Uses [getFavicon](http://getfavicon.appspot.com/ "getFavicon") to transfer *.ico to *.png.

**Version 1.1 - August 8th, 2011**

As seen on [http://plugins.jquery.com/showfavicons/](http://plugins.jquery.com/showfavicons/ "the JQuery website")

**Author:** Benjamin Boudreau ([bboudreau.ca/](http://bboudreau.ca/ "Author Homepage"))

## Usage :
    // To show external links
    $.showfavicons('external');

    // To show internal links
    $.showfavicons('internal');

    // To show both types of links
    $.showfavicons();

    // Ignoring other hostnames on external
    $.showfavicons('external', {hosts : [ 'wiki.bboudreau.ca', 'foo.bboudreau.ca' ] })

    // Adding other hostnames on internal
    $.showfavicons('internal', {hosts : [ 'wiki.bboudreau.ca', 'bar.bboudreau.ca' ] })

    // Ignoring other hostnames on external and setting the default favicon
    $.showfavicons('external', { hosts: [ 'bboudreau.ca' ], defaultFavicon : 'images/external.gif' });

    // Ignoring other hostnames on external and setting the debug flag to see which links are getting a favicon
    $.showfavicons('external', { hosts: [ 'bboudreau.ca' ], debug : true });

## Options :
    defaultFavicon : 'external.gif' // Default favicon when/if getfavicon app is offline.
    hosts : []                      // Array containing hostnames to include on internal or to exclude on external.
    debug : false                   // Boolean to show which links are getting faviconized.

## Plans
- Support defaultImage of getFavicon by Jason Cartwright
- Support the multiple domains feature of getFavicon to overcome the browser connection limits to  [Example creating a random string](http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript)
- Fix getFavicon's bug : Sometimes doesn't get the correct favicon when there are multiple favicons per domain (http://twitter.com/mydogminton/status/2374789273)
  - At first guess it seems that it should get the complete link of the icon instead of adding the icon link to the base url.

## Inspired by
- [getFavicon](http://getfavicon.appspot.com/) by Jason Cartwright [Source](https://potato.codebasehq.com/getfavicon/overview) [Source](https://github.com/potatolondon/getfavicon)
-  [JQuery Faviconize](http://www.babylon-design.com/share/faviconize) by Samuel Le Morvan
