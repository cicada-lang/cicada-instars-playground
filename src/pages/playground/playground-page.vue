<template>
  <div class="playground">
    <div class="playground-header">
      <span class="playground-status">{{ lang }}</span>
      <button v-on:click="update">RUN ⯈</button>
      <button v-on:click="p1">P1</button>
    </div>
    <textarea class="playground-editor" v-model:value="input"> </textarea>
    <div v-if="output">
      <hr />
      <pre class="playground-output" v-html="output"></pre>
    </div>
    <div class="playground-footer"></div>
  </div>
</template>

<script lang="ts">
  import * as Playground from "../playground"
  import { Component, Vue } from "vue-property-decorator"

  @Component({ name: "Playground" })
  export default class extends Vue {
    lang = Playground.Lang.init_lang(this.$route.query.lang)
    input = Playground.Lang.welcome(this.lang)
    output = ""

    update(): void {
      this.output = Playground.Lang.runner(this.lang)(this.input)
    }

    p1(): void {
      console.log(this.lang)
    }
  }
</script>

<style scoped>
  .playground {
    padding: 0 16px;
  }

  .playground-header {
    padding: 15px 0;
  }

  .playground-header, button {
    margin: 0 3px;
  }

  .playground-status {
    margin: 0 3px;
  }

  .playground-footer {
    padding: 15px 0;
  }

  .playground-editor {
    height: 70vh;
    padding: 2px;
    border: thin solid;
    font-size: 1em;
    width: 100%;
    overflow-x: auto;
    overflow-wrap: normal;
  }

  hr {
    margin: 9px 0;
  }

  .playground-output {
    padding: 2px;
    border: thin dashed;
    font-size: 1em;
    width: 100%;
    overflow-x: auto;
    overflow-wrap: normal;
  }
</style>
