<template>
  <div class="playground">
    <div class="playground-header">
      <button @click="update">RUN ⯈</button>
      <!-- <button>...</button> -->
    </div>
    <textarea class="playground-editor" v-model:value="input"></textarea>
    <pre class="playground-output" v-html="output"></pre>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { pt, lang3, Trace } from "@xieyuheng/cicada"

  const example = `\
@datatype Pair : (Type) -> (Type) -> Type {
  pair : (A: Type) -> (B: Type) -> (first: A) -> (second: B) -> Pair(A)(B)
}

greeting : (String) -> Pair(String)(String)
greeting = (name) => Pair.pair(String)(String)("Welcome")(name)

@show greeting("Raymond")
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

  @Component({ name: "Playground" })
  export default class Playground extends Vue {
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
    grid-template-rows: 10vh 70vh auto;
    overflow-y: auto;
    margin: 0 16px;
  }
  .playground-header {
    padding: 15px 0;
  }

  .playground-output {
    background-color: #f9ffff;
    font-size: 0.8em;
  }
</style>
