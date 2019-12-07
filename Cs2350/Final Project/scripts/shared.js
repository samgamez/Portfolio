$(function() {
    var isInInitialState = true;

    var modalHtml = '<div class="modal fade" id="optionsModal" tabindex="-1" role="dialog" aria-labelledby="optionsModalLabel" aria-hidden="true">' +
    '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
            '<div class="modal-header">' +
                '<div id="optionsModalLabel" class="modal-title h3">' +
                    'Game options' +
                '</div>' +
            '</div>' +
            '<div class="modal-body">' +
                '<strong>Instructions</strong>' +
                '<p id="instructionsParagraph"></p>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<div class="row">' +
                    '<div class="col">' +
                    '<a class="btn btn-primary" href="rpsTwist.html">Main menu</a>' +
                    '</div>' +
                    '<div class="col">' +
                        '<button type="button" id="playBtn" class="btn btn-primary" data-dismiss="modal">Let\'s Play!</button>' +
                    '</div>' +
                '</div>' +
            '</div>'
        '</div>' +
    '</div>' +
'</div>';

var modalDiv = $('<div></div>');
modalDiv.html(modalHtml);
$('body').append(modalDiv);

$('#optionsBtn').click(function (event){
    var modalOptions = {
        backdrop: 'static'
    };

    $('#optionsModal').modal(modalOptions);
});

$('#playBtn').click(function (event){
    if (isInInitialState){
        $(this).text('Back to game')
        isInInitialState = false;
    }
})
});