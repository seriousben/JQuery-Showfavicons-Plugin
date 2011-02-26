/**
 * Showfavicons
 * A jQuery plugin for displaying a favicon on links.
 * 
 * Version 1.0 - Feb 26th, 2011
 *
 * Author: Benjamin Boudreau (http://bboudreau.ca/)
 * Source: https://github.com/dreur/JQuery-Showfavicons-Plugin
 *
 * Usage:
 * <code>
 * To show favicons on external links
 *  $.showfavicons('external');
 *  // To show favicons on internal links
 *  $.showfavicons('internal');
 *  // To show favicons on both types of links
 *  $.showfavicons();
 *  // Ignoring other hostnames on external
 *  $.showfavicons('external', {hosts : [ 'wiki.bboudreau.ca', 'foo.bboudreau.ca' ] }
 *  // Adding other hostnames on internal
 *  $.showfavicons('internal', {hosts : [ 'wiki.bboudreau.ca', 'bar.bboudreau.ca' ] })
 *  // Ignoring other hostnames on external and setting the default favicon
 *  $.showfavicons('external', { hosts: [ 'bboudreau.ca' ], defaultFavicon : 'images/external.gif' });
 *  // Ignoring other hostnames on external and setting the debug flag to see which links are getting a favicon
 *  $.showfavicons('external', { hosts: [ 'bboudreau.ca' ], debug : true });
 * </code>
 *
 * Options:
 * <code>
 *   defaultFavicon : 'external.gif' // Default favicon when/if getfavicon app is offline.
 *   hosts : []                      // Array containing hostnames to include on internal or to exclude on external.
 *   debug : false                   // Boolean to show which links are getting faviconized.   
 * </code>
 *
 * TODO:
 *  - Support defaultImage of getfavicon by Jason Cartwright
 *  - Fix getfavicon's bug : Sometimes doesn't get the correct favicon when there are multiple favicons per domain (http://twitter.com/mydogminton/status/2374789273)
 *     - At first guess it seems that it should get the complete link of the icon instead of adding the icon link to the base url.
 * 
 * Inspired by:
 *  - http://getfavicon.appspot.com/ by Jason Cartwright (https://potato.codebasehq.com/getfavicon/overview)
 *  - JQuery Faviconize by Samuel Le Morvan (http://www.babylon-design.com/share/faviconize)
 *
 **/
(function( $ ){

  var $defaultIgnoredPatterns= [ "[href^='#']", ":has(img)", "[href^='file://']" ]
  var $defaultInternalPatterns= [ "[href^='/']" ]
  var $defaultInternalHosts= [ top.location.host.toString() ]
  var $defaultSettings = {
    'defaultFavicon' : "external.gif",
    'hosts' : [],
    'debug' : true
  };

  $.showfavicons = function( method, options ) {  

    var settings= $.extend( {}, $defaultSettings, options );
    
    var methods = {
      internal : function( ) {
        var defaultIgnoredPatternString= '';
        $($defaultIgnoredPatterns).each(function(index, pattern) {
          defaultIgnoredPatternString+= ":not("+pattern+")";
        });
        
        var internalHostList= $.merge($.merge([], $defaultInternalHosts), settings.hosts);
        var patternString='';
        $(internalHostList).each(function(index, host) {
          host= $.trim(host);
          if (host.length != 0) {
            patternString+= "a[href*="+ host +"]" + defaultIgnoredPatternString;
          }
        });        
        
        return patternString;
      },
      external : function( ) {
        var ignoredHostList= $.merge($.merge([], $defaultInternalHosts), settings.hosts);
        
        var patternString='a';
        $(ignoredHostList).each(function(index, host) {
          host= $.trim(host);
          if (host.length != 0) {
            patternString+= ":not([href*="+ host +"])";
          }
        });
        
        var ignoredPatternList= $.merge($.merge([], $defaultInternalPatterns), $defaultIgnoredPatterns);
        $(ignoredPatternList).each(function(index, pattern) {
          patternString+= ":not("+pattern+")";
        });
        return patternString;
      },
      all : function( ) {
        var defaultIgnoredPatternString= '';
        $($defaultIgnoredPatterns).each(function(index, pattern) {
          defaultIgnoredPatternString+= ":not("+pattern+")";
        });
      
        return "a" + defaultIgnoredPatternString;
      }
    };
    
    function append(element, url) {
      var img = document.createElement("img");
			img.className = "showfavicons";
			var protocol= (top.location.protocol == 'file:' ? 'http:' : '')
			var imgSrc = protocol + "//getfavicon.appspot.com/"+encodeURIComponent(url);
			img.setAttribute("src",imgSrc);
			img.setAttribute("style","border:0 none;height:12px;width:12px;padding:0 4px;");
			img.onerror = function () {
				this.src = settings.defaultFavicon;
			}
			element.after(img);
    }
    
    method= $.trim(method)
    
    if (!method || method.length == 0) {
      method= "all"
    }
    
    if ( methods[method] ) {
      var selectors= methods[ method ].apply( this );
      if (typeof console !== 'undefined' && settings.debug) {
        console.debug( '(jQuery.showfavicons)[DEBUG]{'+method+'} Showing favicons for "' + selectors + '"' );
      }
      $(selectors).each(function(){
        if ($('img', this).length == 0) {
          append($(this), this.protocol + '//' + this.hostname);
        }
      });
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.showfavicons' );
    }
  };
})( jQuery );
