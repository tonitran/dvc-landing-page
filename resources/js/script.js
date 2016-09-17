$(document).ready(function(){
    $.getJSON(`${origin}/device/door`,
            function(data) {
                var value = data.isOpen == true ? `open.` : `closed`;
                $('#doorState').text(value);
            });
});
