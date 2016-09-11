var mTime = new Date();
mTime.setHours(0);
mTime.setMinutes(0);
mTime.setSeconds(0);
var allTimes = [];
var allTimesItr = 0;
for(hour = 0; hour < 24; hour++){ 
    var min = 0;
    for(minInc = 0; minInc < 4; minInc++){ 
        mTime.setHours(hour);
        min = min + 15 % 60;
        mTime.setMinutes(min);
        var t = mTime.getHours().toString() + mTime.getMinutes().toString();
        allTimes[allTimesItr++] = t;
    }
}

var ctx = document.getElementById("myChart");
var data = {
    labels: allTimes,
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
        data: [1, 0, 1, 1, 0, 0, 1],
        spanGaps: false,
    }
    ]
};
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
