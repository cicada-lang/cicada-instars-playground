<template>
  <div class="home">
    <HelloWorld msg="Welcome" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import HelloWorld from "@/components/HelloWorld.vue"
  import { lang3 } from "@xieyuheng/cicada"

  const text = `
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

  const tops = lang3.frontend.parse_tops(text)
  const mod = lang3.Mod.init()
  lang3.Top.run(mod, tops)

  @Component({
    components: {
      HelloWorld,
    },
  })
  export default class Home extends Vue {}
</script>
