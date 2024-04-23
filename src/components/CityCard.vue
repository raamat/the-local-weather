<template>
  <div
    class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.name.replaceAll("_", " ") }}</h2>
      <h3>{{ city.region.replaceAll("_", " ") }}</h3>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">
        <span v-if="Math.round(city.weather.temp_c) > 0">+</span
        >{{ Math.round(city.weather.temp_c) }}&deg;
      </p>
      <div class="flex flex-col gap-2">
        <span>
          <i class="fa-solid fa-wind text-blue-300"></i>
          {{
            (city.weather.wind_kph / 3.6).toFixed(1).replaceAll(".", ",")
          }}
          м/с
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>
