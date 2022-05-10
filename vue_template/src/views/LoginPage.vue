<template>
  <div class="Login">
    <h1>Login</h1>
    <form action="post">
      <input v-model="login" placeholder="login">
      <input v-model="password" placeholder="password">
    </form>
    <button @click="loginCheck">ボタン</button>
    <div class="bg-red">input:{{ message }}</div>
  </div>
</template>
<script>
// @ is an alias to /src

import axios from 'axios';

export default {
  name: 'LoginPage',

  data() {
    return {
       login: '',
       password: '',
    }
  },
  methods: {
    loginCheck() {
      const data = {'login': this.login, 'password': this.password};
      axios.post('/testA/login', data)
      .then((response) => {
        console.log(response);
        console.log('response');
      })
      .catch(error => {
        console.log(111111);
        console.log(error);
      })

    },
    getProducts() {
      const data = {'test1': 1, 'test2': 2};
      axios.get('/', data)
      .then((response) => {
        console.log(response);
        console.log('clicked');
      })
      .catch(error => {
        console.log(111111);
        console.log(error);
      })
    }
  }
}
</script>