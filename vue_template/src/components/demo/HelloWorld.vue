<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-10 align-self-center">
        <h2>How To Use</h2>
        <p>Plan</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  date() {
    return {
      count: 6,
      items: [
          {id:1, name: "ITEM - 1"},
          {id:2, name: "ITEM - 2"},
          {id:3, name: "ITEM - 3"},
          {id:4, name: "ITEM - 4"},
          {id:5, name: "ITEM - 5"},
      ]
    }
  },
 
}
</script>
