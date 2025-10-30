<!-- src/views/NewsDetail.vue -->
<template>
  <div class="page-container py-12">
    <router-link
        to="/news"
        class="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
    >
      <svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Назад к новостям
    </router-link>

    <div v-if="newsItem" class="card">
      <img
          :src="newsItem.ImageUrl || '/default-news-image.jpg'"
          :alt="`Изображение новости: ${newsItem.Title}`"
          class="w-full h-96 object-cover rounded-t-lg"
      />
      <div class="p-8">
        <div class="text-sm text-gray-500">
          {{ new Date(newsItem.PublishedDate).toLocaleDateString('ru-RU') }}
        </div>
        <h1 class="mt-2 text-3xl font-bold text-gray-900">{{ newsItem.Title }}</h1>
        <p class="mt-6 text-gray-700 leading-relaxed whitespace-pre-wrap">{{ newsItem.Content }}</p>
      </div>
    </div>
    <div v-else class="text-center text-gray-600">
      <p>Новость не найдена или загружается...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Интерфейс для новости
interface NewsItem {
  NewsID: number;
  Title: string;
  PublishedDate: string;
  Content: string;
  ImageUrl?: string;
}

const route = useRoute();
const newsItem = ref<NewsItem | null>(null);

const fetchNewsItem = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/news/${id}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data.recordsets[0][0])
      newsItem.value = data.recordsets[0][0];
    } else {
      console.error('Ошибка загрузки новости:', response.statusText);
    }
  } catch (error) {
    console.error('Ошибка при запросе новости:', error);
  }
};

onMounted(() => {
  const id = route.params.id as string;
  fetchNewsItem(id);
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
}

.text-primary-600 {
  color: #2563eb;
}

.text-primary-700 {
  color: #1e40af;
}

.whitespace-pre-wrap {
  white-space: pre-wrap;
}
</style>