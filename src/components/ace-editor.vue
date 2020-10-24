<template>
  <div id="editor">{{ text }}</div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch } from "vue-property-decorator"
  import Ace from "ace-builds"
  import "ace-builds/webpack-resolver"

  @Component({
    name: "Playground",
  })
  export default class extends Vue {
    @Prop({ default: "" }) text!: string

    editor!: Ace.Ace.Editor
    editor_change_handler!: () => void

    mounted(): void {
      this.editor = Ace.edit("editor")
      this.editor_change_handler = () => {
        this.$emit("change", this.editor.getValue())
      }
      this.editor.on("change", this.editor_change_handler)
    }

    @Watch("text")
    on_text_change(text: string): void {
      this.editor.setValue(text)
      this.editor.clearSelection()
    }

    beforeDestroy(): void {
      this.editor.off("change", this.editor_change_handler)
      this.editor.destroy()
      this.editor.container.remove()
    }
  }
</script>

<style scoped>
  #editor {
    font-family: "Sarasa Mono SC", "Noto Mono", "Monaco", monospace;
    font-size: 1em;
    line-height: 1.5;
    height: 70vh;
    border: 2px solid gray;
  }
</style>
