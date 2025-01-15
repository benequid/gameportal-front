<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Опубликовать новость</h1>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
      <div>
        <label class="block text-sm font-medium text-nord-6 mb-2">Заголовок</label>
        <input
          v-model="form.title"
          type="text"
          required
          class="w-full bg-nord-0 text-nord-6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-nord-8"
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-nord-6 mb-2">Краткое содержание</label>
        <textarea
          v-model="form.summary"
          required
          rows="3"
          class="w-full bg-nord-0 text-nord-6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-nord-8"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-nord-6 mb-2">Содержание</label>
        <textarea
          v-model="form.content"
          required
          rows="6"
          class="w-full bg-nord-0 text-nord-6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-nord-8"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-nord-6 mb-2">Автор</label>
        <input
          v-model="form.author"
          type="text"
          required
          class="w-full bg-nord-0 text-nord-6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-nord-8"
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-nord-6 mb-2">Изображение (URL)</label>
        <input
          v-model="form.image"
          type="url"
          class="w-full bg-nord-0 text-nord-6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-nord-8"
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-nord-6 mb-2">Теги (через запятую)</label>
        <input
          v-model="form.tagsInput"
          type="text"
          class="w-full bg-nord-0 text-nord-6 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-nord-8"
        >
      </div>

      <button type="submit" class="w-full bg-nord-3 text-white px-6 py-2 rounded-lg hover:bg-yellow-600">
        Опубликовать
      </button>
    </form>
  </div>
</template>

<script setup>
const router = useRouter()
const { addNews } = useContent()

const form = reactive({
  title: '',
  summary: '',
  content: '',
  author: '',
  image: '',
  tagsInput: ''
})

const handleSubmit = () => {
  const news = {
    id: Date.now(),
    ...form,
    tags: form.tagsInput.split(',').map(tag => tag.trim()).filter(Boolean),
    date: new Date().toLocaleDateString()
  }
  
  addNews(news)
  router.push('/news')
}
</script>