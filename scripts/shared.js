$(function () {
    // Loads the contact me form html into a div and appends it to the page.
    var modal = $('<div></div>').load('contactMeForm.html');
    $('body').append(modal);

    // Set timeout to apply the hover effect after the modal div's content has been loaded.
    setTimeout(function () {
        $('.modal-header button.close').hover(linkMouseIn, linkMouseOut);
    }, 0);

    // Opens the contact me modal form on click.
    $('#contact-me-btn').click(function () {
        var modalOptions = {
            backdrop: 'static',
            keyboard: false,
        };

        $('#contact-me-modal').modal(modalOptions);
    });

    // Back to top scrolls the page backup to the top.
    $('#scroll-top-btn').click(function (){
        $('html, body').animate({
            scrollTop: 0
        });
    });

    // Add hover effects to different elements.
    $('footer a').hover(linkMouseIn, linkMouseOut);
    $('footer button').hover(linkMouseIn, linkMouseOut);

    $('ul:not(.nav-tabs) a').hover(linkMouseIn, linkMouseOut);

    $('.modal-header button.close').hover(linkMouseIn, linkMouseOut);

    $('.nav-tabs a:not(.active)').hover(tabMouseIn, tabMouseOut);

    /**
     * Hover event for tabs. Adds the nav-link-hover class.
     * @param {event} event - The event object.
     */
    function tabMouseIn(event) {
        $(this).addClass('nav-link-hover');
    }

    /**
     * Hover event for tabs. Removes the nav-link-hover class.
     * @param {event} event - The event object.
     */
    function tabMouseOut(event) {
        $(this).removeClass('nav-link-hover');
    }


    
    /**
     * Hover event for links and buttons. Animates the element by increasing the font size.
     * @param {event} event - The event object.
     */
    function linkMouseIn(event) {
        $(this).animate({
            fontSize: "+=1"
        }, 'fast');
    }
    
    /**
     * Hover event for links and buttons. Animates the element by decreasing the font size.
     * @param {event} event - The event object.
     */
    function linkMouseOut(event) {
        $(this).animate({
            fontSize: "-=1"
        }, 'fast')
    }
});