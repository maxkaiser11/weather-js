async function getWeather(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current&elements=datetime,temp,humidity,windspeed,conditions`;
  let response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }
  const data = await response.json();
  const currentCondition = data.currentConditions;
  return {
    date: currentCondition.datetime,
    condition: currentCondition.conditions,
  };
}

const form = document.querySelector("#weather-form");
const locationInput = document.querySelector("#location");
const result = document.querySelector("#result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const location = locationInput.value.trim();
  if (!location) return;

  try {
    const weather = await getWeather(location);
    result.textContent = `${location}: ${weather.condition}, ${weather.date}`;
  } catch (err) {
    result.textContent = "Could not fetch weather for that city";
    console.error(err);
  }
});
