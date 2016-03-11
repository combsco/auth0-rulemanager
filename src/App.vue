<template>
  <div id="app">
    <div class="container">
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
