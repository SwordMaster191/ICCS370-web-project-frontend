import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  },
  {
    path: "/booking",
    name: "Book",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import(/* webpackChunkName: "about" */ "../views/Book.vue"),
  },
];

const router = new VueRouter({
  routes,
});

//Setup beforeEach hook to check the logged in sync with the log in state with backend
router.beforeEach(async (to, from, next) => {
  //get log in state using whoami api and axios
  let response = await Vue.axios.get("/api/whoami");

  //response.data is our payload
  await store.dispatch("setLoggedInUser", response.data);
  let isLoggedIn = store.state.isLoggedIn;
  console.log(isLoggedIn);

  await store.dispatch("clearUser", response.data);

  if(to.name == "Login" && isLoggedIn){
    next({name: "Home"});
  }
  //make sure if user is logged in, they will not be able to see the login page
  //if the name of the router is not login, it needs authorization to access the page.
  if (to.name != "Login" && !isLoggedIn) {
    if (to.name == "Register") {
      next({name: "Register"})
    }
    next({name: "Login" })
  }
  else next(); //else let go
});
export default router;
