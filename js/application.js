// @codekit-prepend "jquery.fancybox.pack.js";
// @codekit-prepend "jquery.flexslider.js";
// @codekit-append "parts.js";

$(function() {
    //====== INITIALIZATION =======
    $('input.custom-checkbox').each(function() {
        updateCustomCheckbox(this);
    });
    updateCustomRadios();
    
    //====== FORMS =======
    //without this, form inputs will reload with same text they had before refresh
    $("input, textarea").attr('autocomplete', 'off');

    //=== STYLED SELECT ===
    $('select.select').each(function() {
        var title = $(this).attr('title');
        if ( $('option:selected', this).val() !== '' ) {
            title = $('option:selected',this).text();
            $(this)
            .css({'z-index':10,'opacity':0,'-khtml-appearance':'none'})
            .after('<span class="select">' + title + '</span>')
            .change(function() {
                var val = $('option:selected',this).text();
                $(this).next().text(val);
            });
        }
    });

    //=== STYLED RADIO ===
    $('input.custom-radio').on('click', function() {
        updateCustomRadios();
    });
    function updateCustomRadios() {
        $('input.custom-radio').each(function() {
            // if hidden child input is checked, add 'checked' class to parent div
            if ( $(this).is(':checked') ) {
                $(this).closest('div.custom-radio').addClass('checked');
            } else {
                $(this).closest('div.custom-radio').removeClass('checked');
            }
        })
    };

    // === STYLED RADIO THAT CAN HAVE NO SELECTION (INSPECTOR) ===
    $('input.custom-radio-ns').on('click', function() {
        // if an already checked option is clicked: remove '.checked' from div, 
            // check the 'none' input and add '.checked' to its parent div
        // otherwise add '.checked' the parent div of input
        if ( $(this).closest('div.custom-radio-ns').hasClass('checked') ) {
            $(this).closest('div.custom-radio-ns').removeClass('checked');
            $(this).closest('div.custom-radio-ns').siblings('none').addClass('checked');
            $(this).closest('div.custom-radio-ns').siblings('none').children('input').prop("checked", true);
        }
        else {
            $(this).closest('div.custom-radio-ns').siblings().removeClass('checked');
            $(this).closest('div.custom-radio-ns').addClass('checked');
        }
    });

    //=== STYLED CHECKBOX ===
    $('input.custom-checkbox').on('click', function() {
        updateCustomCheckbox(this);
    });

    function updateCustomCheckbox(self) {
        // if hidden child input is checked, add 'checked' class to parent div
        if ( $(self).is(':checked') ) {
            $(self).closest('div.custom-checkbox').addClass('checked');
        } else {
            $(self).closest('div.custom-checkbox').removeClass('checked');
        }
    }
	// === DEFAULT TEXT INPUT ===
    $('.default-text').each(function() {
        // initial color for default text
        if ($(this).hasClass('dark-input')) {
            $(this).css('color', 'hsl(0, 0%, 66%)');
        } else {
            $(this).css('color', 'hsl(0, 0%, 40%)');
        }
        // make "password" appear as text for default text
        if ($(this).hasClass('password')) {
            $(this).attr('type', 'text');
        }

        // Stores the default value for each textarea within each textarea
        $.data(this, 'default', this.value);
    }).focus(function() {
        // If the user has NOT edited the text, clear it when they gain focus
        if (!$.data(this, 'edited')) {
            this.value = "";
            if ($(this).hasClass('dark-input')) {
                $(this).css('color', 'hsl(0, 0%, 100%)');
            } else {
                $(this).css('color', 'hsl(0, 0%, 10%)');
            }
            if ($(this).hasClass('password')) {
                $(this).attr('type', 'password');
            }
        }
    }).change(function() {
        // Fires on blur if the content has been changed by the user
        $.data(this, 'edited', this.value !== "");
    }).blur(function() {
        // Put the default text back in the textarea if its not been edited
        if (!$.data(this, 'edited')) {
            this.value = $.data(this, 'default');
            if ($(this).hasClass('dark-input')) {
                $(this).css('color', 'hsl(0, 0%, 66%)');
            } else {
                $(this).css('color', 'hsl(0, 0%, 40%)');
            }
            if ($(this).hasClass('password')) {
                $(this).attr('type', 'text');
            }
        }
    });

	// BUTTONS LINKS
	$(".login").on('click', function() {
		window.location.href = "year.html";
        return false;
	});
	
    // COLLAPSABLE SECTIONS
    $('.collapse-trigger').on('click', function() {
        if ( $(this).closest('section').find('.collapse-content').css('display') === 'none' ) {
            $(this).css('border-radius', '10px 10px 0 0');
        } else {
            $(this).css('border-radius', '10px');
        }
        $(this).closest('section').find('.collapse-content').slideToggle(250, function() {
            $(this).closest('section').find('.collapse-summary').fadeToggle(60);
        });
        if ($(this).find('.collapse-arrow').css('transform') === 'none') {
            $(this).find('.collapse-arrow').css({transform: 'rotate(-90deg)'});
        } else {
            $(this).find('.collapse-arrow').css({transform: 'none'});
        }
    });

    //====== PAGE SPECIFIC ======
    //=== ADVISOR-REPORT ===
    // expand/collapse content when headers are clicked
    $('.ar-pg .labor').on('click', function() {
        // if open, close
        if ( $('.labor table').hasClass('open') ) {
            $('.quote .shadow').fadeToggle(150);
            $('.labor table').fadeToggle(150, function() {
                $('.labor').animate({height: '39px'}, function() {
                    $('.labor .subtotal').fadeToggle(150);
                });
                $('.labor table').removeClass('open');
            });
        } else {
            $('.labor .subtotal').fadeToggle(150);
            $('.labor').animate({height: '142px'}, function() {
                $('.labor table').fadeToggle(150).addClass('open');
                $('.quote .shadow').fadeToggle(150);
            });
        }
    });

    // move bg image on scroll 
    $(window).scroll(function() {
        var div = $('.quote');
        // backgroundX = 1 / divX * e.clientX * 17;
        var scrollY = $(window).scrollTop();
        var backgroundPos = '-' + scrollY / 2 + 'px';
        div.css('background-position', 'center ' + backgroundPos);
    });
});