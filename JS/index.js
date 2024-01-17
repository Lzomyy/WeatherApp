let search = document.querySelector(".home .search-input input:first-child");
let x;
let codes;

let country = document.getElementById("city");
let dayy = document.getElementById("day");
let text = document.getElementById("text");
let temp = document.getElementById("temp");
let wind = document.getElementById("wind");
let speedOfWind = document.getElementById("speedOfWind");
let Precipitation = document.getElementById("Precipitation");
let whatADay = document.getElementById("whatADay");

let whatANextDay = document.getElementById("whatANextDay");
let maxNextDay = document.getElementById("maxNextDay");
let minNextDay = document.getElementById("minNextDay");
let textNextDay = document.getElementById("textNextDay");
let photoNextDay = document.getElementById("photoNextDay");

let whatANextNextDay = document.getElementById("whatANextNextDay");
let maxNextNextDay = document.getElementById("maxNextNextDay");
let minNextNextDay = document.getElementById("minNextNextDay");
let textNextNextDay = document.getElementById("textNextNextDay");
let photoNextNextDay = document.getElementById("photoNextNextDay");

// ==========================================================================>
// Solution With Fetch
// ==========================================================================>

search.addEventListener("keyup", function () {
  (async function () {
    let response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=e49bf28a463a4580b6d160417241501&q=${search.value}&days=7`
    );
    let x = await response.json();

    // =======================>

    let response2 = await fetch(
      "https://www.weatherapi.com/docs/weather_conditions.json"
    );
    codes = await response2.json();

    // =======================>

    whatADay.innerHTML = getDay(x.forecast.forecastday[0].date);
    country.innerHTML = x.location.name;
    temp.innerHTML = x.current.temp_c;
    text.innerHTML = x.current.condition.text;

    // =======================>

    x.current.precip_in / x.forecast.forecastday[0].day.totalprecip_in
      ? (Precipitation.innerHTML = `${(
          x.current.precip_in / x.forecast.forecastday[0].day.totalprecip_in
        ).toFixed(1)}%`)
      : (Precipitation.innerHTML = `0%`);
    speedOfWind.innerHTML = `${x.current.wind_kph} km/h`;
    windDirection(x.current.wind_dir);

    // =======================>

    whatANextDay.innerHTML = getDay(x.forecast.forecastday[1].date);
    maxNextDay.innerHTML = `${x.forecast.forecastday[1].day.maxtemp_c} &deg;  C`;
    minNextDay.innerHTML = `${x.forecast.forecastday[1].day.mintemp_c} &deg;  C`;
    textNextDay.innerHTML = x.forecast.forecastday[1].day.condition.text;

    // =======================>

    whatANextNextDay.innerHTML = getDay(x.forecast.forecastday[2].date);
    maxNextNextDay.innerHTML = `${x.forecast.forecastday[2].day.maxtemp_c} &deg; C`;
    minNextNextDay.innerHTML = `${x.forecast.forecastday[2].day.mintemp_c} &deg;  C`;
    textNextNextDay.innerHTML = x.forecast.forecastday[2].day.condition.text;

    // =======================>

    getphoto(x.current.condition.code, dayy);
    getphoto(x.forecast.forecastday[1].day.condition.code, photoNextDay);
    getphoto(x.forecast.forecastday[2].day.condition.code, photoNextNextDay);

    // =======================>
  })();
});

function getDay(x) {
  let date = new Date(x);
  let dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

  return dayOfWeek;
}

function windDirection(x) {
  switch (x) {
    case "N":
      wind.innerHTML = "North";
      break;
    case "NE":
      wind.innerHTML = "Northeast";
      break;
    case "E":
      wind.innerHTML = "East";
      break;
    case "SE":
      wind.innerHTML = "Southeast";
      break;
    case "S":
      wind.innerHTML = "South";
      break;
    case "SW":
      wind.innerHTML = "Southwest";
      break;
    case "W":
      wind.innerHTML = "West";
      break;
    case "NW":
      wind.innerHTML = "Northwest";
      break;
  }
}

function getphoto(num, ele) {
  for (let i = 0; i < codes.length; i++) {
    if (codes[i].code == num) {
      ele.src = `Images/weather/64x64/day/${codes[i].icon}.png`;
    }
  }
}

// ==========================================================================>
// Solution With XMLHttpRequest
// ==========================================================================>

// search.addEventListener("keyup", function () {
//   main();
// });

// function main() {
//   let codesreq = new XMLHttpRequest();

//   codesreq.open(
//     "get",
//     "https://www.weatherapi.com/docs/weather_conditions.json"
//   );

//   codesreq.send();

//   codesreq.addEventListener("loadend", function () {
//     if (codesreq.status == 200) {
//       codes = JSON.parse(codesreq.response);

//       let req = new XMLHttpRequest();
//       req.open(
//         "get",
//         `http://api.weatherapi.com/v1/forecast.json?key=e49bf28a463a4580b6d160417241501&q=${search.value}&days=7`
//       );
//       req.send();

//       req.addEventListener("loadend", function () {
//         if (req.status == 200) {
//           x = JSON.parse(req.response);

//           console.log(x);

//           whatADay.innerHTML = getDay(x.forecast.forecastday[0].date);
//           country.innerHTML = x.location.name;
//           temp.innerHTML = x.current.temp_c;
//           text.innerHTML = x.current.condition.text;

//           x.current.precip_in / x.forecast.forecastday[0].day.totalprecip_in
//             ? (Precipitation.innerHTML = `${(
//                 x.current.precip_in /
//                 x.forecast.forecastday[0].day.totalprecip_in
//               ).toFixed(1)}%`)
//             : (Precipitation.innerHTML = `0%`);
//           speedOfWind.innerHTML = `${x.current.wind_kph} km/h`;
//           windDirection(x.current.wind_dir);
//           // ===============================================>
//           whatANextDay.innerHTML = getDay(x.forecast.forecastday[1].date);
//           maxNextDay.innerHTML = `${x.forecast.forecastday[1].day.maxtemp_c} &deg;  C`;
//           minNextDay.innerHTML = `${x.forecast.forecastday[1].day.mintemp_c} &deg;  C`;
//           textNextDay.innerHTML = x.forecast.forecastday[1].day.condition.text;
//           // ===============================================>
//           whatANextNextDay.innerHTML = getDay(x.forecast.forecastday[2].date);
//           maxNextNextDay.innerHTML = `${x.forecast.forecastday[2].day.maxtemp_c} &deg; C`;
//           minNextNextDay.innerHTML = `${x.forecast.forecastday[2].day.mintemp_c} &deg;  C`;
//           textNextNextDay.innerHTML =
//             x.forecast.forecastday[2].day.condition.text;
//           // ===============================================>
//           photo(x.current.condition.code, dayy);
//           photo(x.forecast.forecastday[1].day.condition.code, photoNextDay);
//           photo(x.forecast.forecastday[2].day.condition.code, photoNextNextDay);
//         } else {
//           console.log(`Error In Some Thing`);
//         }
//       });
//     }
//   });
// }

// function windDirection(x) {
//   switch (x) {
//     case "N":
//       wind.innerHTML = "North";
//       break;
//     case "NE":
//       wind.innerHTML = "Northeast";
//       break;
//     case "E":
//       wind.innerHTML = "East";
//       break;
//     case "SE":
//       wind.innerHTML = "Southeast";
//       break;
//     case "S":
//       wind.innerHTML = "South";
//       break;
//     case "SW":
//       wind.innerHTML = "Southwest";
//       break;
//     case "W":
//       wind.innerHTML = "West";
//       break;
//     case "NW":
//       wind.innerHTML = "Northwest";
//       break;
//   }
// }

// function getDay(x) {
//   let date = new Date(x);
//   let dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

//   return dayOfWeek;
// }

// function photo(num, pho) {
//   for (let i = 0; i < codes.length; i++) {
//     if (codes[i].code == num) {
//       pho.src = `Images/weather/64x64/day/${codes[i].icon}.png`;
//     }
//   }
// }
