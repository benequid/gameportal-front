<template>
    <header class="bg-nord-bg text-nord-6 p-4">
      <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center space-x-8">
          <NuxtLink to="/" class="text-2xl font-bold text-nord-8">GP</NuxtLink>
          <nav class="space-x-6">
            <NuxtLink :to="`/`" class="hover:text-nord-8">Главная</NuxtLink>
            <NuxtLink :to="`/news`" class="hover:text-nord-8">Новости</NuxtLink>
            <NuxtLink :to="`/guides`" class="hover:text-nord-8">Гайды</NuxtLink>
          </nav>
        </div>
        <div class="relative">
          <input 
            type="text" 
            placeholder="Поиск..."
            v-model="searchQuery"
            class="bg-nord-0 text-nord-6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-nord-8 w-64"
            @focus="showResults = true"
            @input="showResults = true"
          >
          <div 
            v-if="showResults && (searchResults.news.length > 0 || searchResults.guides.length > 0)" 
            class="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50"
            @mouseleave="showResults = true"
          >
            <div v-if="searchResults.news.length > 0">
              <div class="px-4 py-2 bg-nord-0 text-white font-semibold">Новости</div>
              <NuxtLink 
                v-for="item in searchResults.news.slice(0, 3)" 
                :key="item.id"
                :to="`/news/${item.id}`"
                class="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                @click="showResults = false"
              >
                {{ item.title }}
              </NuxtLink>
            </div>
            <div v-if="searchResults.guides.length > 0">
              <div class="px-4 py-2 bg-nord-0 text-white font-semibold">Гайды</div>
              <NuxtLink 
                v-for="item in searchResults.guides.slice(0, 3)" 
                :key="item.id"
                :to="`/guides/${item.id}`"
                class="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                @click="showResults = false"
              >
                {{ item.title }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  const { searchQuery, searchResults } = useSearch()
  const showResults = ref(false)
  </script>