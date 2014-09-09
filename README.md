Front-end code was placed under ASP.NET backend

Site layout:
  - index
  - year.html
    - check-in
      - select, edit, add
    - cart
      - preview
      - product view (product link)
    - manager, inspector (left-dropdown)
  - make
  - model
  - category
  - sub-category
  - part-type
    - recommendation
  - parts-select
  
Notes:
  - fancybox plugin with embedded woothemes flexslider
  - interactive check-in, cart, product view, catalog

Problems:
  - flexslider had inconsistant image loading
    must be placed in window.load() not document.ready()!! Assets (images) aren't necessarily loaded by the time document.ready fires
  - gradient background filled the entire viewport, but did so by repeating. By default: <body> and <html> background images (gradient) fill the html element and then "flood the rest of the viewport" by repeating.
    applied background to a descendant div that covered entire canvas
  - responsive table, sizing issues
