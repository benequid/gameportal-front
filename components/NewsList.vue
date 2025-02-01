<template>
  <div>
    <h1>Новости</h1>
    <div v-if="loading">Загрузка...</div>
    <div v-else>
      <select v-model="selectedTag">
        <option value="">Все теги</option>
        <option v-for="tag in uniqueTags" :key="tag" :value="tag">{{ tag }}</option>
      </select>

      <div v-for="item in filteredNews" :key="item.id">
        <h2>{{ item.title }}</h2>
        <p>{{ item.summary }}</p>
        <p>Автор: {{ item.author }}</p>
        <p>Дата: {{ item.date }}</p>
        <div>
          <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const selectedTag = ref('');
const news = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await useNuxtApp().$axios.get('/news'); // Запрос к вашему API
    news.value = response.data; // Предполагаем, что API возвращает массив новостей
  } catch (error) {
    console.error('Ошибка при загрузке новостей:', error);
  } finally {
    loading.value = false;
  }
});

const uniqueTags = computed(() => {
  const tags = news.value.flatMap(item => item.tags);
  return [...new Set(tags)];
});

const filteredNews = computed(() => {
  if (!selectedTag.value) return news.value;
  return news.value.filter(item => item.tags.includes(selectedTag.value));
});
</script>

