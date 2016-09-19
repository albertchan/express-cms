import Vue from 'vue';

const template = `
<div class="row browse-posts">
  <post-panel v-for="item in items" :model="item"></post-panel>
</div>`;

export const postsList = new Vue({
  template: template,
  data: {
    items: () => []
  }
});

const postPanel = Vue.component('post-panel', {
  props: {
    model: Object
  },
  template: `
    <div class="panel panel-default">
      <div class="panel-body">
        <h4><a v-bind:href="'/posts/'.concat(model.slug)">{{model.title}}</a></h4>
        <div class="meta">{{model.created_at}}</div>
        <p>{{model.summary}}</p>
      </div>
    </div>`
});
