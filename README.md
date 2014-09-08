Front-end code was placed under ASP.NET backend

Notes: 
  - many site features are only present on year.html
  - fancybox plugin with embedded woothemes flexslider
  - interactive cart (year.html), product view, catalog (parts-select.html)
  
Problems:
  - flexslider had inconsistant behavior
    must be placed in window.load() not document.ready()!! Assets (images) aren't necessarily loaded by the time document.ready fires
  - gradient background filled the entire viewport, but did so by repeating. By default: <body> and <html> background images (gradient) fill the html element and then "flood the rest of the viewport" by repeating.
    applied background to a descendant div that covered entire canvas
  - responsive table, sizing issues
