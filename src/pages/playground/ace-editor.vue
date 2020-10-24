<template>
  <div ref="editor">{{ code }}</div>
</template>

<script>
  import ace from "ace-builds"
  import "ace-builds/webpack-resolver"

  export default {
    props: {
      code: {
        type: String,
        required: true,
        default: "",
      },
    },
    data() {
      return {
        /** @type {import("ace-builds").Ace.Editor} */
        editor: null,
        handler: null,
      }
    },
    methods: {
      overwrite(code) {
        this.editor.setValue(code)
        this.editor.clearSelection()
      },
    },
    mounted() {
      const editor = ace.edit(this.$refs.editor)
      editor.container.style.lineHeight = 1.5
      editor.container.style.fontSize = "14px"
      editor.renderer.updateFontSize()

      this.handler = () => {
        this.$emit("change", editor.getValue())
      }
      editor.on("change", this.handler)

      this.editor = editor
    },
    beforeDestroy() {
      this.editor.off("change", this.handler)
      this.editor.destroy()
      this.editor = null
    },
  }
</script>

<style scoped>
  div {
    height: 70vh;
    border: 4px solid #bbb;
  }
</style>
