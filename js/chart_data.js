var ChartData = function(particulates, ozone, aqi) {
  console.log('ChartData: ', particulates, ozone);

  var chartParticulates = function(p){
    if (p > 250.5) {
      p = 250.5;
    }

    var canvas    = document.getElementsByClassName('particulate-chart')[0];
    canvas.width  = 250;
    canvas.height = 250;

    var drawChart = canvas.getContext('2d');

    drawChart.strokeStyle = pColor(p);
    drawChart.lineWidth = 20;
    drawChart.lineCap = 'round';

    var percent = p/250.5;

    drawChart.beginPath();
    drawChart.arc(125, 125, 100, 0, degToRad(percent));
    drawChart.stroke();

    drawChart.font = '16px sans-serif'
    drawChart.fillStyle = 'black'
    drawChart.fillText('Particulate Matter', 62, 128);

    drawChart.font = '14px sans-serif';
    drawChart.fillStyle = 'grey';
    drawChart.fillText((percent * 100).toFixed(2) + '%', canvas.width / 2 - 16, 145);

    constructOutline(drawChart);
  }

  var chartOzone = function(o){
    if(o > 0.201){
      o = 0.201;
    }

    var canvas    = document.getElementsByClassName('ozone-chart')[0];
    canvas.width  = 250;
    canvas.height = 250;

    var drawChart = canvas.getContext('2d');

    drawChart.strokeStyle = oColor(o);
    drawChart.lineWidth = 20;
    drawChart.lineCap = 'round';

    var percent = o/0.201;

    drawChart.beginPath();
    drawChart.arc(125, 125, 100, 0, degToRad(percent));
    drawChart.stroke();

    drawChart.font = '16px sans-serif';
    drawChart.fillStyle = 'black';
    drawChart.fillText('Ozone', canvas.width / 2 - 24, 128);

    drawChart.font = '14px sans-serif';
    drawChart.fillStyle = 'grey';
    drawChart.fillText((percent * 100).toFixed(2) + '%', canvas.width / 2 - 22, 145);

    constructOutline(drawChart);
  }

  var chartAQI = function(a){
    if (isNaN(a)){
      a = 0;
    }

    var canvas    = document.getElementsByClassName('aqi-chart')[0];
    canvas.width  = 250;
    canvas.height = 250;

    var drawChart = canvas.getContext('2d');

    drawChart.strokeStyle = aColor(a);
    drawChart.lineWidth = 20;
    drawChart.lineCap = 'round';

    var percent = a/500;

    drawChart.beginPath();
    drawChart.arc(125, 125, 100, 0, degToRad(percent));
    drawChart.stroke();

    drawChart.font = '16px sans-serif'
    drawChart.fillStyle = 'black'
    drawChart.fillText('AQI', canvas.width/2 - 16, 128);

    drawChart.font = '14px sans-serif';
    drawChart.fillStyle = 'grey';
    drawChart.fillText((percent * 100).toFixed(2) + '%', canvas.width / 2 - 20, 145);

    constructOutline(drawChart);
  }

  var constructOutline = function(chart){
    chart.lineWidth   = 20;
    chart.strokeStyle = 'grey';
    chart.globalAlpha = 0.1;
    chart.shadowBlur  = 12;
    chart.shadowColor = 'black';

    chart.beginPath();
    chart.arc(125, 125, 100, 0, 2*Math.PI);
    chart.stroke();
  }

  var pColor = function(val) {
    if      (val <= 12)    return 'green';
    else if (val <= 35.4)  return 'yellow';
    else if (val <= 55.4)  return 'orange';
    else if (val <= 150.4) return 'red';
    else if (val <= 250.4) return 'purple';
    else return 'maroon';
  }

  var oColor = function(val) {
    if      (val <= 0.054) return 'green';
    else if (val <= 0.070) return 'yellow';
    else if (val <= 0.085) return 'orange';
    else if (val <= 0.105) return 'red';
    else if (val <= 0.200) return 'purple';
    else return 'maroon';
  }

  var aColor = function(val) {
    if      (val <= 50)  return 'green';
    else if (val <= 100) return 'yellow';
    else if (val <= 150) return 'orange';
    else if (val <= 200) return 'red';
    else if (val <= 300) return 'purple';
    else return 'maroon';
  }

  var degToRad = function(percent) {
    return (percent * 360.0) * (Math.PI/180);
  }

  chartParticulates(particulates);
  chartOzone(ozone);
  chartAQI(aqi);
}
