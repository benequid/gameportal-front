<template>
  <div v-if="newsItem" class="max-w-4xl mx-auto">
    <img 
      v-if="newsItem.image" 
      :src="newsItem.image" 
      :alt="newsItem.title" 
      class="w-full h-96 object-cover rounded-lg mb-8"
    >
    
    <h1 class="text-4xl font-bold mb-4">{{ newsItem.title }}</h1>
    
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center space-x-4">
        <span class="text-nord-4">{{ newsItem.author }}</span>
        <span class="text-nord-4">|</span>
        <span class="text-nord-4">{{ newsItem.date }}</span>
      </div>
      <div class="flex gap-2">
        <span 
          v-for="tag in newsItem.tags" 
          :key="tag" 
          class="bg-nord-3 px-3 py-1 rounded-full text-sm"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="prose max-w-none">
      <p class="text-xl text-nord-6 mb-8">{{ newsItem.summary }}</p>
      <div class="text-nord-6 whitespace-pre-wrap"><QuillPreview v-model="newsItem.content" /></div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { news } = useContent()


onMounted(() => {
  console.log(newsItem.content);
})

const newsItem = computed(() => 
  news.value.find(item => item.id.toString() === route.params.id)
)

if (!newsItem.value) {
  throw createError({ statusCode: 404, message: 'Новость не найдена' })
}
</script>