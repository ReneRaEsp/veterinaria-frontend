import axios from "axios";
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

Vue.config.productionTip = false;
axios.defaults.baseURL='http://localhost:3000/api/';

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
