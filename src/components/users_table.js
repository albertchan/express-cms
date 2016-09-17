import Vue from 'vue';

const template = `
<table class="table table-users">
  <thead>
    <tr>
      <td></td>
      <td>Name</td>
      <td>Email</td>
      <td>Username</td>
      <td>Date joined</td>
    </tr>
  </thead>
  <tbody>
    <user-table-row v-for="item in items" :model="item"></user-table-row>
  </tbody>
</table>`;

export const usersTable = new Vue({
  template: template,
  data: {
    items: () => []
  }
});

const usersTableRow = Vue.component('user-table-row', {
  props: {
    model: Object
  },
  template: `
    <tr>
      <td></td>
      <td><a v-bind:href="'/users/'.concat(model.username)">{{model.name}}</a></td>
      <td>{{model.email}}</td>
      <td>{{model.username}}</td>
      <td>{{model.created_at}}</td>
    </tr>`
});
