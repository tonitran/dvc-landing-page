var ENV = 'nopi';
var prodEndPoint = `http://dvc-raspberrypi.ucsd.edu:5000/logs/previousDays/${daysAgo}`
var noPiEndPoint = `http://lvh.me:5000/logs/previousDays/${daysAgo}`

var daysAgo = 0;
var maxDaysAgo = 7;
var timePoints = ["0000", "0015", "0030", "0045", "0100", "0115", "0130", "0145", "0200", "0215", "0230", "0245", "0300", "0315", "0330", "0345", "0400", "0415", "0430", "0445", "0500", "0515", "0530", "0545", "0600", "0615", "0630", "0645", "0700", "0715", "0730", "0745", "0800", "0815", "0830", "0845", "0900", "0915", "0930", "0945", "1000", "1015", "1030", "1045", "1100", "1115", "1130", "1145", "1200", "1215", "1230", "1245", "1300", "1315", "1330", "1345", "1400", "1415", "1430", "1445", "1500", "1515", "1530", "1545", "1600", "1615", "1630", "1645", "1700", "1715", "1730", "1745", "1800", "1815", "1830", "1845", "1900", "1915", "1930", "1945", "2000", "2015", "2030", "2046", "2100", "2115", "2130", "2145", "2200", "2215", "2230", "2245", "2300", "2315", "2330", "2345"];

var logData = [];
$.getJSON(`http://localhost:5000/logs/previousDays/${daysAgo}`,
        function(data) {
            $.each(data, function(key, value){
                $.each(value, function(key, value){
                    if(key === 'isopen'){
                        var dataPoint = (value === 'true') ? '1' : '0';
                        logData.push(dataPoint);
                    }
                });
            });
            populateChart();
        });

var ctx = document.getElementById("myChart");
var data = {
    labels: timePoints,
    datasets: [
    {
        label: "Minutes opened",
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
    }
    ]
};

function populateChart(){
    var myChart = new Chart(ctx, {
        type: 'line',
        data: data,
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
