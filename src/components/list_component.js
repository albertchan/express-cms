import Vue from 'vue';

export const ListComponent = Vue.component('list-component', {
  data: {
    items: () => []
  },
  template: `<li v-for="item in items"></li>`
});
