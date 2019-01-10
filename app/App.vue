<template>
    <div id="app">
      <div class='main'>
      <div class='header'>
        HEADER
      </div>
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
      </div>
    </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style scoped>
  #app {
    height: 100%;
    width: 100%;
    background-color: blue;
    font-size: 50px;
  }
  .header {
    font-style: italic;
    color: green;
  }
  .main {
    background-color: brown;
    height: 100%;
    width: 100%;
  }
</style>

