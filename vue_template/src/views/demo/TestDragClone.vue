<template>
  <MainHeader></MainHeader>
  <CreateCode></CreateCode>
</template>

<script>
import MainHeader from  '../../components/header/MainHeader.vue'
import CreateCode from '../../components/demo/CreateCode.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: "cloneDrag",
  order: 2,
  components: {
    MainHeader: MainHeader,
    CreateCode: CreateCode,
  },
  data() {
    return {
      list1: [],
      list2: [
        { "name": "Code1", "id": 100, "code": [ [ 0, 8 ], [ 1, 8 ], [ 2, 12 ], [ 3, 10 ], [], [] ], "code_id": "180e45c8e1dCode1" },
      ],
      codeCombination: [],
      code_num: 0,
      couter_made_code: 0,
    };
  },
  updated() {
    this.$nextTick(() => {
      for(let i = 0; i < this.codeCombination.length; i++) {
        this.makeCode(this.codeCombination[i], i);
      }
    })
  },
})
</script>