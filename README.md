# Приложение для отслеживания погоды

Приложение позволяет добавлять в список несколько населенных пунктов и отслеживать погоду. 
Реализован [отложенный поиск.](https://doka.guide/js/debounce/)

## Первоисточник

Плейлист с YouTube-канала Net Ninja Weather [App Build (Vue 3 & Tailwind)](https://www.youtube.com/playlist?list=PL4cUxeGkcC9hfoy8vFQ5tbXO3vY0xhhUZ)

## Изменения относительно первоисточника

- Вместо API [www.mapbox.com](https://www.mapbox.com/) (при регистрации требуется ввести данные банковской карты), применяется API [www.weatherapi.com](https://www.weatherapi.com/docs/) - миллион запросов в месяц на бесплатном тарифе.

- Не используется библиотека Axios. Запрос к API написан на ванильном JavaScript: функция [fetch()](https://doka.guide/js/fetch/), синтаксический сахар [async/awai](https://doka.guide/js/async-await/)

## :hammer: Инструменты разработки:

- [Vue 3](https://v3.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prettier](https://prettier.io/)

## Рекомендуемая IDE и расширения:

- [VSCode](https://code.visualstudio.com/)
- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## :rocket: Быстрый старт

### :one: Клонирование репозитория

**HTTPS**

```
git clone https://github.com/raamat/the-local-weather.git
```

**SSH**

```
git clone git@github.com:raamat/the-local-weather.git
```

### :two: Установка зависимостей

**NPM**

```
npm install
```

или:

```
npm i
```

**YARN**

```
yarn install
```

или:

```
yarn
```

### :three: Запуск приложения

**NPM**

```
npm run dev
```

**YARN**

```
yarn dev
```

### :four: Компиляция

**NPM**

```
npm run build
```

**YARN**

```
yarn build
```
