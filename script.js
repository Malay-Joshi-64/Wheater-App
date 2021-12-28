var month = new Array();

month['1']='January';
month['2']='Febuary';
month['3']='March';
month['4']='April';
month['5']='May';
month['6']='June';
month['7']='July';
month['8']='August';
month['9']='September';
month['10']='October';
month['11']='November';
month['12']='December';
var main_div = document.getElementById("main")
var main_div2 = document.getElementById("main2")

function Initialize() {
  main_div.style.visibility = 'hidden';
  // Run this code to check if geolocatyion API is supported on your browser
  // if (!navigator.geolocation) {
  //     console.error(`Your browser doesn't support Geolocation`);
  // }

}

let wheater = {
  "apiKey": "78f24cc8b5f97fd568b2da71911d0e5c",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  fetchWeathercurrent: function (latitude,longitude) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=78f24cc8b5f97fd568b2da71911d0e5c'
    )
      .then((response) => {
        if (!response.ok) {
          // alert("No weather found.");
          // throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
      console.log('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=78f24cc8b5f97fd568b2da71911d0e5c')
      console.log(latitude)
      console.log(longitude)   
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    date = new Date()
    var day = date.getDate()
    var mon = date.getMonth() + 1
    var year = date.getFullYear()
    document.querySelector("#location").innerText = "Weather in " + name;
    image_link = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    console.log(image_link)
    var Head_img = document.querySelector("#main_img")
    Head_img.setAttribute("src", image_link)
    document.querySelector("#date").innerHTML = day + " th " + mon + " " + month[mon] + " " + year
    document.querySelector("#info").innerText = "Wheater : " + description;
    document.querySelector(".temp").innerText = "Temprature : " + temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
    main_div.style.visibility = 'visible';
    main_div2.style.visibility = 'hidden';
  },

  use_location: function () {
    var my_location = navigator.geolocation.getCurrentPosition(onSuccess, onError);
    console.log(my_location)
  },

  search: function () {
    this.fetchWeather(document.querySelector("#location_name").value);
  },
};

document.querySelector("#search_btn").addEventListener("click", function () {
  wheater.search();
  main_div.style.visibility = 'visible';
  main_div2.style.visibility = 'hidden';
});

document.querySelector("#current_location").addEventListener("click", function () {
  wheater.fetchWeathercurrent();
  wheater.use_location()
});

function onSuccess(position) {
  const {
    latitude,
    longitude
  } = position.coords;
  console.log(`Your location: (${latitude},${longitude})`);
  wheater.fetchWeathercurrent(latitude,longitude)
}

// handle error case
function onError() {
  console.log(`Failed to get your location!`);
}



