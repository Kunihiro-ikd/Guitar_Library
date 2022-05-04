<template>
  <div class="home">
    <div>
      vies/HomeView.vue
      <button @click="getProducts" class="btn btn-primary">GetProducts</button>
    </div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios';

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  methods: {
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
