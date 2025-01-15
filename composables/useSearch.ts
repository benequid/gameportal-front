export const useSearch = () => {
  const { news, guides } = useContent()
  const searchQuery = ref('')
  
  const searchResults = computed(() => {
    if (!searchQuery.value.trim()) return { news: [], guides: [] }
    
    const query = searchQuery.value.toLowerCase()
    
    const filteredNews = news.value.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query))
    )
    
    const filteredGuides = guides.value.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query))
    )
    
    return { news: filteredNews, guides: filteredGuides }
  })
  
  return {
    searchQuery,
    searchResults
  }
}