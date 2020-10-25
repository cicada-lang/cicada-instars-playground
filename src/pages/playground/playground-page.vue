<template>
  <div class="playground">

    <div class="playground-header">
      <button class="playground-header-run" @click="run">
        RUN &gt;
      </button>
      <button class="playground-header-lang">
        LANG:
        <select v-model="project.lang" @change="select_lang">
          <option v-for="lang in langs" :value="lang">{{ lang }}</option>
        </select>
      </button>
      <button class="playground-header-editor">
        EDITOR:
        <select v-model="project.editor" @change="select_editor">
          <option v-for="editor in editors" :value="editor">{{
            editor
          }}</option>
        </select>
      </button>
      <!-- MIDDLE -->
      <button class="playground-header-right playground-header-help">
        <router-link to="/help">HELP</router-link>
      </button>
      <button
        class="playground-header-right playground-header-share"
        @click="share"
      >
        \SHARE/
      </button>
    </div>

    <textarea
      v-if="project.editor === 'Minimal'"
      class="playground-editor"
      v-model:value="project.input"
      spellcheck="false"
    ></textarea>

    <ace-editor
      v-if="project.editor === 'Ace'"
      class="playground-editor"
      v-model:value="project.input"
    />

    <div v-if="project.output">
      <hr />
      <pre class="playground-output" v-html="project.output"></pre>
    </div>

    <div class="playground-footer"></div>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import * as Playground from "../playground"
  import * as Project from "@/models/project"
  import AceEditor from "@/components/ace-editor.vue"
  import * as ut from "../../ut"
  import * as CodeMirror from "codemirror"

  @Component({
    name: "Playground",
    components: {
      AceEditor,
    },
  })
  export default class extends Vue {
    langs: Array<string> = Playground.Lang.supported_langs
    editors: Array<string> = Playground.Editor.supported_editors
    project: Project.Project = {
      input: "",
      output: "",
      lang: "lang3",
      editor: "Ace",
    }

    async mounted(): Promise<void> {
      await Playground.initialize_project(this.project, this.$route.query)
    }

    run(): void {
      this.project.output = Playground.Lang.runner(this.project.lang)(
        this.project.input
      )
    }

    select_lang(event: HTMLElementEvent<HTMLSelectElement>): void {
      this.project.input = Playground.Lang.welcome(this.project.lang)
      this.project.output = ""
      this.$router.replace({
        query: {
          ...this.$route.query,
          lang: event.target.value,
        },
      })
    }

    select_editor(event: HTMLElementEvent<HTMLSelectElement>): void {
      this.$router.replace({
        query: {
          ...this.$route.query,
          editor: event.target.value,
        },
      })
    }

    async share(): Promise<void> {
      const project = { ...this.project }
      this.project.output = ut.aline(`\
          |You can share your project by this link:
          |    // generating ...
          |`)
      const project_id = await Playground.create_project(project)
      const link = `${window.location.origin}?project_id=${project_id}`
      this.project.output = ut.aline(`\
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

  .playground-header-right {
    float: right;
  }

  .playground-header-share {
    background-color: #fcfaf2;
  }

  .playground-header-help {
    background-color: #fcfaf2;
  }

  .playground-header-editor {
    background-color: #fcfaf2;
  }

  .playground-header-lang {
    background-color: #fcfaf2;
  }

  .playground-footer {
    padding: 15px 0;
  }

  .playground-editor {
    height: 70vh;
    padding: 2px;
    border: thin solid;
    line-height: 1.5;
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
