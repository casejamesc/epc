$(function() {
	// =========== DROPDOWNS ===========
	// === TOOLBOX ===
	$('.toolbox-btn').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		closeDropdowns(e, 'toolbox');
		toggleToolbox();
	});
	function toggleToolbox() {
		$('.toolbox-dropdown').slideToggle('fast');
	
		if ($('.toolbox-btn .arrow').css('transform') == 'none') {
			$('.toolbox-btn .arrow').css('transform', 'rotate(-90deg)');
		} else {
			$('.toolbox-btn .arrow').css('transform', 'none');
		}
	}
	// === SUBMENU === (this works bc the submenu is a child of li#parts-button)
	// $('li#parts-button').on('mouseenter mouseleave', function(e) {
	// 	$('ul#parts-submenu').fadeToggle('fast');
	// });
 
 	// =========== TOP-BAR ===========
	// === SEARCH ===
	$('.search').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		closeDropdowns(e, 'search');
		toggleSearch();
	});
	function toggleSearch() {
		$('.search-dropdown').fadeToggle('fast').focus().css('color', 'white');
		$('.search').toggleClass('active');
	}

	// === RECENT-HISTORY ===
	$('.history').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		closeDropdowns(e, 'recent-history');
		toggleRecentHistory();
	});
	function toggleRecentHistory() {
		$('.history').toggleClass('active');
		$('.history-dropdown').slideToggle('fast');
	}

	// === VIN ===
	$('.vin').on('focus blur', function(e) {
		$(this).toggleClass('active');
	});

	// === CART === 
	$('.cart, .view-cart').on('click', function(e) {
		// e.preventDefault();
		// e.stopPropagation();
		// closeDropdowns(e, 'cart');
		// toggleCart();
	});
	function toggleCart() {
	$('.cart').toggleClass('active');
		$('.cart-dropdown').fadeToggle('fast');

		if ($('.cart img').attr('src') == '..Content/images/cart.png') {
		    $('.cart img').attr('src', '..Content/images/cart-blue.png');
		} else {
		    $('.cart img').attr('src', '..Content/images/cart.png');
		}
	}

	// === CLOSE EXTENSIONS IF CLICKED ELSEWHERE ===
	$('body').on('click', function(e) {
		closeDropdowns(e);
	});
	function closeDropdowns(e, opening) {
		// === TOOLBOX ===
		if ($('.toolbox-dropdown').css('display') == 'block' && opening != 'toolbox') {	
			if ($(e.target).closest('.toolbox-dropdown').length !== 1) {
				e.preventDefault();
				e.stopPropagation();
				toggleToolbox();
			}
		}
		// === SEARCH ===
		if ($('.search-dropdown').css('display') == 'block' && opening != 'search') {	
			if ($(e.target).closest('.search-dropdown').length !== 1) {
				e.preventDefault();
				e.stopPropagation();
				toggleSearch();
			}
		}
		// === RECENT-HISTORY ===
		if ($('.history-dropdown').css('display') == 'block' && opening != 'recent-history') {	
			if ($(e.target).closest('.history-dropdown').length !== 1) {
				e.preventDefault();
				e.stopPropagation();
				toggleRecentHistory();
			}
		}
		// === CART ===
		if ($('.cart-dropdown').css('display') == 'block' && opening != 'cart') {	
			if ($(e.target).closest('.cart-dropdown').length !== 1) {
				e.preventDefault();
				e.stopPropagation();
				toggleCart();
			}
		}
	}

	//"disable" certain inputs, this is not the same as html disabling (which doesn't accept any events)
	// used this to make a text input behave as a select element (dropdown) without have a cursor appear
	$('input.disabled').focus(function() { 
		$(this).blur(); 
	});

	// =========== PAGE-SPECIFIC ===========
	//=== PARTS-SELECT ===
	// #parts-select
	// if ($('#parts-select-datatable #main-table').length) {
	// 	$('#parts-select-datatable #main-table').dataTable( {
	// 		// "sScrollY": "350px"
	// 		"bPaginate": false
	// 	});
	// }

	// === CART-LIGHTBOX ===
	// HIGHLIGHT VIN-BUTTON IN HEADER
	$('#cartlb-content .vin-wrapper input').on('focus blur', function(e) {
		$(this).toggleClass('active');
	});
	// UPDATE TOTALS 
	$('#cartlb-content .qty input').on('keyup', function(e) {
		// update each row total
		qty = $(this).val();
		price = $(this).closest('tr').find('.price-value').text();
		total = (qty * price).toFixed(2);
		$(this).closest('tr').find('.total-value').text(total); 

		// update section subtotal
		rows = $(this).closest('table').find('tbody tr').has('.total-value');
		subtotal = 0;
		rows.each(function() {
			subtotal += parseFloat($(this).find('.total-value').text());
		});
		console.log(subtotal);
		subtotal = subtotal.toFixed(2);
		$(this).closest('table').find('.subtotal-value').text(subtotal);
	});

	//=== YEAR ===
	// link to manager even if pending number (span) is clicked
	$('.year-pg .pending-number').on('click', function(e) {
		window.location.href = 'manager.html';
	});

	// UPTICK QTY EACH CLICK
	// dont change value if qty itself was clicked
	$('.parts-select-pg .part-link, .parts-select-pg .lost-sale, .parts-select-pg .qty').on('click', function (e) {
		e.stopPropagation();
	});
	// change qty value on row click
	$('.parts-select-pg td').on('click', function (e) {
	    if ($(this).closest('tr').has('.qty').length == 0) {
	        return;
	    }
	    oldValue = $(this).closest('tr').find('.qty').val();
	    newValue = parseInt(oldValue) + 1;
	    $(this).closest('tr').find('.qty').val(newValue).select();
	});
	// reset value to 0 when blank
	$('.parts-select-pg .main-table .qty').on('blur', function(e) {
		if ($(this).val() == '') {
			$(this).val('0');
		} 
	});

	//=== PART-TYPE ===
	// select table-cells, don't link 
	$('.part-type-pg .main-table a').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).toggleClass("active");
		checkForIsSelected($(this).siblings('.IsSelected')[0]);
		checkForSelections();
	});
    
	function checkForIsSelected(element) {
	    if (!element) return;
	    if (element.value == "True") {
	        element.value = "False";
	    } else {
	        element.value = "True";
	    }
	}
    
	function checkForSelections() {
		if ($('.main-table a.active').length == 0)	{
			$('.main-content .continue').addClass('non-link');
			$('.main-content .recommend').addClass('non-link');
		} else {
			$('.main-content .continue').removeClass('non-link');
			$('.main-content .recommend').removeClass('non-link');
		}
	}

	//=== CONDITIONS ===
	// PRE-SELECT LAST CHOICE FOR EACH CONDITION ON PAGE-LOAD
	$('.conditions-pg .condition').each(function(index) {
		//must check for no data from current session here first...
	    $(this).find('.options li:last-of-type input:radio').prop('checked', true);
	    $(this).find('.options li:last-of-type input:radio').siblings('.IsSelected')[0].value = 'True';
	});

	// CHECK FOR A SELECTION ON EACH CONDITION
	$('.conditions-pg input:radio').on('click', function(e) {
	    checkForRadioSelections();
	    $(this).parents('.options').find('li > input:radio').each(function () {
	        $(this).siblings('.IsSelected')[0].value = 'False';
	    });
	    checkForIsSelected($(this).siblings('.IsSelected')[0]); 
	});
    
	function checkForRadioSelections() {
		$('.conditions-pg .condition').each(function(index) {
			if ($(this).find('input:radio:checked').length == 0) {
				$('.continue').addClass('non-link');
				return;
			} 
		});
		//if all conditions have a radio:checked
		$('.continue').removeClass('non-link');
	}

	//=== CART LIGHTBOX ===
	if ($('.cartlb-btn.fancybox').length) {
		$('.cartlb-btn.fancybox').fancybox({
			wrapCSS		: 'cartlb',
			openEffect  : 'fade',
			closeEffect : 'none',
			autoSize    : false,
			modal		: false,
			width       : 840,
			minWidth	: 840,
			height      : 1270,
			minHeight   : 1270,
			padding		: 25,
			helpers : {
				overlay : {
					css : {
						'background' : 'hsla(0, 0%, 10%, 0.8)'
            		}
        		}
    		}
    	});
	}

	//=== CHECK-IN LIGHTBOX ===
	if ($('.cilb-btn.fancybox').length) {
		$('.cilb-btn.fancybox').fancybox({
			wrapCSS		: 'cilb',
			openEffect  : 'fade',
			closeEffect : 'none',
			autoSize    : false,
			modal		: true,
			width       : 416,
			minWidth	: 416,
			height      : 273,
			minHeight   : 273,
			padding		: 25,
			helpers : {
				overlay : {
					css : {
						'background' : 'hsla(0, 0%, 10%, 0.8)'
            		}
        		}
    		}
    	});
	}

	//=== REC-WIZARD LIGHTBOX ===
	if ($('.rwlb-btn.fancybox').length) {
		$('.rwlb-btn.fancybox').fancybox({
			wrapCSS		: 'rwlb',
			openEffect  : 'fade',
			closeEffect : 'none',
			autoSize    : false,
			modal		: true,
			width       : 840,
			minWidth	: 840,
			height      : 525,
			minHeight   : 525,
			padding		: 25,
			helpers : {
				overlay : {
					css : {
						'background' : 'hsla(0, 0%, 10%, 0.8)'
            		}
        		}
    		}
    	});
	}

	$('#rwlb-content .cancel, #rwlb-content .continue').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$.fancybox.close();
	});
});

$(window).load(function() {
	// =========== PLUGIN INITS ===========
    // === LIGHTBOX & SLIDESHOW(must be here, when images are fully loaded) ===
	if ($('.ihlb-btn.fancybox').length) {
		$('.ihlb-btn.fancybox').fancybox({
			openEffect  : 'fade',
			closeEffect : 'none',
			autoSize    : false,
			width       : 800,
			height      : 480,
			showCloseButton : true,
			helpers 	: {
				overlay : {
					css : {
						'background' : 'hsla(0, 0%, 10%, 0.8)'
            		}
        		}
    		},
			afterLoad   : function() {
				// this.content = this.content.html();
				$('.flexslider').flexslider({
					animation: "fade",
					controlNav: "thumbnails",
					startAt: 0,
					start: function () {
                		$("#product-slideshow").show() // make parent container visible
            		}
				});
			}		
		});
	}

});