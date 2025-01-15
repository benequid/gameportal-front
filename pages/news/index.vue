<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Новости</h1>
      <NuxtLink to="/news/create" class="bg-nord-3 text-nord-6 px-6 py-2 rounded-lg hover:bg-nord-9">
        Опубликовать новость
      </NuxtLink>
    </div>

    <div class="mb-8">
      <select v-model="selectedTag" class="bg-nord-3 px-4 py-2 rounded-lg border">
        <option value="">Все теги</option>
        <option v-for="tag in uniqueTags" :key="tag" :value="tag">{{ tag }}</option>
      </select>
    </div>

    <div class="grid gap-6">
      <NuxtLink 
        v-for="item in filteredNews" 
        :key="item.id" 
        :to="`/news/${item.id}`"
        class="bg-nord-0 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
      >
        <div class="flex gap-6">
          <div class="w-64 h-48 flex-shrink-0">
            <img 
              v-if="item.image" 
              :src="item.image" 
              :alt="item.title" 
              class="w-full h-full object-cover rounded"
            >
          </div>
          <div class="flex-grow flex flex-col">
            <h2 class="text-xl font-bold mb-2">{{ item.title }}</h2>
            <p class="text-nord-6 mb-4 flex-grow">{{ item.summary }}</p>
            <div class="flex items-end justify-between">
              <div class="space-y-1">
                <div class="text-sm text-nord-4">{{ item.author }}</div>
                <div class="text-sm text-nord-4">{{ item.date }}</div>
              </div>
              <div class="flex gap-2">
                <span v-for="tag in item.tags" :key="tag" class="bg-nord-3 px-2 py-1 rounded text-sm">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { news } = useContent()
const selectedTag = ref('')

const uniqueTags = computed(() => {
  const tags = news.value.flatMap(item => item.tags)
  return [...new Set(tags)]
})

const filteredNews = computed(() => {
  if (!selectedTag.value) return news.value
  return news.value.filter(item => item.tags.includes(selectedTag.value))
})
</script>