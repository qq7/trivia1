import Vue from 'vue';
import vueResource from 'vue-resource';
import App from './App.vue';
import VueMdl from 'vue-mdl';
import 'material-design-lite';

Vue.use(vueResource);
Vue.use(VueMdl);

new Vue({
  el: '#app',
  render: h => h(App)
})
