<template>
  <div>{{propC}}<br>{{propB}}<br>{{PersonA}}</div>
</template>

<script>
import {Person} from '@/common/utils'
export default {
  data () {
    return {}
  },
  props: {
    PersonA: {
      type: Person
    },
    propC: {
      type: String,
      required: true
    },
    propB: [String, Number]
  }
}
</script>

<style>

</style>
