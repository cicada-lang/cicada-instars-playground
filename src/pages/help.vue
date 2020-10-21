<template>
  <div class="help">
    <div class="help-header"></div>
    <h1>The Cicada Playground</h1>
    <h2>About</h2>
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
    <h2>Disclaimer</h2>
    <p>
      This Web app is under active design and development, <br />
      data stored on the server should be considered temporary, <br />
      thus not be relyed upon.
    </p>
    <div class="help-footer"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"

  @Component({ name: "Help" })
  export default class extends Vue {}
</script>

<style scoped>
  .help {
    padding: 15px 17px;
  }

  li {
    margin-left: 2em;
  }
</style>
