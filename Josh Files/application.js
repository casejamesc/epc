$(function() {

    //====== FORMS =======*/
    //=== STYLED SELECT ===*/
    $('select.select').each(function() {
        var title = $(this).attr('title');
        if( $('option:selected', this).val() != ''  ) title = $('option:selected',this).text();
        $(this)
        .css({'z-index':10,'opacity':0,'-khtml-appearance':'none'})
        .after('<span class="select">' + title + '</span>')
        .change(function(){
            val = $('option:selected',this).text();
            $(this).next().text(val);
        })
    });

	//without this, form inputs will reload with same text they had before refresh
	$("input, textarea").attr('autocomplete', 'off');

	// === DISSAPEARING DEFAULT TEXT FUNC ===
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
        $.data(this, 'edited', this.value != "");
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

	//link functionality for buttons 
	$(".login").on('click', function() {
        console.log('heyheyyo');
		window.location.href = "year.html";
        return false;
	});
	
    //====== PAGE SPECIFIC ======
    //=== MANAGER ===
    $('.quote h3').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        $('.quote .content-wrapper').slideToggle('fast');
    
        if ($('.quote .arrow').css('transform') == 'none') {
            $('.quote .arrow').css('transform', 'rotate(-90deg)');
        } else {
            $('.quote .arrow').css('transform', 'none');
        }
    });

    $('.recs h3').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        $('.recs .content-wrapper').slideToggle('fast');
    
        if ($('.recs .arrow').css('transform') == 'none') {
            $('.recs .arrow').css('transform', 'rotate(-90deg)');
        } else {
            $('.recs .arrow').css('transform', 'none');
        }
    }); 

    $('.filter').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('.filter-dropdown').slideToggle('fast');
    });
    //=== INSPECTOR ===
    $('.inspection-col td:nth-of-type(2) img').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if ($(this).is(':nth-of-type(1)') && $(this).attr('src') == '..Content/images/checkbox.png') {
            $(this).attr('src', '..Content/images/standard.png');
        }
        else if ($(this).is(':nth-of-type(2)') && $(this).attr('src') == '..Content/images/checkbox.png') {
            $(this).attr('src', '..Content/images/cautionary.png');
        }
        else if ($(this).is(':nth-of-type(3)') && $(this).attr('src') == '..Content/images/checkbox.png') {
            $(this).attr('src', '..Content/images/attention.png');
        } else {
            $(this).attr('src', '..Content/images/checkbox.png');
        }
    });



});