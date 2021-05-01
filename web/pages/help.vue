<template>
  <div class="help">
    <h1>The Cicada Instars Playground</h1>

    <h2 class="help__headline">About</h2>

    <ul>
      Authors:
      <li class="help__list-entry">
        <a href="https://inner-universe.now.sh">Xie Yuheng</a>
      </li>
    </ul>

    <ul>
      Source code:
      <li class="help__list-entry">
        <a href="https://github.com/cicada-lang/cicada-instars-playground"
          >Cicada Playground</a
        >
      </li>
    </ul>

    <h2 class="help__headline">Contents</h2>

    <p>
      For info about the languages you can play with, <br />
      please visit
      <a href="https://github.com/cicada-lang/cicada-instars">Cicada Instars</a>,
      <br />
      where you can find more code examples.
    </p>

    <h2 class="help__headline">Disclaimer</h2>

    <p>
      This Web app is under active design and development, <br />
      data stored on the server should be considered temporary, <br />
      thus not be relyed upon.
    </p>
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

  .help__headline {
    margin-top: 7px;
  }

  .help__list-entry {
    margin-left: 2em;
  }
</style>
