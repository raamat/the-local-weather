<template>
  <div></div>
</template>

<script setup>
const BASE_URL = "http://api.weatherapi.com/v1/";
const API_KEY = "1f672b032d5b4f77a3f172349242003";
import { ref } from "vue";
import { useRoute } from "vue-router";

const city = ref("");

const route = useRoute();
async function getWeather() {
  try {
    const data = await fetch(
      `${BASE_URL}current.json?key=${API_KEY}&q=${route.query.lat},${route.query.lon}`
    );
    return data;
  } catch (err) {
    console.error("Произошла ошибка при запросе к API", err);
  }
}

async function getWeatherData() {
  try {
    const weatherData = await getWeather();
    return weatherData;
  } catch (err) {
    console.error(err);
  }
}

const weatherData = await getWeatherData();
console.log(weatherData)
</script>
