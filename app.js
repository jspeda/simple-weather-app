$(document).ready(function () {
  var lat;
  var lon;
  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function(position) {
      $(".data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      getWeather(lat, lon);

    });
  };

  function getWeather(latitude, longitude) {
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=7ed6f77ca2de4ed775687d69ab17660e",
    function(json) {
    var location = json.name;
    var condition = json.weather[0].description;
    var tempK = json.main.temp;
    var tempF = kelvinToFahrenheit(tempK);
    var tempC = kelvinToCelsius(tempK);
    console.log(location);
    console.log(condition);
    console.log(tempK);
    console.log(tempF);
    console.log(tempC);

    $('.location').html(location);
    $('.condition').html(condition);
    $('.temp').html(tempF +"&deg;");
    // $('.temp c').html(tempC + "&deg;");
    // $('.temp').toggleClass('c');
    $('p').toggle(function() {
      $('.temp').html(tempC + "&deg;");
      $('p').html('to C');
    }, function() {
      $('p').html('to F');
      $('.temp').html(tempF + "&deg;");
    });

    });
  }

// converts Kelvin to Fahrenheit and rounds to the first decimal.
function kelvinToFahrenheit(kelvin) {
  var result = kelvin * (9/5) - 459.67;
  return Math.round(result * 10) / 10;
}
// converts Kelvin to Celsius and rounds to the first decimal.
function kelvinToCelsius(kelvin) {
  var result = kelvin - 273.15;
  return Math.round(result * 10) / 10;
}

});
