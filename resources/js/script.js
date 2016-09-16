$(document).ready(function(){
    $.getJSON(`${origin}/door`,
            function(data) {
                var value = data.isOpen == true ? `open.` : `closed`;
                $('#doorState').text(value);
            });
});
