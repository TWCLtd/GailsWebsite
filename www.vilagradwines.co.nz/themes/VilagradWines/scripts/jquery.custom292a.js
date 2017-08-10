$(document).ready(function () {

    $('#Slider.home #HomeSlider').on('click', '.nivo-caption', function () {
        var $this = $(this);
        window.location = $this.siblings('a.nivo-imageLink:visible').attr('href');
    });

    $('body').on('click', '#Content .light .four .module-content, #Content.three-column .light .module-content', function () {
        var $this = $(this),
			hrefValue = $this.find('a.link').attr('href');

        if (hrefValue != '' && hrefValue != undefined) {
            window.location = hrefValue;
        } else {
            var $imageWrappedByAnchor = $this.find('.content > p > a > img');
            if ($imageWrappedByAnchor.length > 0)
                hrefValue = $imageWrappedByAnchor.parent().attr('href');

            if (hrefValue != '' && hrefValue != undefined)
                window.location = hrefValue;
        }
    });

    /* Infusionsoft Forms - validation and bootstrap */
    // Do something to all Infusionsoft forms
    $('form.infusion-form').each(function (i, el) {
        var $infusionForm = $(this);
        $infusionForm.find('.infusion-submit input[type=submit]').addClass('btn btn-primary');
        $infusionForm.prepend('<div data-valmsg-summary="true" class="validation-summary-valid"><span>Please review below errors and correct</span><ul></ul></div>');
        $infusionForm
			.attr('role', 'form')
			.find('.infusion-field').each(function (i, el) { // Find all .infusion-field, then do something to it
			    var $infusionField = $(this);
			    $infusionField.addClass('form-group');
			    // Do something with first label under .infusion-field and check if validation is required
			    $infusionField.find('label:first-child').each(function (i, el) {
			        var $label = $(this),
						fieldAttrName = '';
			        // Add validation stuff when label contains asterisk
			        if ($label.text().lastIndexOf('*') >= 0) {
			            // Find relevant fields and add validation attributes 
			            $infusionField.find('> input, > select, > textarea, .infusion-option > input, > table input, > table select').each(function (i, el) {
			                var $field = $(this);
			                $field
								.attr({
								    'data-val': true,
								    'data-val-required': $label.text().replace(' *', ' is required')
								});
			                fieldAttrName = $field.attr('name');
			            });
			            // Add element to hold validation message
			            $infusionField.append('<span class="field-validation-valid" data-valmsg-for="' + fieldAttrName + '" data-valmsg-replace="true">&nbsp;</span>');
			        }
			    });

			    // Find input, select, textarea directly under .infusion-field
			    $infusionField.find('> input, > select, > textarea, > table input, > table select').each(function (i, el) {
			        var $field = $(this);
			        $field.addClass('form-control');

			        // Handle date input fields initiate datepicker
			        if (String($field.attr('onkeydown')).toLowerCase().indexOf('pressdate') >= 0) {
			            var inputGroup = $(document.createElement('div'))
							.addClass('input-group')
							.click(function () {
							    // Show datepicker on click
							    $field.datepicker("show");
							});
			            // Prepage datepicker field
			            $field
							.datepicker({ dateFormat: 'dd-mm-yy' })
							.wrap(inputGroup)
							.after('<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>');
			        }

			        // Handle time in datetime field
			        if ($infusionField.find('> table > tbody > tr td').length == 3) {
			            $infusionField.find('> table > tbody > tr td:eq(0)').width('60%');
			            $infusionField.find('> table > tbody > tr td:eq(1)').width('2%');
			            $infusionField.find('> table > tbody > tr td:eq(2)').width('38%');
			        }
			    });

			    // Date picker setting for sunday lunch and book a tour, DUE TO FIRE (minDate 1st Oct 2015)
			    $('#inf_custom_DateofSundayLunch,#inf_custom_PrefdatetimeTourTasting').datepicker('change', { minDate: new Date('October 01, 2015') });

			    // Find single checkbox, radio > options
			    $infusionField.find('.infusion-option').each(function (i, el) {
			        var $infusionOption = $(this);
			        // Prepare option fields
			        $infusionOption
						.css('display', 'inline-block')
						.find('> input').each(function (i, el) {
						    var $field = $(this),
								aLabel = $field.find('+ label')[0];

						    $field.prependTo(aLabel);
						    $infusionOption.addClass($field.attr('type'));
						    $(aLabel).addClass($field.attr('type') + '-inline');
						});
			    });
			});
    });
    // Re-initiate validator after changes to IFS form
    $.validator.unobtrusive.parse('form.infusion-form');

    /* SHOW, FOR ADMINS, ANY MODULES CREATED IN THE HIDDEN ELEMENT */
    if ($('#Content .hidden .module-content .module-actions').length > 0) {
        $('#Content .hidden')
            .removeClass('hidden')
            .css('background-color', 'red')
            .prepend('<h2>These are modules created in a hidden area, please action e.g move, delete, etc.');
    }

    $('.module-filter-listing .element-container .element').off('click');

    $('#main-search input[type="text"]').watermark("Search Website");

    //SET UP MOBILE MENU
    $('.menudropdown').before('<span class="arrow">+</span>');

    $('.menu > ul > li .arrow').click(function () {

        var text = $(this).text();

        $('.menudropdown').slideUp('slow');
        $('.arrow').text('+');

        if (text == '+') {
            $(this).text('-');
            //$(this).parent().find('> .menudropdown').show('slow');
            $(this).parent().find('> .menudropdown').slideToggle('slow');
        }
    });

    if (typeof $(window).smartresize == 'function') {
        $(window).smartresize(function () {
            $('#SetId43 .element-container').isotope({ masonry: { columnWidth: $(this).find('.element:first-child').width() } });
        });

        $('.module-filter-listing .element-container .element .read-more a').text('More Info');
    }

});

function isEmailAddr(s) {
    var rv = false
    if ((s == null) || (s.length == 0))
        rv = false;
    else {
        var reEmail = /([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        rv = reEmail.test(s)
    }
    if (rv) {
        return rv
    } else {
        return false
    }
}

function validation(theForm) {

    if (theForm.name.value == "") {
        alert("Please enter your full name.");
        theForm.name.focus();
        return (false);
    }

    if (!isEmailAddr(theForm.email_from.value)) {
        alert("Please enter a complete email address in the form: yourname@yourdomain.com");
        theForm.email_from.focus();
        return (false);
    }

    $('.submit_button').val('Sending...');

    return (true)
}

function pressDate(x, y) {
    return false;
};




