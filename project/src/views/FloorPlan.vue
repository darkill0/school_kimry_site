<template>
  <div class="container">
    <h1 class="title">План школы</h1>

    <div class="search-panel">
      <label for="room" class="label">Номер кабинета:</label>
      <input
          type="number"
          v-model="roomNumber"
          min="1"
          max="61"
          class="input"
          placeholder="Введите номер (1-61)"
      />
      <button @click="findRoom" class="button">Найти</button>
    </div>

    <transition name="fade">
      <div v-if="selectedFloor" class="map-container">
        <h2 class="floor-title">{{ floorTitles[selectedFloor - 1] }}</h2>
        <div class="image-wrapper">
          <img
              :src="floorImages[selectedFloor - 1]"
              :alt="`План ${selectedFloor} этажа`"
              class="floor-map"
          />
          <div
              v-if="markerVisible"
              class="marker"
              :style="markerStyle"
          ></div>
        </div>
        <p class="route-text">{{ routeDescription }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import image1 from '../assets/image3.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image1.png';

const roomNumber = ref('');
const markerVisible = ref(false);
const markerPosition = ref({x: 0, y: 0});
const routeDescription = ref('');
const selectedFloor = ref(null);

const floorTitles = ['Первый этаж', 'Второй этаж', 'Третий этаж'];
const floorImages = [image1, image2, image3];

// Исправленные координаты для всех этажей
const roomPositions = {
  // Первый этаж
  "1": {x: 150, y: 100, route: "Кабинет 1 находится на первом этаже.", floor: 1},
  "2": {x: 300, y: 100, route: "Кабинет 2 (спортзал) находится на первом этаже.", floor: 1},
  "3": {x: 100, y: 250, route: "Кабинет 3 находится на первом этаже.", floor: 1},
  "4": {x: 250, y: 250, route: "Кабинет 4 находится на первом этаже.", floor: 1},
  "5": {x: 400, y: 250, route: "Кабинет 5 находится на первом этаже.", floor: 1},
  "6": {x: 500, y: 100, route: "Кабинет 6 используется как склад.", floor: 1},
  "7": {x: 600, y: 100, route: "Кабинет 7 (малый зал) находится на первом этаже.", floor: 1},

  // Второй этаж - исправленные координаты
  "23": {x: 750, y: 230, route: "Кабинет 23 - русский язык и литература.", floor: 2},
  "24": {x: 700, y: 150, route: "Кабинет 24 - физика.", floor: 2},
  "25": {x: 600, y: 150, route: "Кабинет 25 - история и общество.", floor: 2},
  "26": {x: 530, y: 150, route: "Кабинет 26 - музыка.", floor: 2},
  "27": {x: 450, y: 150, route: "Кабинет 27 - английский язык.", floor: 2},
  "28": {x: 380, y: 150, route: "Кабинет 28 - коморка географики.", floor: 2},
  "29": {x: 310, y: 150, route: "Кабинет 29 - география.", floor: 2},
  "30": {x: 240, y: 150, route: "Кабинет 30 - математика.", floor: 2},
  "31": {x: 750, y: 100, route: "Кабинет 31 - обзор.", floor: 2},
  "32": {x: 680, y: 100, route: "Кабинет 32 - медпункт.", floor: 2},
  "33": {x: 610, y: 100, route: "Кабинет 33 - матан.", floor: 2},
  "34": {x: 540, y: 100, route: "Кабинет 34 - история и общество.", floor: 2},
  "35": {x: 470, y: 100, route: "Кабинет 35 - история и общество.", floor: 2},
  "36": {x: 400, y: 100, route: "Кабинет 36 - математика.", floor: 2},
  "37": {x: 330, y: 100, route: "Кабинет 37 - русский язык и литература.", floor: 2},
  "38": {x: 260, y: 100, route: "Кабинет 38 - русский язык и литература.", floor: 2},

  // Третий этаж - исправленные координаты
  "43": { x: 100, y: 100, route: "Кабинет 43 - биология.", floor: 3 },
  "44": { x: 185, y: 100, route: "Кабинет 44 - информатика.", floor: 3 },
  "45": { x: 270, y: 100, route: "Кабинет 45 - коморка химички.", floor: 3 },
  "46": { x: 355, y: 100, route: "Кабинет 46 - химия, точка роста.", floor: 3 },
  "47": { x: 440, y: 100, route: "Кабинет 47 - английский язык.", floor: 3 },
  "48": { x: 525, y: 100, route: "Кабинет 48 - началка.", floor: 3 },
  "49": { x: 610, y: 100, route: "Кабинет 49 - информационный центр.", floor: 3 },
  "50": { x: 740, y: 100, route: "Кабинет 50 - библиотека.", floor: 3 },
  "51": { x: 740, y: 175, route: "Кабинет 51 - кабинет труда.", floor: 3 },
  "52": { x: 740, y: 250, route: "Кабинет 52 - кабинет домоводства.", floor: 3 },
  "53": { x: 740, y: 325, route: "Кабинеты 53-58 - началка.", floor: 3 },
  "59": { x: 100, y: 280, route: "Кабинет 59 - психолог (напротив 54 кабинета).", floor: 3 },
  "60": { x: 220, y: 280, route: "Кабинет 60 - зам директора по АХЧ.", floor: 3 },
  "61": { x: 340, y: 280, route: "Кабинет 61 - бухгалтерия (напротив 53 кабинета).", floor: 3 }
};

const findRoom = () => {
  const room = roomNumber.value;
  if (roomPositions[room]) {
    markerVisible.value = true;
    markerPosition.value = {x: roomPositions[room].x, y: roomPositions[room].y};
    routeDescription.value = roomPositions[room].route;
    selectedFloor.value = roomPositions[room].floor;
  } else {
    markerVisible.value = false;
    routeDescription.value = "Кабинет не найден. Введите номер от 1 до 61.";
    selectedFloor.value = null;
  }
};

const markerStyle = computed(() => ({
  left: `${markerPosition.value.x}px`,
  top: `${markerPosition.value.y}px`,
}));
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Segoe UI', Arial, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.search-panel {
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 40px;
}

.label {
  font-size: 1.1rem;
  color: #34495e;
  font-weight: 500;
}

.input {
  padding: 12px 15px;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  width: 200px;
  transition: border-color 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: #3498db;
}

.button {
  padding: 12px 25px;
  font-size: 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.map-container {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.5s ease;
}

.floor-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

.image-wrapper {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 10px;
}

.floor-map {
  max-width: 100%;
  height: auto;
  display: block;
  transition: opacity 0.3s ease;
}

.marker {
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: #e74c3c;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 10px rgba(231, 76, 60, 0.7);
  animation: pulse 1.5s infinite;
}

.route-text {
  margin-top: 20px;
  font-size: 1.2rem;
  color: #34495e;
  line-height: 1.5;
}

/* Анимации */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>