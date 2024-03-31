<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Баннер -->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>
        Чтобы начать отслеживать этот город, нажмите значок "+" .
      </p>
    </div>
    <!-- Обзор погоды -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">
        {{ route.params.name.replaceAll("_", " ") }}
      </h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.location.localtime).toLocaleDateString("ru", {
            weekday: "long",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weatherData.location.localtime).toLocaleTimeString("ru", {
            timeStyle: "short",
          })
        }}
      </p>
      <p class="text-8xl mb-8">
        <span v-if="Math.round(weatherData.current.temp_c) > 0">+</span
        >{{ Math.round(weatherData.current.temp_c) }}&deg;
      </p>
      <p>
        Ощущается как
        <span v-if="Math.round(weatherData.current.feelslike_c) > 0">+</span
        >{{ Math.round(weatherData.current.feelslike_c) }}&deg;
      </p>
      <p>
       {{ weatherData.current.condition.text }} 
      </p>
      
      <img
        :src="weatherData.current.condition.icon"
        alt=""
        class="w-[64px] h-auto"
      />
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Информация о погоде по часам -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="md-4">Погода по часам</h2>
        <div class="flex gap-10 overflow-x-scroll mt-4">
          <div
            v-for="hourData in weatherData.forecast.forecastday[0].hour"
            :key="hourData.dt"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.time).toLocaleTimeString("ru", {
                  timeStyle: "short",
                })
              }}
              <img
                :src="hourData.condition.icon"
                alt=""
                class="w-auto h-[47px] object-cover"
              />
            </p>
            <p class="text-xl">
              <span v-if="Math.round(hourData.temp_c) > 0">+</span
              >{{ Math.round(hourData.temp_c) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Погода на неделю -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Прогноз на 7 дней</h2>
        <div
          v-for="day in weatherData.forecast.forecastday"
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(day.date).toLocaleDateString("ru", {
                weekday: "long",
              })
            }}
          </p>
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="day.day.condition.icon"
            alt=""
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>
              Днём: <span v-if="Math.round(day.day.maxtemp_c) > 0">+</span
              >{{ Math.round(day.day.maxtemp_c) }}&deg;
            </p>
            <p>
              Ночью: <span v-if="Math.round(day.day.mintemp_c) > 0">+</span
              >{{ Math.round(day.day.mintemp_c) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { BASE_URL, API_KEY } from "../constants/constApi";

const route = useRoute();
async function getWeather() {
  try {
    const dataResponse = await fetch(
      `${BASE_URL}forecast.json?key=${API_KEY}&q=${route.query.lat},${route.query.lon}&days=7&lang=ru`
      // `http://api.weatherapi.com/v1/forecast.json?key=1f672b032d5b4f77a3f172349242003&q=59.77,60.19&lang=ru`
    );
    const data = dataResponse.json();
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
</script>
