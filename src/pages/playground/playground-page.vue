<template>
  <div class="playground">
    <div class="playground-header">
      <button @click="update">RUN ⯈</button>
      <!-- <button>...</button> -->
    </div>
    <textarea class="playground-editor" v-model:value="input"></textarea>
    <pre class="playground-output" v-html="output"></pre>
  </div>
</template>

<script lang="ts">
  import * as Playground from "../playground"
  import { Component, Vue } from "vue-property-decorator"
  const welcome = require("@/examples/lang3/welcome.cic")

  @Component({ name: "Playground" })
  export default class extends Vue {
    input = welcome
    output = ""

    update(): void {
      this.output = Playground.run(this.input)
    }
  }
</script>

<style scoped>
  .playground {
    display: grid;
    grid-template-rows: 10vh 70vh auto;
    overflow-y: auto;
    margin: 0 16px;
  }
  .playground-header {
    padding: 15px 0;
  }

  .playground-output {
    background-color: #f9ffff;
    font-size: 0.8em;
  }
</style>
