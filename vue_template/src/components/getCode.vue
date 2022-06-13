<template>
  <!-- 参考 https://codesandbox.io/examples/package/vuedraggable -->
  <div class="row">
    <div :id="getList.code_id_clone" ></div>
  </div>
</template>
<script>

export default {
    props: {
      getList: {
        type: Array,
        default: () => ([])
      },
      test: {
        type: String,
        default: () => ('')
      },

    },
      data() {
      return {
        counter: 0
      }
    },

    watch: {
      getList: function() {
        console.log('getList の変化' + this.getList);
        this.makeCode();
      }


    },
    mounted() {
      if(this.getList.code) {
        
        let code_component = this.getList.code;
        //flet の最大値最小値の取得
        let flet_max = 0;
        let flet_min = 20;
        let string_list = [0, 0, 0, 0, 0, 0];
        for (let got_code_flet = 0; got_code_flet < code_component.length; got_code_flet++) {
          if (code_component[got_code_flet][1] < flet_min) {
            flet_min = code_component[got_code_flet][1];
          }
          if (code_component[got_code_flet][1] > flet_max) {
            flet_max = code_component[got_code_flet][1];
          }

        //string
        for (let got_code_string = 0; got_code_string < code_component.length; got_code_string++) {
          let string_num_exist = code_component[got_code_flet][0];
          string_list[string_num_exist] = 1;
        }
      }

      let tbl = document.createElement("table");
      let tblBody = document.createElement("tbody");

      tbl.style.display = "inline-block";
      tbl.classList.add("one_code");
      for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");

        for (let j = flet_min; j <= flet_max; j++) {
          let cell = document.createElement("td");
          let div  = document.createElement("div");

          div.classList.add("guitar_table_point");
          cell.id = "st" + i + j;
          cell.href = "";
          let cellText = document.createTextNode("-");
          for(let got_code_content = 0; got_code_content < code_component.length; got_code_content++){
            if (string_list[i] == 0) {
              row.classList.add("guitar-cell-off");
            } else if (code_component[got_code_content][0] == i && code_component[got_code_content][1] == j){
              div.classList.add("bg-primary");
              cellText = document.createTextNode("●")
            }
          }
          div.appendChild(cellText);
          cell.appendChild(div);
          row.appendChild(cell);
          row.classList.add("guitar-cell");
        }
        tblBody.appendChild(row);
      }

        let num_row = document.createElement("tr");

        for (let flet_num = flet_min; flet_num <= flet_max; flet_num ++) {
          let num_cell = document.createElement("td");
          num_cell.id = "fn" + flet_num;
          let flet_num_text = document.createTextNode(flet_num);
          num_cell.appendChild(flet_num_text);
          num_row.appendChild(num_cell);
        }
        tblBody.appendChild(num_row);
        tbl.appendChild(tblBody);
        tbl.classList.add('mr-1');
        tbl.classList.add('bg-flet');
        let aElement = document.getElementById(this.getList.code_id_clone);

        if(aElement !== null) {
          aElement.appendChild(tbl);
        }
      }


    },
    methods: {
      //TODO コード削除用
      deletCode() {
      },

    }
}

</script>