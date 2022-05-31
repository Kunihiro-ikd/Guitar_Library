<template>
  <MainHeader></MainHeader>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
// @ is an alias to /src
import MainHeader from  '../../components/header/MainHeader.vue'
import HelloWorld from '../../components/demo/HelloWorld.vue'
import axios from 'axios';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    MainHeader
  },
  setup() {
    return {
    }
  },
  methods: {
    getProducts() {
      const data = {'test1': 1, 'test2': 2};
      axios.post('/', data)
      .then(response => {
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
