import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/ProjectsPage.vue'),
  },
  {
    path: '/experience',
    name: 'Experience',
    component: () => import('../views/ExperiencePage.vue'),
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/BlogPage.vue'),
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('../views/GalleryPage.vue'),
  },
  {
    path: '/guestbook',
    name: 'Guestbook',
    component: () => import('../views/GuestbookPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
