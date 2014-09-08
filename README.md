Front-end code placed under ASP.NET backend

Note: many features are only visible on year.html

Features:
  - fancybox plugin with embedded woothemes flexslider
  - interactive cart (year.html), catelog (parts-select.html)
  
Problems:
  - flexslider inconsistant behavior
    must be placed in window.load() not document.ready()!! Assets (images) aren't necessarily loaded by document.ready
  - gradient background that fills the entire viewport, by default: body and html background images (gradient) fill the html element and then "flood the rest of the viewport" by repeating.
    applied background to a descendant div
  - responsive table, sizing issues
