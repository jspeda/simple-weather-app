$(document).ready(function () {
  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function(position) {
      $(".data").html("latitude: "+position.coords.latitude+"<br>longitude: "
      +position.coords.longitude);
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  };

  function getWeather(latitude, longitude) {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+latitude
    +"&lon="+longitude+"&appid=7ed6f77ca2de4ed775687d69ab17660e",
      function(json) {
      var location = json.name;
      var condition = json.weather[0].description;
      var tempK = json.main.temp;
      var tempF = kelvinToFahrenheit(tempK);
      var tempC = kelvinToCelsius(tempK);
      tempColorChanger(tempF);

      $('.location').html(location);
      $('.condition').html(condition);
      $('.celsius').html(tempC + "&deg; c");
      $('.temp').html(tempF +"&deg; f");

      // toggle for Celsius and Fahrenheit
      $('.temp').click(function() {
        $('.celsius').show();
        $('.temp').hide();
      });
      $('.celsius').click(function() {
        $('.temp').show();
        $('.celsius').hide();
      });
    });
  }

// converts Kelvin to Fahrenheit and rounds to the first decimal.
function kelvinToFahrenheit(kelvin) {
  return Math.round((kelvin * (9/5) - 459.67) * 10) / 10;
}
// converts Kelvin to Celsius and rounds to the first decimal.
function kelvinToCelsius(kelvin) {
  return Math.round((kelvin - 273.15) * 10) / 10;
}

// changes the color based on the temperature.
function tempColorChanger(temp) {
  if (temp <= 32) {
    $('.bottomblock').css('color', '#325184');
  }
  else if (temp <= 50) {
    $('.bottomblock').css('color', '#638899');
  }
  else if (temp <= 65) {
    $('.bottomblock').css('color', '#77af98');
  }
  else if (temp <= 75) {
    $('.bottomblock').css('color', '#71b778');
  }
  else if (temp <= 85) {
    $('.bottomblock').css('color', '#ed8823');
  }
  else {
    $('.bottomblock').css('color', '#e52222');
  }
}

});
