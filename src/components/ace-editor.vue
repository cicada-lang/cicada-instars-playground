<template>
  <div id="editor">{{ code }}</div>
</template>

<script>
  import Ace from "ace-builds"
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
      this.editor = Ace.edit("editor")
      this.handler = () => {
        this.$emit("change", this.editor.getValue())
      }
      this.editor.on("change", this.handler)
    },

    beforeDestroy() {
      this.editor.off("change", this.handler)
      this.editor.destroy()
      this.editor.container.remove()
      this.editor = null
    },
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
