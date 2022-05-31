<template>
  <MainHeader></MainHeader>
  <div class="about">
    <h1>views/AboutView.s</h1>
  </div>
</template>

<script>
import MainHeader from  '../components/header/MainHeader.vue'

export default{
  name: 'AboutView',
  components: {
    MainHeader: MainHeader,
  }
}
</script>
