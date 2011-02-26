# Showfavicons
A jQuery plugin for displaying a favicon on links. Uses (getFavicon)[http://getfavicon.appspot.com/] to transfer *.ico to *.png.

**Version 1.0 - Feb 26th, 2011**

**Author:** Benjamin Boudreau ((http://bboudreau.ca/)[http://bboudreau.ca/])

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

## TODO:
- Support defaultImage of getfavicon by Jason Cartwright
- Fix getfavicon's bug : Sometimes doesn't get the correct favicon when there are multiple favicons per domain (http://twitter.com/mydogminton/status/2374789273)
- At first guess it seems that it should get the complete link of the icon instead of adding the icon link to the base url.

## Inspired by:
- [getFavicon](http://getfavicon.appspot.com/) by Jason Cartwright [Source](https://potato.codebasehq.com/getfavicon/overview)
-  [JQuery Faviconize](http://www.babylon-design.com/share/faviconize) by Samuel Le Morvan