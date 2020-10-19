<template>
  <h1>{{ msg }}</h1>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator"

  @Component
  export default class HelloWorld extends Vue {
    @Prop() msg!: string
  }
</script>
