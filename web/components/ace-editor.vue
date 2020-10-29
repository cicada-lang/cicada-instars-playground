<template>
  <div class="ace-editor" id="editor">{{ value }}</div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch } from "vue-property-decorator"
  import Ace from "ace-builds"
  import "ace-builds/webpack-resolver"

  @Component({
    name: "AceEditor",
  })
  export default class extends Vue {
    @Prop({ default: "" }) value!: string

    editor!: Ace.Ace.Editor
    editor_change_handler!: () => void

    mounted(): void {
      this.editor = Ace.edit("editor")
      this.editor_change_handler = () => {
        this.$emit("input", this.editor.getValue())
      }
      this.editor.on("change", this.editor_change_handler)
    }

    @Watch("value")
    _update_editor_value(value: string): void {
      const position = this.editor.getCursorPosition()
      this.editor.setValue(value)
      this.editor.clearSelection()
      this.editor.moveCursorToPosition(position)
    }

    beforeDestroy(): void {
      this.editor.container.remove()
      this.editor.off("change", this.editor_change_handler)
      this.editor.destroy()
    }
  }
</script>

<style scoped>
  .ace-editor {
    font-family: "Sarasa Mono SC", "Noto Mono", "Monaco", monospace;
  }
</style>
