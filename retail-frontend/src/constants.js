export default {
  URLS: {
    ITEMS: {
      LIST: '/items',
      ADD: '/items',
      EDIT: (item) => `/items/${item.id}`,
      DELETE: (item) => `/items/${item.id}`      
    }
  }
}
