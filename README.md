Front-end code was placed under ASP.NET backend

Site layout:
  - index
  - year
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
  - many links, etc are only functional on year.html
  - fancybox plugin with embedded woothemes flexslider
  - interactive check-in, cart, product view, catalog

Problems:
  - flexslider had inconsistant image loading
    must be placed in window.load() not document.ready()!! Assets (images) aren't necessarily loaded by the time document.ready fires
  - gradient background filled the entire viewport, but did so by repeating. By default: <body> and <html> background images (gradient) fill the html element and then "flood the rest of the viewport" by repeating.
    applied background to a descendant div that covered entire canvas
  - responsive table, sizing issues



![Login Screenshot](https://github.com/casejamesc/epc/blob/master/images/screenshots/1.jpg "login")

![Check In Screenshot](https://github.com/casejamesc/epc/blob/master/images/screenshots/2.jpg "check-in")

![Parts Select Screenshot](https://github.com/casejamesc/epc/blob/master/images/screenshots/3.jpg "parts-select")
