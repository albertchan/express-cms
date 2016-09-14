import Vue from 'vue';

const template = `
<table class="table table-users">
  <thead>
    <tr>
      <td></td>
      <td>Name</td>
      <td>Email</td>
      <td>Date joined</td>
    </tr>
  </thead>
  <tbody>
    <user-table-row v-for="item in items" :model="item"></user-table-row>
  </tbody>
</table>
`;

export const usersTable = new Vue({
  template: template,
  data: {
    items: () => [{email: 'achan@palo-it.com', name: 'Albert'}]
  }
});

const usersTableRow = Vue.component('user-table-row', {
  props: {
    model: Object
  },
  template: [
    '<tr>',
      '<td></td>',
      '<td>{{model.name}}</td>',
      '<td>{{model.email}}</td>',
      '<td>{{model.created_at}}</td>',
    '</tr>'
  ].join('')
});
