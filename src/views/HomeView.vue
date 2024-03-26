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
      <ul
        v-if="apiSearchResult"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
        <p v-if="searchError">Что-то пошло не так. Попробуйте ещё раз.</p>
        <p v-if="!searchError && apiSearchResult.length === 0">
          Ничего не найдено
        </p>
        <template v-else>
          <li
            v-for="searchResult in apiSearchResult"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.name }} ({{ searchResult.region }}),
            {{ searchResult.country }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
function previewCity(searchResult) {
  console.log(searchResult);
  router.push({
    name: "cityView",
    params: {
      name: searchResult.name.replaceAll(" ", "_"),
      region: searchResult.region.replaceAll(" ", "_"),
    },
    query: {
      lat: searchResult.lat,
      lon: searchResult.lon,
      preview: true,
    },
  });
}

// Пример запроса из документации (https://www.weatherapi.com/docs/#apis-search):
// JSON: http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London

const BASE_URL = "http://api.weatherapi.com/v1/";
const API_KEY = "1f672b032d5b4f77a3f172349242003";

const searchQuery = ref("");
const queryTimeout = ref(null);
const apiSearchResult = ref(null);
const searchError = ref(null);

async function getWeather(query) {
  try {
    const cityResponse = await fetch(
      `${BASE_URL}search.json?key=${API_KEY}&q=${query}`
    );
    const city = await cityResponse.json();
    return city;
  } catch (err) {
    console.error("Произошла ошибка при запросе к API", err);
  }
}

function getSearchResult() {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await getWeather(searchQuery.value);
        apiSearchResult.value = result;
      } catch {
        searchError.value = true;
      }
      return;
    }
    apiSearchResult.value = null;
  }, 300);
}
</script>
