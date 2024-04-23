<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>

  <p v-if="savedCities.length === 0">
    Нет добавленных городов. Для добавления выполните поиск в поле выше.
  </p>
</template>

<script setup>
import { ref } from "vue";
import CityCard from "./CityCard.vue";
import { BASE_URL, API_KEY } from "../constants/constApi";
import { useRouter } from "vue-router";

const savedCities = ref([]);
async function getCities() {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));

    const requests = [];
    savedCities.value.forEach((city) => {
      requests.push(getWeatherData(city));
    });
    const weatherData = await Promise.all(requests);

    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.current;
    });
  }
}

async function getWeatherData(city) {
  try {
    const dataResponse = await fetch(
      `${BASE_URL}current.json?key=${API_KEY}&q=${city.coords.lat},${city.coords.lon}&lang=ru`
    );
    const data = dataResponse.json();
    return data;
  } catch (err) {
    console.error("Произошла ошибка при запросе к API", err);
  }
}

await getCities();

const router = useRouter();
function goToCityView(city) {
  router.push({
    name: "cityView",
    params: { region: city.region, name: city.name },
    query: { id: city.id, lat: city.coords.lat, lon: city.coords.lon },
  });
}
</script>
