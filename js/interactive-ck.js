$(function(){$(".row").on("click",function(){$(".row").next().removeClass("active");$(this).next().slideToggle();$(this).next().toggleClass("active")})});