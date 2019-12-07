$(function (){
    // Adds some helpful effects to the education page.

    $('.card-header button').click(toggleCollapse);

    // Allows a table row to be selected by clicking on it.
    $('table tbody tr').click(function(event){
        $('table tbody tr').removeClass('active');
        $(this).addClass('active');
    })
    
    /**
     * When an accordion group is opened or closed the angle icon is changed to be
     * pointing right if the accordion group is closed and down if it is open.
     * @param {event} event - The event object.
     */
    function toggleCollapse(event){
        var arrowIcon = $(this).find('svg');

        if (arrowIcon.hasClass('fa-angle-down')){
            arrowIcon.removeClass('fa-angle-down');
            arrowIcon.addClass('fa-angle-right');
        }
        else if (arrowIcon.hasClass('fa-angle-right')) {
            arrowIcon.removeClass('fa-angle-right');
            arrowIcon.addClass('fa-angle-down');
        }
    }
});