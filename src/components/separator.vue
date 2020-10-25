<template>
  <div v-if="label" class="separator">{{ label }}</div>
  <hr v-else />
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator"

  @Component({ name: "Separator" })
  export default class extends Vue {
    @Prop() label?: string
  }
</script>

<style scoped>
  hr {
    margin: 0.5em 0;
  }

  .separator {
    display: flex;
    align-items: center;
    text-align: center;
  }

  .separator::before,
  .separator::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #333333;
  }

  .separator::before {
    margin-right: 0.3em;
  }

  .separator::after {
    margin-left: 0.3em;
  }
</style>
