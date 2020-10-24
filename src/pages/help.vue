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
        <a href="https://github.com/cicada-lang/cicada-playground"
          >Cicada Playground</a
        >
      </li>
    </ul>

    <h2>Contents</h2>

    <p>
      For info about the languages you can play with, <br />
      please visit
      <a href="https://github.com/cicada-lang/cicada">Cicada Language</a>,
      <br />
      where you can find more code examples.
    </p>

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

  h2 {
    margin-top: 7px;
  }

  li {
    margin-left: 2em;
  }
</style>
