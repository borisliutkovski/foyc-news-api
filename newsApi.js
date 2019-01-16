let newsStorage = [
  {
    id: '23e23aet',
    title: 'Article about politics',
  },
  {
    id: '346thjbkxdfg',
    title: 'Whatever i cant be bothered',
  },
]

function getNews(id) {
  if (id) {
    const news = newsStorage.find(news => news.id === id)
    if (!news) throw new Error('404')

    return news
  }

  return newsStorage
}

function addNews(news) {
  if (typeof news !== 'object') {
    throw new Error('news must be an object')
  }

  news = { ...news, id: createId() }
  newsStorage = [...newsStorage, news]

  return news.id
}

function updateNews(updatedNews) {
  if (!newsStorage.find(({ id }) => updatedNews.id === id)) {
    throw new Error('404')
  }

  newsStorage = newsStorage.map(oldNews =>
    oldNews.id === updatedNews.id ? updatedNews : oldNews)
}

function deleteNews(id) {
  if (!newsStorage.find(oldNews => oldNews.id === id)) {
    throw new Error('404')
  }

  newsStorage = newsStorage.filter(oldNews => oldNews.id !== id)
}

/**
 * stolen
 */
function createId() {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

module.exports = {
  getNews,
  addNews,
  updateNews,
  deleteNews,
}
