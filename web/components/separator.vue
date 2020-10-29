<template>
  <div class="separator">
    <div class="separator--with-label" v-if="label">{{ label }}</div>
    <div class="separator--without-label" v-else><hr /></div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator"

  @Component({ name: "Separator" })
  export default class extends Vue {
    @Prop() label?: string
  }
</script>

<style scoped>
  .separator--without-label {
    padding: 0.5em 0;
  }

  .separator--with-label {
    display: flex;
    align-items: center;
    text-align: center;
  }

  .separator--with-label::before,
  .separator--with-label::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #333333;
  }

  .separator--with-label::before {
    padding-right: 0.3em;
  }

  .separator--with-label::after {
    padding-left: 0.3em;
  }
</style>
