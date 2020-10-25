<template>
  <div class="playground">
    <div class="playground-header">
      <button class="playground-header-run" @click="run">RUN &gt;</button>
      <button>
        LANG:
        <select v-model="project.lang" @change="select_lang">
          <option v-for="lang in langs" :value="lang">{{ lang }}</option>
        </select>
      </button>
      <button>
        EDITOR:
        <select v-model="project.editor" @change="select_editor">
          <option v-for="editor in editors" :value="editor">
            {{ editor }}
          </option>
        </select>
      </button>
      <!-- MIDDLE -->
      <button class="playground-header-right">
        <router-link to="/help">HELP</router-link>
      </button>
      <button class="playground-header-right" @click="share">\SHARE/</button>
      <button class="playground-header-right" @click="save">
        <span v-if="modified">+SAVE+</span>
        <span v-else>-SAVE-</span>
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

    <div v-if="message">
      <separator label="MESSAGE" />
      <pre class="playground-message" v-html="message"></pre>
    </div>

    <div v-if="project.output">
      <separator label="OUTPUT" />
      <pre class="playground-output" v-html="project.output"></pre>
    </div>

    <div class="playground-footer"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator"
  import * as Playground from "../playground"
  import * as Project from "@/models/project"
  import AceEditor from "@/components/ace-editor.vue"
  import Separator from "@/components/separator.vue"
  import * as ut from "../../ut"

  @Component({
    name: "Playground",
    components: {
      AceEditor,
      Separator,
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
    modified: boolean = false
    message: string = ""

    async mounted(): Promise<void> {
      await Playground.init_project(this.project, this.$route.query)
    }

    run(): void {
      this.project.output = Playground.Lang.runner(this.project.lang)(
        this.project.input
      )
      this.save()
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
      this.message = ut.aline(`\
          |You can share your project by this link:
          |    // generating ...
          |`)
      const project_id = await Playground.create_project(this.project)
      const link = `${window.location.origin}?project_id=${project_id}`
      this.message = ut.aline(`\
          |You can share your project by this link:
          |    <a href=${link}>${link}</a>
          |`)
    }

    @Watch("project", { deep: true })
    _update_modified_state(): void {
      this.modified = true
      this.message = ""
    }

    save(): void {
      Object.assign(localStorage, Project.build(this.project))
      this.modified = false
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

  .playground-footer {
    padding: 15px 0;
  }

  .playground-header button {
    padding: 4px 7px;
    border: thin solid;
    background-color: #fcfaf2;
  }

  .playground-header select {
    background-color: #fcfaf2;
    border: none;
  }

  .playground-header .playground-header-run {
    background-color: #a8d8b9;
  }

  .playground-header-right {
    float: right;
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

  .playground-message {
    padding: 2px;
    border: thin dashed;
    font-size: 1em;
    width: 100%;
    overflow-x: auto;
    background-color: #fcfaf2;
    overflow-wrap: normal;
  }

  .playground-output {
    padding: 2px;
    border: thin dashed;
    font-size: 1em;
    width: 100%;
    overflow-x: auto;
    background-color: #fcfaf2;
    overflow-wrap: normal;
  }
</style>
