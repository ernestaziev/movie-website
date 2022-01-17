import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Home from "../views/Home.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "",
        component: () => import("../views/MoviesList.vue"),
      },
      {
        path: "/movie/:id",
        name: "movie",
        component: () => import("../views/Movie.vue"),
      },
    ],
  },
  {
    path: "/signin",
    name: "Sign in",
    component: () => import("../views/SignIn.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/RegisterUser.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
