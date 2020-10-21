<template>
  <div class="playground">
    <div class="playground-header">
      <button class="playground-header-run" v-on:click="run">
        {{ run_icon }}
      </button>
      <button class="playground-header-select">
        <select v-model="lang" v-on:change="select">
          <option v-for="lang in langs" v-bind:value="lang">{{ lang }}</option>
        </select>
      </button>
      <!-- MIDDLE -->
      <button class="playground-header-help">
        <router-link to="/help">HELP</router-link>
      </button>
      <button class="playground-header-share" v-on:click="share">
        {{ share_icon }}
      </button>
    </div>
    <textarea class="playground-editor" v-model:value="input"></textarea>
    <div v-if="output">
      <hr />
      <pre class="playground-output" v-html="output"></pre>
    </div>
    <div class="playground-footer"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import * as Playground from "../playground"
  import * as ut from "../../ut"

  @Component({ name: "Playground" })
  export default class extends Vue {
    langs = Playground.Lang.langs
    lang = Playground.Lang.init_lang(this.$route.query.lang)
    input = ""
    project_id =
      typeof this.$route.query.project_id === "string"
        ? this.$route.query.project_id
        : undefined
    output = ""
    run_icon = "RUN >"
    share_icon = "\\SHARE/"

    async created() {
      if (this.project_id) {
        const respond = await fetch(`api/project?project_id=${this.project_id}`)
        const project = await respond.json()
        this.lang = project.lang
        this.input = project.main
      } else {
        this.input = Playground.Lang.init_input(this.lang)
      }
    }

    run(): void {
      this.output = Playground.Lang.runner(this.lang)(this.input)
    }

    select(event: any): void {
      this.input = Playground.Lang.init_input(this.lang)
      this.output = ""
      this.$router.replace({
        query: {
          ...this.$route.query,
          lang: event.target.value,
        },
      })
    }

    async share(): Promise<void> {
      this.output = ut.aline(`\
      |You can share your project by this link:
      |    // generating ...
      |`)
      const respond = await fetch("api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang: this.lang, main: this.input }),
      })
      const project_id = await respond.json()
      const link = `${window.location.origin}?project_id=${project_id}`
      this.output = ut.aline(`\
      |You can share your project by this link:
      |    <a href=${link}>${link}</a>
      |`)
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
    background-color: #fcfaf2;
    border: none;
  }

  .playground-header-run {
    background-color: #a8d8b9;
  }

  .playground-header-share {
    background-color: #fcfaf2;
    float: right;
  }

  .playground-header-help {
    background-color: #fcfaf2;
    float: right;
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
