export const useContent = () => {
  const news = useState('news', () => {
    if (process.client) { // Проверяем, что код выполняется на стороне клиента
      const storedNews = localStorage.getItem('news'); // Используем localStorage
      return storedNews ? JSON.parse(storedNews) : [];
    }
    return [];
  });

  const guides = useState('guides', () => {
    if (process.client) { // Проверяем, что код выполняется на стороне клиента
      const storedGuides = localStorage.getItem('guides'); // Используем localStorage
      return storedGuides ? JSON.parse(storedGuides) : [];
    }
    return [];
  });

  const saveToLocalStorage = (key, data) => {
    if (process.client) { // Проверяем, что код выполняется на стороне клиента
      localStorage.setItem(key, JSON.stringify(data)); // Сохраняем в localStorage
    }
  };

  const addNews = (item) => {
    const updatedNews = [item, ...news.value];
    news.value = updatedNews;
    saveToLocalStorage('news', updatedNews); // Сохраняем в localStorage
  };

  const addGuide = (item) => {
    const updatedGuides = [item, ...guides.value];
    guides.value = updatedGuides;
    saveToLocalStorage('guides', updatedGuides); // Сохраняем в localStorage
  };

  onMounted(() => {
    if (process.client && !guides.value.length) {
      const storedGuides = localStorage.getItem('guides');
      if (storedGuides) {
        guides.value = JSON.parse(storedGuides);
      }
    }
  });

  onMounted(() => {
    if (process.client && !news.value.length) {
      const storedNews = localStorage.getItem('news');
      if (storedNews) {
        news.value = JSON.parse(storedNews);
      }
    }
  });

  return {
    news,
    guides,
    addNews,
    addGuide
  };
};
