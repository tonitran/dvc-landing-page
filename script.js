// Production
$.getJSON('http://dvc-raspberrypi.ucsd.edu:5000/door',
    function(data) {
        var value = data.isOpen == true ? "open." : "closed."
        $('#doorState').text(value);
    }
);

// // Local
// $.getJSON('localhost:5000/door',
//     function(data) {
//         var value = JSON.parse(data)
//         value = value.isOpen == true ? "open." : "closed."
//         $('#doorState').text(value);
//     }
// );
