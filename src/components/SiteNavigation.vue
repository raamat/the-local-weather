<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">Прогноз погоды</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
          v-if="route.query.preview"
        ></i>
      </div>
      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">О приложении:</h1>
          <p class="mb-4">
            Приложение позволяет отслеживать текущую и прогнозируемую погоду в
            выбранных вами городах.
          </p>
          <h2 class="text-2xl">Как это работает:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>Найдите свой город, введя название в строку поиска.</li>
            <li>
              Выберите город в результатах - отобразится текущая погода по
              вашему выбору.
            </li>
            <li>
              Отслеживайте город, нажав на значок «+» в правом верхнем углу. Это
              сохранит город для просмотра позже на главной странице.
            </li>
          </ol>

          <h2 class="text-2xl">Удаление города</h2>
          <p>
            Если вы больше не хотите отслеживать город, просто выберите его на
            главной странице. Внизу страницы будет возможность удалить город.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";

const modalActive = ref(null);
function toggleModal() {
  modalActive.value = !modalActive.value;
}

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();
function addCity() {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const locationObj = {
    id: crypto.randomUUID(),
    region: route.params.region,
    name: route.params.name,
    coords: {
      lat: route.query.lat,
      lon: route.query.lon,
    },
  };

  savedCities.value.push(locationObj);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
}
</script>
