var AirUtah = function(data){

  var boxElderValues   = [];
  var cacheValues      = [];
  var carbonValues     = [];
  var davisValues      = [];
  var duchesneValues   = [];
  var saltLakeValues   = [];
  var tooeleValues     = [];
  var uintahValues     = [];
  var utahValues       = [];
  var washingtonValues = [];
  var weberValues      = [];

  var separateByCounty = function(data) {
    for (var i = 0; i < data.length; i++){
      switch(data[i]['county']){
        case 'box elder':
          boxElderValues.push(data[i]);
          break;
        case 'cache':
          cacheValues.push(data[i]);
          break;
        case 'carbon':
          carbonValues.push(data[i]);
          break;
        case 'davis':
          davisValues.push(data[i]);
          break;
        case 'duchesne':
          duchesneValues.push(data[i]);
          break;
        case 'salt lake':
          saltLakeValues.push(data[i]);
          break;
        case 'tooele':
          tooeleValues.push(data[i]);
          break;
        case 'uintah':
          uintahValues.push(data[i]);
          break;
        case 'utah':
          utahValues.push(data[i]);
          break;
        case 'washington':
          washingtonValues.push(data[i]);
          break;
        case 'weber':
          weberValues.push(data[i]);
          break;
        default:
          console.log('County error: ', data[i]);
      }
    }
  }

  var getCountyValuesOnSelection = function(val) {
    switch(val){
      case 'be':
        updateAirUtahValues(boxElderValues[boxElderValues.length-1]);
        break;
      case 'ca':
        updateAirUtahValues(cacheValues[cacheValues.length-1]);
        break;
      case 'cr':
        updateAirUtahValues(carbonValues[carbonValues.length-1]);
        break;
      case 'da':
        updateAirUtahValues(davisValues[davisValues.length-1]);
        break;
      case 'du':
        updateAirUtahValues(duchesneValues[duchesneValues.length-1]);
        break;
      case 'sl':
        updateAirUtahValues(saltLakeValues[saltLakeValues.length-1]);
        break;
      case 'to':
        updateAirUtahValues(tooeleValues[tooeleValues.length-1]);
        break;
      case 'ui':
        updateAirUtahValues(uintahValues[uintahValues.length-1]);
        break;
      case 'ut':
        updateAirUtahValues(utahValues[utahValues.length-1]);
        break;
      case 'wa':
        updateAirUtahValues(washingtonValues[washingtonValues.length-1]);
        break;
      case 'we':
        updateAirUtahValues(weberValues[weberValues.length-1]);
        break;
      default:
        console.log('Selection error: ', val);
    }
  }

  updateAirUtahValues = function(data) {
    console.log(data['county']);

    updateDisplayBoxValues(data['particulates'], data['ozone'], data['temperature'], data['wind']);
    updateForecastHeadline(parseInt(data['aqi']));
    updateDate(data['timestamp']);

    ChartData(data['particulates'], data['ozone'], parseInt(data['aqi']));
  }

  var updateDisplayBoxValues = function(p, o, t, w){
    console.log(p, o, t, w);

    if (data == null){
      return;
    }

    var pollution   = document.getElementsByClassName('display-box-value')[0];
    var ozone       = document.getElementsByClassName('display-box-value')[1];
    var temperature = document.getElementsByClassName('display-box-value')[2];
    var wind        = document.getElementsByClassName('display-box-value')[3];

    pollution.innerHTML   = (p == "") ? '*NA' : p;
    ozone.innerHTML       = (o == "") ? '*NA' : o;
    temperature.innerHTML = (t == "") ? '*NA' : t;
    wind.innerHTML        = (w == "") ? '*NA' : w;
  };

  var updateForecastHeadline = function(aqi) {
    console.log(aqi)

    var headline = document.getElementsByClassName('air-quality')[0];

    if (isNaN(aqi)){
      headline.innerHTML = "Air Quality Index is not available";
      return;
    }

    switch(true){
      case (aqi <= 50):
        headline.innerHTML = "Enjoy the great outdoors";
        break;
      case (aqi <= 100):
        headline.innerHTML = "Not the best, try to carpool";
        break;
      case (aqi <= 150):
        headline.innerHTML = "Asthmatics, bring your inhaler";
        break;
      case (aqi <= 200):
        headline.innerHTML = "Best to stay inside if you can";
        break;
      case (aqi <= 300):
        headline.innerHTML = "Pray your emergency food stash is stocked up";
        break;
      case (aqi <= 500):
        headline.innerHTML = "DEAR GOD IT'S THE APOCALYPSE!!!";
        break;
      default:
        console.log("Error, invalid value: ", aqi);
    }
  }

  var updateDate = function(date){
    console.log(date);

    setDate = document.getElementsByClassName('update-date')[0];
    setDate.innerHTML = date;
  }

  var county = document.getElementsByClassName('counties')[0]

  county.addEventListener('change', function() {
    console.log(this.value)
    getCountyValuesOnSelection(this.value);
  }, false);

  separateByCounty(data);
}
