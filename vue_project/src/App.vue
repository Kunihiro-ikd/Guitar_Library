<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
<div class="content">
  <h3>vue_project</h3>
  <router-link to="/">Home</router-link>
  <router-link to="/guide">Guide</router-link>
  <!-- <router-view v-slot=" { Component} ">
    <transition name="">
    <component :is="Componentd"></component>
    </transition>

  </router-view> -->
</div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
