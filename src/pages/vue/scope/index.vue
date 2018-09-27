<template>
  <todo-list v-bind:todos="todos">
    <!-- 将 `slotProps` 定义为插槽作用域的名字 -->
    <template slot-scope="slotProps">
      <!-- 为待办项自定义一个模板，-->
      <!-- 通过 `slotProps` 定制每个待办项。-->
      <span v-if="slotProps.todo.isComplete">✓</span>
      {{ slotProps.todo.text }}
    </template>
  </todo-list>
</template>

<script>
import todos from './coms/list.json'
import todoList from './coms/todolist'
export default {
  data () {
    return {
      todos
    }
  },
  components: {
    todoList
  }
}
</script>

<style>

</style>
