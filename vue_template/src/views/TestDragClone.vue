<template>
  <div class="flex justify-center">
    <div class="flex mx-10">
      <div class="card1 w-64 flex justify-center px-5">
        <button class="btn btn-primary" @click="addList">bootstrap-btn-add-list</button>

        <div class="container">
          <div class="row">
            <div class="col">
                <div>draggable1</div>
                <draggable
                  class="dragArea list-group w-full"
                  :list="list1"
                  :group="{ name: 'people', pull: 'clone', put: false }"
                  :sort="true"
                  @change="log"
                  :move="checkMove"
                >
                  <div
                    class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                    v-for="element in list1"
                    :key="element.name"
                  >
                    {{ element.name }}
                  </div>
                </draggable>
            </div><!-- col -->

            <div class="col">
              <div class="card1 w-64 flex justify-center">
                <div>draggable2</div>
                <draggable
                  class="dragArea list-group w-full"
                  :list="list2"
                  group="people"
                  @change="log"
                  :move="checkMove"
                >
                  <div
                    class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                    v-for="element in list2"
                    :key="element.name"
                  >
                    {{ element.name }}
                  </div>
                </draggable>
              </div>
            </div><!-- col -->
          </div><!-- row -->




        </div><!-- container-->
      </div>
    </div>

    <div class="flex justify-between">
      <div>rawDisplay</div>
      <div class="container">
        <div class="row">
          <div class="col">
            <rawDisplays class="w-64 mr-1" :value="list1" />

          </div><!-- col -->
          <div class="col">
            <rawDisplays class="w-64" :value="list2" />
          </div><!-- col -->
        </div><!-- row -->
      </div><!-- container -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import rawDisplays from './rawDisplay.vue'
export default defineComponent({
  name: 'App',
  components: {
    draggable: VueDraggableNext,

    rawDisplays,
  },
  data() {
    return {
      enabled: true,
      counter: 5,
      list1: [
        { name: 'John', id: 1, string: 1, flet: 1, code_name: 'major', },
        { name: 'Joao', id: 2, string: 1, flet: 1, code_name: 'major', },
        { name: 'Jean', id: 3, string: 1, flet: 1, code_name: 'major',},
        { name: 'Gerard', id: 4, string: 1, flet: 1, code_name: 'major', },
      ],
      list2: [
        { name: 'Juan', id: 5 },
        { name: 'Edgard', id: 6 },
        { name: 'Johnson', id: 7 },
      ],
      dragging: false,
    }
  },
  methods: {
    add() {
      console.log('add')
    },
    addList() {
      this.list1.push({ name: 'addList', id: this.counter });
      this.counter++;
    },
    replace() {
      console.log('replace')
    },
    checkMove(event) {
      console.log('checkMove', event.draggedContext)
      console.log('Future index: ' + event.draggedContext.futureIndex)
    },
    log(event) {
      const { moved, added } = event

      if (moved) console.log('moved', moved)
      if (added) console.log('added', added, added.element)
    },
  },
})
</script>
<style>
.item-attribute {
  padding: 10px;
  border: 1px solid black;
}
.clone-grid {
  display: flex;
}
</style>