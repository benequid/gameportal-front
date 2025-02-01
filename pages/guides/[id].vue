<template>
  <div v-if="guideItem" class="max-w-4xl mx-auto">
    <img 
      v-if="guideItem.image" 
      :src="guideItem.image" 
      :alt="guideItem.title" 
      class="w-full h-96 object-cover rounded-lg mb-8"
    >
    
    <h1 class="text-4xl font-bold mb-4">{{ guideItem.title }}</h1>
    
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center space-x-4">
        <span class="text-nord-4">{{ guideItem.author }}</span>
        <span class="text-nord-4">|</span>
        <span class="text-nord-4">{{ guideItem.date }}</span>
      </div>
      <div class="flex gap-2">
        <span 
          v-for="tag in guideItem.tags" 
          :key="tag" 
          class="bg-nord-3 px-3 py-1 rounded-full text-sm"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="prose max-w-none">
      <p class="text-xl text-nord-6 mb-8">{{ guideItem.summary }}</p>
      <div class="text-nord-6 whitespace-pre-wrap"><QuillPreview v-model="guideItem.content" /></div>
    </div>
  </div>
</template>

<script setup>
import QuillPreview from '~/components/QuillPreview.vue';

const route = useRoute()
const { guides } = useContent()

const guideItem = computed(() => 
  guides.value.find(item => item.id.toString() === route.params.id)
)

if (!guideItem.value) {
  throw createError({ statusCode: 404, message: 'Гайд не найден' })
}
</script>