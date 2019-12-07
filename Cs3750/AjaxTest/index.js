(function () {
    $(function (){
        var fncUrl = '/Site1/serverSideFunctions.php';

        setInterval(function (){
            $.get(fncUrl,
                { action: 'messages'},
                function (response){
                    updateMessages(JSON.parse(response));
                });
        },
        200);
        $('#name-submit').click(function (evt){
            var name = $('#name-in').val();
            $.post(fncUrl,
                    { action: 'AddNewPerson', personName: name, },
                    function (){
                        $('#name-group').css('display', 'none');
                        $('#chat-group').css('display', 'block');
                    }

                )
        });

        $('#chat-submit').click(function (evt){
            var name = $('#name-in').val();
            $.post(fncUrl,
                    { action: 'AddNewPerson', personName: name, },
                    function (){
                        $('#name-group').css('display', 'none');
                    }

                )
        });
        // $.get('/Site1/serverSideFunctions.php', 
        // null, 
        // function (response){
        //     console.log(response);
        //     $('#response-txt').html(response);
        // },
        // 'json'
        // );

        function updateMessages(messages){
            console.log(messages);
            var msgHtml = '';
            messages.forEach(msg => {
                msgHtml += '<div>' + msg + '</div>';
            });
            $('#messages').html(msgHtml);
        }
    })
})()