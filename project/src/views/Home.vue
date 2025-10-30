<!-- src/views/Home.vue -->
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

// Интерфейс для новости
interface NewsItem {
  NewsID: number;
  Title: string;
  PublishedDate: string;
  Content: string;
  ImageUrl?: string; // Поле для ссылки на изображение
}

const news = ref<NewsItem[]>([]); // Массив новостей с типизацией

// Получение новостей с backend
const fetchNews = async () => {
  try {
    const response = await fetch('http://localhost:3000/news');
    if (response.ok) {
      const data = await response.json();
      news.value = data; // Заполняем массив новостей
    } else {
      console.error('Ошибка загрузки новостей:', response.statusText);
    }
  } catch (error) {
    console.error('Ошибка при запросе новостей:', error);
  }
};

// Функция для сортировки и получения последних 3 новостей
const recentNews = computed(() => {
  return news.value
      .sort((a, b) => new Date(b.PublishedDate).getTime() - new Date(a.PublishedDate).getTime()) // Сортировка по дате
      .slice(0, 3); // Берем только 3 последние новости
});

onMounted(() => {
  fetchNews(); // Загружаем новости при монтировании компонента
});
</script>

<template>
  <div class="min-h-screen">
    <div class="relative">
      <div class="absolute inset-0">
        <img class="w-full h-[500px] object-cover" src="../assets/education-bg.png" alt="Education background">
        <div class="absolute inset-0 bg-primary-600 mix-blend-multiply opacity-40"></div>
      </div>

      <div class="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Привет, ученик!
        </h1>
        <p class="mt-6 text-xl text-white max-w-3xl">
          Здесь ты найдешь всю необходимую информацию о школьной жизни, расписании занятий,
          мероприятиях и многом другом. Мы рады помочь тебе в твоем образовательном путешествии!
        </p>
      </div>
    </div>

    <div class="page-container py-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Последние новости</h2>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="item in recentNews" :key="item.NewsID" class="card">
          <img
              :src="item.ImageUrl || '/images/soch.jpg'"
              :alt="`Изображение новости: ${item.Title}`"
              class="w-full h-48 object-cover rounded-t-lg"
              @error="handleImageError"
          />
          <div class="p-6">
            <div class="text-sm text-gray-500">
              {{ new Date(item.PublishedDate).toLocaleDateString('ru-RU') }}
            </div>
            <h3 class="mt-2 text-xl font-semibold text-gray-900">{{ item.Title }}</h3>
            <p class="mt-3 text-gray-600 line-clamp-3">{{ item.Content }}</p>
            <router-link
                :to="{ name: 'NewsDetail', params: { id: item.NewsID } }"
                class="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700"
            >
              Читать далее
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-primary-600 {
  color: #2563eb;
}

.text-primary-700 {
  color: #1e40af;
}

.bg-primary-600 {
  background-color: #2563eb;
}
</style>