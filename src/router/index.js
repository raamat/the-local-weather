import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Главная",
      },
    },
    {
      path: "/weather/:region/:name",
      name: "cityView",
      component: CityView,
      meta: {
        title: "Погода",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${
    to.params.region
      ? `${to.params.name.replaceAll("_", " ")}`
      : to.meta.title} | Прогноз погоды`;
  next();
})

export default router;
