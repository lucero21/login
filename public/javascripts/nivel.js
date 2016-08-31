/**
 * Created by mariosky on 8/31/16.
 */
$(document).ready(function () {
    console.log("hola");
    $("#nivel").click(function () {
        $.get('/nivel')
            .done(function (data) {
                

                $('#letrero').text(data.nivel)
                console.log(data.nivel);

            });

    });


});