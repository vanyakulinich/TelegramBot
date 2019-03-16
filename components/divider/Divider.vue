<template>
  <v-divider :style="style"></v-divider>
</template>

<script>
export default {
  name: "divider",

  props: {
    height: {
      type: String,
      default: "2px"
    },
    width: {
      type: String,
      default: "100%"
    }
  },
  computed: {
    style() {
      return `
        height: ${this.height};
        width: ${this.width};
      `;
    }
  }
};
</script>

