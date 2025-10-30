<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = () => {
  // Здесь будет логика отправки формы
  console.log('Form submitted:', formData.value)
}
</script>

<template>
  <div class="page-container py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Контакты</h1>
    
    <div class="grid gap-8 md:grid-cols-2">
      <div class="card">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Контактная информация</h2>
        <div class="space-y-4">
          <p class="flex items-center text-gray-700">
            <span class="font-medium mr-2">Телефон:</span>
            <a href="tel:+71234567890" class="text-primary-600 hover:text-primary-700">+7 (123) 456-78-90</a>
          </p>
          <p class="flex items-center text-gray-700">
            <span class="font-medium mr-2">Email:</span>
            <a href="mailto:info@school.ru" class="text-primary-600 hover:text-primary-700">info@school.ru</a>
          </p>
          <p class="flex items-center text-gray-700">
            <span class="font-medium mr-2">Адрес:</span>
            <span>г. Москва, ул. Школьная, д. 1</span>
          </p>
        </div>
      </div>
      
      <div class="card">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Форма обратной связи</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Имя</label>
            <input
              type="text"
              id="name"
              v-model="formData.name"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700">Сообщение</label>
            <textarea
              id="message"
              v-model="formData.message"
              rows="4"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            ></textarea>
          </div>
          
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  </div>
</template>