export const useContent = () => {
  const news = useState('news', () => [])
  const guides = useState('guides', () => [])

  const addNews = (item) => {
    news.value = [item, ...news.value]
  }

  const addGuide = (item) => {
    guides.value = [item, ...guides.value]
  }

  return {
    news,
    guides,
    addNews,
    addGuide
  }
}