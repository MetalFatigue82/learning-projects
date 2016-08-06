var main = (function ($) {
	var categories_template, photos_template, photo_template;
    //private methods
    function pInit() {
        pParallaxEffect();
        pTemplateLoader();
		pShowTemplate(categories_template, animals_data);
        var counter = 0;
        $("section#home button").on("click button", function () {
            counter++;
            $("div.modal .modal-body p").html("I was shown " + counter + " times!");
        });

		//events
		$('#categories').click(function	() {
			pShowTemplate(categories_template, animals_data);
		});
		
		$('#photos').click(function	() {
			pShowTemplate(photos_template, animals_data);
		});
		
		$('#photo').click(function	() {
			pShowTemplate(photo_template, animals_data);
		});
    }

    // a helper function that instantiates a template
    // and displays the results in the content div
    function pShowTemplate(template, data){
        var html    = template(data);
        $('#content').html(html);
    }

    function pTemplateLoader() {
        //
        // compile all of our templates ready for use
        //
        var source   = $("#categories-template").html();
        categories_template = Handlebars.compile(source);
        
        source   = $("#photos-template").html();
        photos_template = Handlebars.compile(source);
        
        source   = $("#photo-template").html();
        photo_template = Handlebars.compile(source);
        
        // source   = $("#slideshow-template").html();
        // slideshow_template = Handlebars.compile(source);
    }
    function pParallaxEffect() {
        var $window = $(window);

        $('section[data-type="background"]').each(function () {
            // declare the variable to affect the defined data-type
            var $scroll = $(this);

            $(window).scroll(function () {
                // HTML5 proves useful for helping with creating JS functions!
                // also, negative value because we're scrolling upwards                             
                var yPos = -($window.scrollTop() / $scroll.data('speed')); 
         
                // background position
                var coords = '50% ' + yPos + 'px';
 
                // move the background
                $scroll.css({ backgroundPosition: coords });
            }); // end window scroll
        });  // end section function
    }
    
    //public methods
    return {
        init: pInit
    };
})(jQuery);

$(function () {
    main.init();
	$('#categories').click();
});