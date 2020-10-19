<template>
  <div class="playground">
    <textarea v-model:value="input"></textarea>
    <button @click="update">RUN</button>
    <pre>{{ output }}</pre>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { pt, lang3, Trace } from "@xieyuheng/cicada"

  const example = `
@datatype List : (Type) -> Type {
  null: (T: Type) -> List(T)
  cons: (T: Type) -> (head: T) -> (tail: List(T)) -> List(T)
}

@show List
@show List.null
@show List.cons
@show List.null(String)
@show List.cons(String)("abc")(List.null(String))
  `

  function run(text: string): string {
    try {
      const tops = lang3.frontend.parse_tops(text)
      const mod = lang3.Mod.init()
      return lang3.Top.run(mod, tops)
    } catch (error) {
      if (error instanceof Trace.Trace) {
        const trace = error
        return Trace.repr(trace, lang3.Exp.repr)
      }
      if (error instanceof pt.ParsingError) {
        let message = error.message
        message += "\n"
        message += pt.Span.report(error.span, text)
        return message
      }
      throw error
    }
  }

  @Component
  export default class Home extends Vue {
    input = example
    output = ""

    update(): void {
      this.output = run(this.input)
    }
  }
</script>

<style scoped>
  .playground {
    display: grid;
    grid-template-columns: 50fr 7fr 50fr;
    height: 100vh;
    width: 100vw;
  }
</style>
