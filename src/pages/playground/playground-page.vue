<template>
  <div class="playground">
    <div class="playground-header">
      <button class="playground-header-run" v-on:click="run">
        {{ run_icon }}
      </button>
      <select
        class="playground-header-select"
        v-model="lang"
        v-on:change="select"
      >
        <option v-for="lang in langs" v-bind:value="lang">{{ lang }}</option>
      </select>
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
    langs = Playground.Lang.langs
    input = Playground.Lang.welcome(this.lang)
    output = ""
    run_icon = "RUN >"

    run(): void {
      this.output = Playground.Lang.runner(this.lang)(this.input)
    }

    select(event: any): void {
      this.input = Playground.Lang.welcome(this.lang)
      this.$router.replace({
        query: {
          ...this.$route.query,
          lang: event.target.value,
        },
      })
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

  .playground-status {
    color: gray;
  }

  .playground-header-bar {
    margin: 4px;
    color: gray;
  }

  .playground-header button {
    padding: 4px 7px;
    border: thin solid;
  }

  .playground-header select {
    padding: 4px 7px;
    border: thin solid;
  }

  .playground-header-run {
    background-color: #a8d8b9;
  }

  .playground-header-select {
    background-color: #fcfaf2;
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
