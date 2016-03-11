<template>
  <div id="app">
    <div class="container">
      <!-- <div class="notification">
        This container is <strong>centered</strong> on desktop.
      </div> -->
      <br>
      <h1 class="title">Rules Manager</h1>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import store from './vuex/store'
export default {
  store,
  replace: false
}
</script>

<style>
</style>
