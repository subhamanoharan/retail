export default {
  URLS: {
    ITEMS: {
      LIST: '/items',
      ADD: '/items',
      EDIT: (item) => `/items/${item.id}`,
      DELETE: (item) => `/items/${item.id}`
    },
    USERS: {
      GET_ME: '/users/me',
      LOGIN: '/users/authenticate',
      LOGOUT: '/users/logout'
    },
    CATEGORIES: {
      LIST: '/categories',
    }
  },
  ROLES: {
    USER: 'user',
    ADMIN: 'admin'
  },
  STORE_NAME: 'M.S.Gurusamy Stores',
  ADDRESS: ['124, Kamarajar Salai', 'Madurai-625009'],
  PRINTING_MAX_LIMIT: 32
}
