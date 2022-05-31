<template>
  <div class="center-block">
    <h1>Login</h1>
    <form action="post">
      <input v-model="login" placeholder="login">
      <input v-model="password" placeholder="password">
    </form>
    <button @click="loginCheck">ボタン</button>
    <div class="bg-red">success:{{ success }}</div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default{
    name: 'LoginComponent',
    methods: {
      loginCheck() {
      const data = {'login': this.login, 'password': this.password};
      axios.post('/login', data)
        .then((response) => {
            console.log(response.data);
            this.success = response;
            console.log('response');
            localStorage.setItem('accessToken', response.data.access_token);
        })
        .catch(error => {
            console.log(error);
        })
      },

    getProducts() {
      const data = {'test1': 1, 'test2': 2};
      axios.get('/', data)
        .then((response) => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }
    }
  }
</script>