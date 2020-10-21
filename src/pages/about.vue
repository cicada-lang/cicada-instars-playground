<template>
  <div class="about">
    <div class="about-header"></div>
    <h2>The Cicada Playground</h2>
    <ul>
      Authors:
      <li>
        <a href="https://inner-universe.now.sh">Xie Yuheng</a>
      </li>
    </ul>
    <ul>
      Source code:
      <li>
        <a href="https://gitlab.com/xieyuheng/cicada-playground"
          >cicada-playground</a
        >
      </li>
      <li>
        <a href="https://gitlab.com/xieyuheng/cicada">cicada</a>
      </li>
    </ul>
    <div class="about-footer"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component({ name: "About" })
  export default class extends Vue {}
</script>

<style scoped>
  .about {
    padding: 0 15px;
  }

  li {
    margin-left: 2em;
  }

  .about-header {
    padding: 15px 0;
  }

  .about-footer {
    padding: 15px 0;
  }
</style>
