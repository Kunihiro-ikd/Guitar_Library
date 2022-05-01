
<template>
  <div>
    <h1>components/dragAndDrop.vue</h1>
    <draggable v-model="items" draggable=".item">
      <div v-for="item in items" :key="item.id" class="item">
        {{item.name}}
      </div>
    </draggable>
    <button @click="showItems">表示</button>
  </div>
</template>

<script>
import Vue from 'vue';
import draggable from 'vuedraggable';

function dumpObj(any){
  return JSON.stringify(obj, null, 2)
}

export default Vue.extend({
  name: "Swap",
  components: {
    draggable
  },
  data() {
    return {
      items1: [
        { id: 1, name: "ITEM - 1" },
        { id: 2, name: "ITEM - 2" },
        { id: 3, name: "ITEM - 3" },
        { id: 4, name: "ITEM - 4" },
      ],
      items2: [
        { id: 5, name: "ITEM - 5" },
        { id: 6, name: "ITEM - 6" },
        { id: 7, name: "ITEM - 7" },
        { id: 8, name: "ITEM - 8" },
      ]
    }
  },
  computed: {
    formattedItems1(): string {
      return dumpObj(this.items1);
    },
    formattedItems2(): string {
      return dumpObj(this.items2);
    },
  }
})
</script>