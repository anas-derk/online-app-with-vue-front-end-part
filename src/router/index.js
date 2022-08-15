import { createRouter, createWebHistory } from 'vue-router'
import routes from "../routes/index"

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from) => {
  document.title = `Online Store - ${to.name}`;
});

export default router