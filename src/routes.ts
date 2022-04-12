import Beer from './Pages/Beer'
import Lists from './Pages/Lists'
import Search from './Pages/Search'

export const routes = [
  {
    name: 'Search',
    path: '/search',
    menu: true,
    private: true,
    component: Search
  },
  {
    name: 'Lists',
    path: '/lists',
    private: true,
    menu: true,
    component: Lists
  },
  {
    name: 'Beer',
    path: '/beer',
    private: true,
    menu: false,
    component: Beer
  }
]
