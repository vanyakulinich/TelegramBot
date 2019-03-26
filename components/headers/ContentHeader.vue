<template>
  <div class="header">{{ text }}</div>
</template>

<script>
export default {
  name: "ContentHeader",
  props: {
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.header {
  font-family: "Indie Flower", cursive;
  opacity: 0.5;
  font-size: 34px;
  text-decoration: underline;
  text-align: right;
}
@media (max-width: 370px) {
  .header {
    font-size: 25px;
  }
}
</style>

