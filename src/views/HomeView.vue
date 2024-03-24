<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResult"
        placeholder="Введите название города"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul v-if="searchResult"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
        <li
          v-for="result in searchResult"
          :key="result.id"
          class="py-2 cursor-pointer"
        >
          {{ result.name }} ({{ result.region }}), {{ result.country }}
        </li>
      </ul>
    </div>
    <!-- <p>{{ searchQuery }}</p>
    <button class="bg-slate-600 px-1 py-1" @click="getWeather(searchQuery)">
      Поиск
    </button> -->
  </main>
</template>

<script setup>
import { ref } from "vue";

// Пример запроса из документации (https://www.weatherapi.com/docs/#apis-search):
// JSON: http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London

const BASE_URL = "http://api.weatherapi.com/v1/";
const API_KEY = "1f672b032d5b4f77a3f172349242003";

const searchQuery = ref("");
const queryTimeout = ref(null);
let searchResult = ref(null);

async function getWeather(query) {
  try {
    const cityResponse = await fetch(
      `${BASE_URL}search.json?key=${API_KEY}&q=${query}`
    );
    const city = await cityResponse.json();
    //console.log(`Температура в городе ${query}: ${city.current.temp_c} ℃`);
    //console.log(city)
    return city;
  } catch (err) {
    console.error("Произошла ошибка!", err);
  }
}

function getSearchResult() {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      const result = await getWeather(searchQuery.value);
      //searchResult.value = result.data.features;
      searchResult.value = result;
      console.log(searchResult)
      console.log(searchResult.value)
      return;
    }
    searchResult.value = null;
  }, 300);
}
</script>
