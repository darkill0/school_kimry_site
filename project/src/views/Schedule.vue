<template>
  <div class="schedule-page">
    <h1 class="page-title">Расписание занятий</h1>

    <!-- Выбор дня недели -->
    <div class="day-selector">
      <button
          v-for="day in daysOfWeek"
          :key="day.value"
          @click="selectDay(day.value)"
          :class="{ 'active': selectedDay === day.value }"
      >
        {{ day.label }}
      </button>
    </div>

    <!-- Фильтры -->
    <div class="filters">
      <select v-model="selectedGroup" class="filter-select">
        <option value="">Все группы</option>
        <option v-for="group in uniqueGroups" :key="group" :value="group">{{ group }}</option>
      </select>

      <select v-model="selectedTeacher" class="filter-select">
        <option value="">Все преподаватели</option>
        <option v-for="teacher in uniqueTeachers" :key="teacher" :value="teacher">{{ teacher }}</option>
      </select>

      <select v-model="selectedRoom" class="filter-select">
        <option value="">Все аудитории</option>
        <option v-for="room in uniqueRooms" :key="room" :value="room">{{ room }}</option>
      </select>
    </div>

    <!-- Расписание -->
    <div class="schedule-container">
      <div v-if="filteredSchedule.length === 0" class="no-schedule">
        На выбранный день расписания нет
      </div>

      <div v-for="(classItem, index) in filteredSchedule" :key="index" class="schedule-card">
        <div class="class-info">
          <h3>{{ classItem.ClassName }}</h3>
        </div>

        <div class="schedule-items">
          <div v-for="(item, idx) in classItem.schedule" :key="idx" class="schedule-item">
            <div class="time">
              {{ formatTime(item.StartTime) }} - {{ formatTime(item.EndTime) }}
            </div>
            <div class="subject">{{ item.Subject }}</div>
            <div class="teacher">{{ item.Teacher }}</div>
            <div class="room">{{ item.Room }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Данные
const scheduleData = ref([])
const daysOfWeek = [
  { value: 'Monday', label: 'Понедельник' },
  { value: 'Tuesday', label: 'Вторник' },
  { value: 'Wednesday', label: 'Среда' },
  { value: 'Thursday', label: 'Четверг' },
  { value: 'Friday', label: 'Пятница' },
  { value: 'Saturday', label: 'Суббота' }
]

// Фильтры
const selectedDay = ref('')
const selectedGroup = ref('')
const selectedTeacher = ref('')
const selectedRoom = ref('')

// Получение текущего дня недели
const getCurrentDay = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const today = new Date().getDay()
  return days[today]
}

// Загрузка данных
const fetchSchedule = async () => {
  try {
    // Здесь должен быть ваш API запрос
    const response = await fetch('http://localhost:3000/schedule')
    if (response.ok) {
      scheduleData.value = await response.json()
    } else {
      console.error('Ошибка загрузки расписания')
    }
  } catch (error) {
    console.error('Ошибка:', error)
  }
}

const formatTime = (timeString) => {
  if (!timeString) return '--:--';

  // Извлекаем часы и минуты из строки
  const timeParts = timeString.toString().match(/(\d{2}):(\d{2})/);
  if (timeParts && timeParts.length >= 3) {
    return `${timeParts[1]}:${timeParts[2]}`;
  }

  console.warn('Не удалось разобрать время:', timeString);
  return '--:--';
};
// Уникальные значения для фильтров
const uniqueGroups = computed(() => {
  return [...new Set(scheduleData.value.map(item => item.ClassName))]
})

const uniqueTeachers = computed(() => {
  return [...new Set(scheduleData.value.map(item => item.Teacher))]
})

const uniqueRooms = computed(() => {
  return [...new Set(scheduleData.value.map(item => item.Room))]
})

// Фильтрация расписания
const filteredSchedule = computed(() => {
  // Группировка по классам
  const groupedByClass = {}

  scheduleData.value.forEach(item => {
    // Фильтрация по дню недели
    if (item.DayOfWeek !== selectedDay.value) return

    // Фильтрация по группе
    if (selectedGroup.value && item.ClassName !== selectedGroup.value) return

    // Фильтрация по преподавателю
    if (selectedTeacher.value && item.Teacher !== selectedTeacher.value) return

    // Фильтрация по аудитории
    if (selectedRoom.value && item.Room !== selectedRoom.value) return

    if (!groupedByClass[item.ClassName]) {
      groupedByClass[item.ClassName] = {
        ClassName: item.ClassName,
        schedule: []
      }
    }

    groupedByClass[item.ClassName].schedule.push({
      StartTime: item.StartTime,
      EndTime: item.EndTime,
      Subject: item.Subject,
      Teacher: item.Teacher,
      Room: item.Room
    })
  })

  // Сортировка по времени
  Object.values(groupedByClass).forEach(classItem => {
    classItem.schedule.sort((a, b) => {
      return new Date(`2000-01-01T${a.StartTime}`) - new Date(`2000-01-01T${b.StartTime}`)
    })
  })

  return Object.values(groupedByClass)
})

// Выбор дня
const selectDay = (day) => {
  selectedDay.value = day
}

// Инициализация
onMounted(() => {
  fetchSchedule()

  // Установка текущего дня недели
  const currentDay = getCurrentDay()
  if (daysOfWeek.some(day => day.value === currentDay)) {
    selectedDay.value = currentDay
  } else {
    selectedDay.value = 'Monday' // По умолчанию понедельник, если сегодня воскресенье
  }
})
</script>

<style scoped>
.schedule-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.day-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
  flex-wrap: wrap;
}

.day-selector button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.day-selector button:hover {
  background-color: #e0e0e0;
}

.day-selector button.active {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 200px;
}

.schedule-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.schedule-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.class-info {
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.class-info h3 {
  margin: 0;
  color: #333;
}

.schedule-items {
  display: flex;
  flex-direction: column;
}

.schedule-item {
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  gap: 15px;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.schedule-item:last-child {
  border-bottom: none;
}

.time {
  font-weight: bold;
  color: #555;
}

.subject {
  font-weight: bold;
}

.teacher {
  color: #666;
}

.room {
  text-align: right;
  color: #4CAF50;
  font-weight: bold;
}

.no-schedule {
  text-align: center;
  padding: 20px;
  color: #666;
  background-color: #f9f9f9;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .schedule-item {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 8px;
  }

  .time {
    grid-column: 1;
    grid-row: 1;
  }

  .subject {
    grid-column: 2;
    grid-row: 1;
  }

  .teacher {
    grid-column: 1;
    grid-row: 2;
  }

  .room {
    grid-column: 2;
    grid-row: 2;
    text-align: left;
  }

  .filters {
    flex-direction: column;
  }

  .filter-select {
    width: 100%;
  }
}
</style>