//Dates and chart variables
var myChart;
var chartDate = new Date();
var logTimes = [];
var logData = [];
var timePoints = ["0000", "0015", "0030", "0045", "0100", "0115", "0130", "0145", "0200", "0215", "0230", "0245", "0300", "0315", "0330", "0345", "0400", "0415", "0430", "0445", "0500", "0515", "0530", "0545", "0600", "0615", "0630", "0645", "0700", "0715", "0730", "0745", "0800", "0815", "0830", "0845", "0900", "0915", "0930", "0945", "1000", "1015", "1030", "1045", "1100", "1115", "1130", "1145", "1200", "1215", "1230", "1245", "1300", "1315", "1330", "1345", "1400", "1415", "1430", "1445", "1500", "1515", "1530", "1545", "1600", "1615", "1630", "1645", "1700", "1715", "1730", "1745", "1800", "1815", "1830", "1845", "1900", "1915", "1930", "1945", "2000", "2015", "2030", "2046", "2100", "2115", "2130", "2145", "2200", "2215", "2230", "2245", "2300", "2315", "2330", "2345"];

// The main code that sets up and fills the chart with data.
initializeChart();
refreshChart();

function initializeChart(){
    var ctx = document.getElementById("myChart");
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: logTimes,
            datasets: [{
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
    //Reset data
    logData = [];
    logTimes = [];

    //Get chart date info
    var chartYear = chartDate.getFullYear();
    var chartMonth = chartDate.getMonth() + 1;
    var chartDay = chartDate.getDate();

    //Pad 0s
    var chartDay = ('0' + chartDay).slice(-2);
    var chartMonth = ('0' + chartMonth).slice(-2);

    //Update text
    $('#chartDate').text(chartMonth.toString() + "/" + chartDay.toString() + "/" + chartYear.toString());

    //Make the query
    $.getJSON(`${origin}/logs/${chartYear}/${chartMonth}/${chartDay}`, function(data) {
            $.each(data, function(key, value){
                $.each(value, function(key, value){
                    if(key === 'isOpen'){
                        logData.push(value);
                    }else if(key === 'timeStamp'){
                        //Format as HH:SS before adding as label.
                        logTimes.push(value.slice(11,16));
                    }
                });
            });
            // Get JSON callback and update chart.
            console.log(logTimes.length);
            myChart.destroy();
            initializeChart(); //TODO Better way than this?
            });
}

function shiftDay(direction){
    switch (direction){
        case 'prev':
            chartDate.setDate(chartDate.getDate() - 1);
            break;
        case 'today':
            chartDate = new Date();
            break;
        case 'next':
            chartDate.setDate(chartDate.getDate() + 1);
            break;
    }
    refreshChart();
}
