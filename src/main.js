import axios from "axios";
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

Vue.config.productionTip = false;
axios.defaults.baseURL='https://warm-island-73911.herokuapp.com/api/';

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
