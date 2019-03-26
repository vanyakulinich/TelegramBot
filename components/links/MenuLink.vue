<template>
  <nuxt-link 
    :to="path" 
    class="menu_link">
    <div @click="clickCB">{{ title }}</div>
  </nuxt-link>
</template>

<script>
export default {
  name: "MenuLink",
  props: {
    path: {
      type: String,
      default: "/"
    },
    clickCB: {
      type: Function,
      default: () => {}
    },
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.menu_link {
  text-decoration: none;
  color: inherit;
  font-size: 20px;
  margin: 5px auto;
  font-family: "Indie Flower", cursive;
}
</style>


