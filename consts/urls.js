const API_BASE = 'http://www.localhost:8000/'

const routes = {
  api: {
    login: 'users/auth/login/',
    register: 'users/auth/register/',
    user: 'users/user',
  },
}

function formatRoutes(routes) {
  for (let route of Object.keys(routes.api)) {
    routes.api[route] = API_BASE + routes.api[route]
  }

  return routes
}

const urls = formatRoutes(routes)

export default urls
