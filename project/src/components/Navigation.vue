<script setup lang="ts">
import { ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Главная', href: '/' },
  { name: 'Расписание', href: '/schedule' },
  { name: 'План помещения', href: '/floor-plan' },
  { name: 'Информационный портал', href: '/info-portal' },
  { name: 'Новости', href: '/news' },
  { name: 'Контакты', href: '/contact' },
]
</script>

<template>
  <Disclosure as="nav" class="bg-white shadow-md" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <img class="h-8 w-auto" src="../assets/school-logo.svg" alt="Школьный портал" />
            <span class="ml-2 text-xl font-semibold text-primary-600">Школьный портал</span>
          </div>
        </div>
        <div class="hidden sm:flex sm:space-x-8">
          <a v-for="item in navigation" 
             :key="item.name"
             :href="item.href"
             class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary-600">
            {{ item.name }}
          </a>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
            <span class="sr-only">Открыть меню</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <a v-for="item in navigation"
           :key="item.name"
           :href="item.href"
           class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50">
          {{ item.name }}
        </a>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>