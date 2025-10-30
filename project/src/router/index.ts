import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Schedule from '../views/Schedule.vue'
import FloorPlan from '../views/FloorPlan.vue'
import InfoPortal from '../views/InfoPortal.vue'
import News from '../views/News.vue'
import Contact from '../views/Contact.vue'
import NewsDetail from "../views/NewsDetail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: Schedule
    },
    {
      path: '/floor-plan',
      name: 'floor-plan',
      component: FloorPlan
    },
    {
      path: '/news/:id',
      name: 'NewsDetail',
      component: NewsDetail,
    },
    {
      path: '/info-portal',
      name: 'info-portal',
      component: InfoPortal
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    }
  ]
})

export default router