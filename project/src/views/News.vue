<!-- src/views/NewsList.vue -->
<template>
  <div class="page-container py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Новости и события</h1>

    <div class="grid gap-8 md:grid-cols-2">
      <article v-for="item in news" :key="item.NewsID" class="card">
        <img
            :src="item.ImageUrl || '/default-news-image.jpg'"
            :alt="`Изображение новости: ${item.Title}`"
            class="w-full h-48 object-cover rounded-t-lg"
        />
        <div class="p-6">
          <div class="text-sm text-gray-500">
            {{ new Date(item.PublishedDate).toLocaleDateString('ru-RU') }}
          </div>
          <h2 class="mt-2 text-xl font-semibold text-gray-900">{{ item.Title }}</h2>
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
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Интерфейс для новости
interface NewsItem {
  NewsID: number;
  Title: string;
  PublishedDate: string;
  Content: string;
  ImageUrl?: string; // Добавляем поле для ссылки на изображение
}

const news = ref<NewsItem[]>([]);

const fetchNews = async () => {
  try {
    const response = await fetch('http://localhost:3000/news');
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      news.value = data;
    } else {
      console.error('Ошибка загрузки новостей:', response.statusText);
    }
  } catch (error) {
    console.error('Ошибка при запросе новостей:', error);
  }
};

onMounted(() => {
  fetchNews();
});
</script>

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
</style>