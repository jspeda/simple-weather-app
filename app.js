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
        var name = json.name;
        var condition = json.weather[0].description;
        console.log(name);
        console.log(condition);
    $('.weather').on('click', function () {
      console.log("hi");
    });
  });
}
  //getWeather(40, 30);

  });
