window.onload = function () {
    rangeValue('empContr', 'empContrValue');
    rangeValue('age', 'myAge');
    function rangeValue(param1, param2){
        var myRange = document.querySelector(`#${param1}`);
        var myValue = document.querySelector(`#${param2}`);
        var off = myRange.offsetWidth / (parseInt(myRange.max) - parseInt(myRange.min));
        var px =  ((myRange.valueAsNumber - parseInt(myRange.min)) * off) - (myValue.offsetParent.offsetWidth / 2);

        myValue.parentElement.style.left = px + 'px';
        myValue.parentElement.style.top = myRange.offsetHeight + 'px';
        myValue.innerHTML = myRange.value;

        myRange.oninput =function(){
            let px = ((myRange.valueAsNumber - parseInt(myRange.min)) * off) - (myValue.offsetWidth / 2);
            if(param2=='myAge')
            myValue.innerHTML = myRange.value;
            else
            myValue.innerHTML = myRange.value + '%';

            myValue.parentElement.style.left = px + 'px';
        };
    }

    var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    axisX: {
        interval: 5,
        intervalType: "year"
    },
    axisY:{
        valueFormatString:"$#0",
        gridColor: "#B6B1A8",
        tickColor: "#B6B1A8"
    },
    toolTip: {
        shared: true,
        content: toolTipContent
    },
    data: [{
    type: "stackedColumn",
    showInLegend: true,
    color: 'rgb(16, 16, 110)',
    name: "Employer",
    dataPoints: [
        { x: 20, y:  25},
        { x: 25, y:  35},
        { x: 30, y:  50},
        { x: 35, y:  65},
        { x: 40, y:  85},
        { x: 45, y:  100},
        { x: 50, y:  105}
    ]
    },
    {
        type: "stackedColumn",
        showInLegend: true,
        color: 'rgb(88, 17, 201)',
        name: "Employee",
        dataPoints: [
            { x: 20, y:  38},
            { x: 25, y:  53},
            { x: 30, y:  75},
            { x: 35, y:  100},
            { x: 40, y:  125},
            { x: 45, y:  150},
            { x: 50, y:  160}
        ]
    },
    {
        type: "stackedColumn",
        showInLegend: true,
        color: 'rgb(53, 111, 199)',
        name: "Total interest",
        dataPoints: [
            { x: 20, y:  75},
            { x: 25, y:  105},
            { x: 30, y:  150},
            { x: 35, y:  200},
            { x: 40, y:  250},
            { x: 45, y:  300},
            { x: 50, y:  320}
        ]
    }]
});



var progress1 = new CanvasJS.Chart("progressContainer", {
    animationEnabled: true,
    title:{
        text: "Email Categories",
        horizontalAlign: "left"
    },
    data: [{
        type: "doughnut",
        startAngle: 60,
        //innerRadius: 60,
        indexLabelFontSize: 17,
        indexLabel: "{label} - #percent%",
        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
        dataPoints: [
            { y: 67, label: "Inbox" },
            {y: 33, label:""}
        ]
    }]
});

chart.render();
progress1.render();
function toolTipContent(e) {
    var str = "";
    var total = 0;
    var str2, str3;
    for (var i = 0; i < e.entries.length; i++){
        var  str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\"> "+e.entries[i].dataSeries.name+"</span>: $<strong>"+e.entries[i].dataPoint.y+"</strong>bn<br/>";
        total = e.entries[i].dataPoint.y + total;
        str = str.concat(str1);
    }
    str2 = "<span style = \"color:DodgerBlue;\"><strong>"+(e.entries[0].dataPoint.x).getFullYear()+"</strong></span><br/>";
    total = Math.round(total * 100) / 100;
    str3 = "<span style = \"color:Tomato\">Total:</span><strong> $"+total+"</strong>bn<br/>";
    return (str2.concat(str)).concat(str3);
}
}