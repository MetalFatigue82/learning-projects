var main = (function ($) {
    //private methods
    
    function privateInit() {
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
            
        var counter = 0;
        $("section#home button").on("click button", function () {
            counter++;
            $("div.modal .modal-body p").html("I was shown " + counter + " times!");
        });
    }
    
    //public methods
    return {
        init: privateInit
    };
})(jQuery);

$(function () {
    main.init();
});