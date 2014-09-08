$(function() {
	//====== INITIALIZATION =======
	
	// ====== EXPANSIONS ======
	// === TRIGGER ===
	$('.exp-trigger').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		closeOpenExpansionsExceptClicked($(this));
		toggleExpansion($(this).closest('.expansion'));
    });
	// === TOGGLE ===
	function toggleExpansion(expansion) {
		// DROPDOWNS 
		if ( $(expansion).hasClass('dropdown') ) {
			$(expansion).find('.exp-content').slideToggle('fast', function() {
				$(expansion).toggleClass('open-expansion');
			});
		}
		// TOOLBOX 
		if ( $(expansion).hasClass('toolbox') ) {
			$(expansion).find('.exp-content').slideToggle('fast', function() {
				$(expansion).toggleClass('open-expansion');
			});
			if ($(expansion).find('.exp-trigger .arrow').css('transform') === 'none') {
				$(expansion).find('.exp-trigger .arrow').css('transform', 'rotate(-90deg)');
			} else {
				$(expansion).find('.exp-trigger .arrow').css('transform', 'none');
			}
		}
		// SEARCH 
		if ( $(expansion).hasClass('search') ) {
			$(expansion).toggleClass('active').find('.exp-content').fadeToggle('fast', function() {
				$(expansion).toggleClass('open-expansion');
			});
		}
	}
	// === CLOSE OPEN DROPDOWNS, UNLESS CLICKED INSIDE AN EXPANSION ===
    $('body').on('click', function(e) {
		if ( !$(e.target).hasClass('exp-content') ) {
			closeOpenExpansionsExceptClicked();
		}
	});
	function closeOpenExpansionsExceptClicked(clicked) {
		$('.open-expansion').each(function() {
			// don't try to close expansion if its trigger was just clicked
			if ( clicked && $(this).is(clicked.closest('.expansion')) ) {
			} else {
				toggleExpansion(this);
			}
		});
	}
	
	// ====== TOP-BAR ======
	// === VIN ===
	$('.vin').on('focus blur', function() {
		$(this).toggleClass('active');
	});

	//"disable" certain inputs, this is not the same as html disabling (which doesn't accept any events)
	// used this to make a text input behave as a select element (dropdown) without have a cursor appear
	$('input.no-cursor').focus(function() {
		$(this).blur();
	});

	// =========== PAGE-SPECIFIC ===========
	//=== YEAR ===
	// link to manager even if pending number (span) is clicked
	$('.pending-number').on('click', function() {
		window.location.href = 'manager.html';
	});

	// UPTICK QTY EACH CLICK
	// dont change value if qty itself was clicked
	$('.parts-select-pg .qty').on('click', function(e) {
		e.stopPropagation();
	});
	// change qty value on row click
	$('.parts-select-pg td').on('click', function() {
		if ($(this).has('.part-link').length > 0 || $(this).closest('tr').has('.qty').length === 0) {
			return;
		}
		var oldValue = $(this).closest('tr').find('input').val();
		var newValue = parseInt(oldValue) + 1;
		$(this).closest('tr').find('input').val(newValue).select();
	});
	// reset value to 0 when blank
	$('.parts-select-pg .main-table .qty').on('blur', function() {
		if ($(this).val() === '') {
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
		if ($('.main-table a.active').length === 0) {
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
	    $(this).find('input:radio:last-of-type').prop('checked', true);
	    $(this).find('.options li:last-of-type input:radio').siblings('.IsSelected')[0].value = 'True';

	});

	// CHECK FOR A SELECTION ON EACH CONDITION
	$('.conditions-pg input:radio').on('click', function (e) {
	    checkForRadioSelections();
	    $(this).parents('.options').find('li > input:radio').each(function () {
	        $(this).siblings('.IsSelected')[0].value = 'False';
	    });
	    checkForIsSelected($(this).siblings('.IsSelected')[0]);
	});

	function checkForRadioSelections() {
		$('.conditions-pg .condition').each(function() {
			if ($(this).find('input:radio:checked').length === 0) {
				$('.continue').addClass('non-link');
				return;
			}
		});
		//if all conditions have a radio:checked
		$('.continue').removeClass('non-link');
	}

	// =========== CART ===========
	// EXPAND/COLLAPSE SECTIONS
	$('#cartlb-content section header').on('click', function() {
		if ( $(this).closest('section').find('.section-content').css('display') === 'none' ) {
			$(this).css('border-radius', '10px 10px 0 0');
		} else {
			$(this).css('border-radius', '10px');
		}
		$(this).find('.corner').toggleClass('collapsed');
        $(this).closest('section').find('.section-content').slideToggle(250, function() {
			$(this).closest('section').find('.section-summary').fadeToggle(60);
        });

        if ($(this).find('.arrow').css('transform') === 'none') {
            $(this).find('.arrow').css({transform: 'rotate(-90deg)', top: '14px'});
        } else {
            $(this).find('.arrow').css({transform: 'none', top: '15px'});
        }
    });
    // dont expand/collapse sections when a header item is clicked
    $('#cartlb-content .header-item').not('.open-expansion').on('click', function(e) {
		e.stopPropagation();
		closeOpenExpansionsExceptClicked();
    });

    // weird that these have to be below click definition??
    $('#cartlb-content section.customer-info header').trigger('click');
	$('#cartlb-content section.order header').trigger('click');

	// HIGHLIGHT VIN-BUTTON IN HEADER
	$('#cartlb-content .vin-wrapper input').on('focus blur', function() {
		$(this).toggleClass('active');
	});
	// UPDATE TOTALS 
	$('#cartlb-content .qty input').on('keyup', function() {
		// update each row total
		var qty = $(this).val();
		var price = $(this).closest('tr').find('.price-value').text();
		var total = (qty * price).toFixed(2);
		$(this).closest('tr').find('.total-value').text(total);

		// update section subtotal
		var rows = $(this).closest('table').find('tbody tr').has('.total-value');
		var subtotal = 0;
		rows.each(function() {
			subtotal += parseFloat($(this).find('.total-value').text());
		});
		subtotal = subtotal.toFixed(2);
		$(this).closest('table').find('.subtotal-value').text(subtotal);
	});

	// =========== LIGHTBOX'S ===========
	// === REC-LIGHTBOX ===
	$('#rwlb-content .cancel, #rwlb-content .continue').on('click', function(e) {
		e.preventDefault();
		$.fancybox.close();
	});

	//=== CHECK-IN LIGHTBOX ===
	// expand matches 
	$('#cilb-content .checkin-area .check-in').on('click', function(e) {
		e.preventDefault();
		toggleMatches('expand');
	});
	// contract matches 
	$('#cilb-content .matches-expansion .cancel').on('click', function(e) {
		e.preventDefault();
		toggleMatches('contract');
	});
	function toggleMatches(state) {
		$('.matches-expansion').slideToggle();
		setTimeout(function() {
			// $('.ihlb-btn.fancybox').resize();
			if (state === 'expand') {
				$('#cilb-content .checkin-area .check-in').addClass('disabled');
				$('#cilb-content .checkin-area .new').addClass('disabled');
				$('#cilb-content .checkin-area .cancel').addClass('disabled');
				$('#cilb-content .checkin-area input').addClass('disabled');
			} else if (state === 'contract') {
				$('#cilb-content .checkin-area .check-in').removeClass('disabled');
				$('#cilb-content .checkin-area .new').removeClass('disabled');
				$('#cilb-content .checkin-area .cancel').removeClass('disabled');
				$('#cilb-content .checkin-area input').removeClass('disabled');
			}
		}, 500);
	}
	$('#cilb-content .checkin-area .cancel, #cilb-content .checkin-area .new').on('click', function() {
		$.fancybox.close();
	});
	$('#cilb-content .matches-expansion .check-in').on('click', function() {
		$.fancybox.close();
	});
	// for presentation only
	$('#cilb-content .matches-expansion .add-vehicle').on('click', function() {
		$('#cilb-content-new .vin-input').val('');
		$('#cilb-content-new .first-name').val('David');
		$('#cilb-content-new .last-name').val('Isleib');
		$('#cilb-content-new .phone-input').val('801-555-2432');
	});
	// highlight active selection
	$('#cilb-content .matches>li').on('click', function() {
		$('#cilb-content .matches>li.active').removeClass('active');
		$(this).addClass('active');
	});
	//=== CHECK IN-EDIT ===
	$('#cilb-content-edit .save').on('click', function(e) {
		e.preventDefault();
		$('#cilb-content-edit .notice').fadeToggle();
	});
	$('#cilb-content-edit .yes, #cilb-content-edit .no').on('click', function() {
		$.fancybox.close();
	});

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
			height      : 'auto',
			fitToView	: false,
			padding		: 25,
			helpers : {
				overlay : {
					css : {
						'background' : 'hsla(0, 0%, 10%, 0.73)'
					}
				}
			}
		});
	}
	//=== CHECK-IN LIGHTBOX ===
	if ($('.cilb-btn.fancybox').length) {
		$('.cilb-btn.fancybox').fancybox({
			topRatio	: 0.3,
			wrapCSS		: 'cilb',
			openEffect  : 'fade',
			closeEffect : 'none',
			autoSize    : false,
			modal		: false,
			width       : 416,
			minWidth	: 416,
			height      : 'auto',
			padding		: 25,
			helpers : {
				overlay : {
					css : {
						'background' : 'hsla(0, 0%, 10%, 0.73)'
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
			height      : 'auto',
			minHeight   : 525,
			padding		: 25,
			helpers : {
				overlay : {
					css : {
						'background' : 'hsla(0, 0%, 10%, 0.73)'
					}
				}
			}
		});
	}

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
			height      : 485,
			showCloseButton : true,
			helpers		: {
				overlay : {
					css : {
						'background' : 'hsla(0, 0%, 10%, 0.73)'
					}
				}
			},
			afterLoad   : function() {
				// this.content = this.content.html();
				$('#ihlb-content .flexslider').flexslider({
					animation: "fade",
					controlNav: "thumbnails",
					startAt: 0,
					start: function () {
						$("#product-slideshow").show(); // make parent container visible
					}
				});
			}
		});
	}
	// === INSPECTOR SLIDESHOW
	$('.inspector-pg .q-groups.flexslider').flexslider({
		animation: "fade",
		slideshow: false,
		animationSpeed: 0,
		manualControls: '.sub-header li'
	});
	$('.sub-header li').on('click', function() {
		$('.sub-header li').removeClass('active');
		$(this).addClass('active');
	});
	
});