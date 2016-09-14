$(document).ready(function(){
    var start = new Date().getTime();
    $.getJSON(`${origin}/door`,
            function(data) {
                var end = new Date().getTime();
                var totalTime = end - start;
                var value = data.isOpen == true ? `open. (${totalTime} ms)` : `closed. (${totalTime} ms)`;
                $('#doorState').text(value);
            });
});
