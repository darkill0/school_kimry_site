<script setup lang="ts">
import { ref, onMounted } from 'vue'

const usefulLinks = ref([])  // Массив для хранения данных с сервера

// Функция для получения данных с backend
const fetchUsefulLinks = async () => {
  try {
    const response = await fetch('http://localhost:3000/links')  // Порт 3000
    if (response.ok) {
      usefulLinks.value = await response.json()
    } else {
      console.error('Ошибка загрузки данных с сервера:', response.statusText)
    }
  } catch (error) {
    console.error('Ошибка при запросе данных с сервера:', error)
  }
}

// Загружаем данные при монтировании компонента
onMounted(() => {
  fetchUsefulLinks()
})
</script>

<template>
  <div class="page-container py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Полезные ссылки</h1>

    <!-- Таблица с полезными ссылками -->
    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Название
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Ссылка
          </th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(link, index) in usefulLinks" :key="index">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ link.Title }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            <a :href="link.URL" class="text-primary-600 hover:text-primary-700" target="_blank">
              {{ link.URL }}
            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.text-primary-600 {
  color: #1d4ed8;
}

.text-primary-700 {
  color: #1e40af;
}

.bg-gray-50 {
  background-color: #f9fafb;
}

.bg-white {
  background-color: white;
}

.shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.sm\:rounded-lg {
  border-radius: 0.5rem;
}

.text-xs {
  font-size: 0.75rem;
}

.font-medium {
  font-weight: 500;
}

.text-gray-500 {
  color: #6b7280;
}

.text-gray-900 {
  color: #111827;
}

.uppercase {
  text-transform: uppercase;
}

.tracking-wider {
  letter-spacing: 0.05em;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.whitespace-nowrap {
  white-space: nowrap;
}
</style>
