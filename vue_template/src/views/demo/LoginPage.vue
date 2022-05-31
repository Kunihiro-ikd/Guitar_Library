<template>
  <LoginComponent></LoginComponent>
</template>
<script>
// @ is an alias to /src

import LoginComponent from '../../components/login/LoginView.vue'

export default {
  name: 'LoginPage',

  data() {
    return {
       login: '',
       password: '',
       success: 0,
    }
  },
  components: {
    LoginComponent: LoginComponent,
  },

}
</script>