window.addEventListener("load", () => {
  let long;
  let lat;

  let temperatureDescription = document.querySelector(
    ".temperature-description p"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let displayIcon = document.querySelector(".icon");
  let degreeSection = document.querySelector(".degree-section");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const api = `${proxy}https://api.darksky.net/forecast/${
        config.apiKey
      }/${lat},${long}`;
      fetch(api)
        .then(Response => {
          return Response.json();
        })
        .then(data => {
          // console.log(data);
          const { temperature, summary, icon } = data.currently;

          //Change Farenheit to Celsius Formula
          let celsius = (temperature - 32) * (5 / 9);

          //Set DOM Elements from the API
          temperatureDegree.textContent = Math.floor(celsius);
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          temperatureSpan.textContent = "°C";

          //Set Icon
          setIcons(icon, displayIcon);

          //Toggle temperature mode
          degreeSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "°C") {
              temperatureSpan.textContent = "°F";
              temperatureDegree.textContent = Math.floor(temperature);
            } else {
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = Math.floor(celsius);
            }
          });
        });
    });
  }

  //Locating and running Icon.
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
