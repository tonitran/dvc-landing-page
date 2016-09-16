$(function(){
    //TimePicker setup
    var today = new Date();
    var minToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 0, 0);
    var maxToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 00, 00);

    //Init lower bound time picker
    $('#lowerBoundTimePicker').timepicker({
        'scrollDefault': 'now',
    });
    $('#lowerBoundTimePicker').timepicker('setTime', minToday);
    $('#lowerBoundTimePicker').change(function(){
        refreshChart();
    });

    //Same for upper bound
    $('#upperBoundTimePicker').timepicker({
        'scrollDefault': 'now',
    });
    $('#upperBoundTimePicker').timepicker('setTime', maxToday);
    $('#upperBoundTimePicker').change(function(){
        refreshChart();
    });

    datePicker = new Pikaday({ 
        'field': $('#datepicker')[0],
        'onSelect': refreshChart,
        'timeFormat': 'c',
        'defaultDate': today,
        'setDefaultDate': true
    });

    //Chart init
    initializeChart();
    refreshChart();
});


// Chart controls
var datePicker;

//Init chart size
var chart = document.getElementById('myChart');
docHeight = $(document).height;
docWidth = $(document).width;
chart.width = docWidth;
chart.height = 200;

var logData = [];
var logTimes = [];

// The main code that sets up and fills the chart with data.
function initializeChart(){
    var ctx = chart;
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: logTimes,
            datasets: [{
                label: "1 if open",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: logData,
                spanGaps: false,
            }]
        },
        options: {
            responsive: false,
            title: {
                text: "THING"
            },
            scaleOverride : true,
            scaleSteps : 10,
            scaleStepWidth : 50,
            scaleStartValue : 0
        },
    });
}

function refreshChart(){
    logData = [];
    logTimes = [];

    //Get ISO formatted date
    var date = datePicker.getDate().toISOString().slice(0,10);

    //Get ISO formatted time
    var fromTime = $('#lowerBoundTimePicker').val();
    var toTime = $('#upperBoundTimePicker').val();
    fromTime = moment(fromTime, ["h:mm A"]).format("HH:mm");
    toTime = moment(toTime, ["h:mm A"]).format("HH:mm");

    //Construct the query
    var fromTime = `${date}T${fromTime}`;
    var toTime = `${date}T${toTime}`;

    //Make the query
    var query = `${origin}/logs?from=${fromTime}&to=${toTime}`
    $.getJSON(`${query}`, function(data) {
        $.each(data, function(key, value){
            $.each(value, function(key, value){
                if(key === 'isOpen'){
                    logData.push(value);
                }else if(key === 'timeStamp'){
                    logTimes.push(value.slice(-8,-3));
                }
            });
        });

        // Get JSON callback and update chart.
        myChart.destroy();
        initializeChart();
    });
}
