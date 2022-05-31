<template>
  <!-- 参考 https://codesandbox.io/examples/package/vuedraggable -->
  <div class="row">
    <div id="oneCode1" class="border">
      <div :id="'code' + code_num" ></div>
      <div class="bg-primary">aaa</div>
    </div>
  </div>
</template>
<script>
const code_combination_relative_number ={0: 'C', 1: 'C#', 2: 'D', 3: 'D#', 4: 'E', 5: 'F', 6: 'F#', 7: 'G', 8: 'G#', 9: 'A', 10: 'A#', 11: 'B'};
console.log(code_combination_relative_number);
export default {
    props: {
      code_configure: {
        type: Array,
        default: () => ([])
      },
      code_num: {
        type: Number,
        default: () => (0)
      }
    },
    data() {
      return {
        counter: 0
      }
    },
    mounted() {
      console.log('mounted');
      console.log(this.code_configure.code);
      let code_component = this.code_configure.code;
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
        for(let got_code_string = 0; got_code_string < code_component.length; got_code_string++){
          let string_num_exist = code_component[got_code_flet][0];
          string_list[string_num_exist] = 1;
        }
      }

      let tbl = document.createElement("table");
      let tblBody = document.createElement("tbody");

      tbl.style.display = "inline-block"
      tbl.classList.add("one_code")
      // console.log('flet_max', flet_max, 'flet_min', flet_min);
      for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");
        for (let j = flet_min; j <= flet_max; j++) {
          let cell = document.createElement("td");
          let div  = document.createElement("div");

          div.classList.add("guitar_table_point");
          // div.addEventListener("click", callConsole, false);
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

      //flet の番号
      let num_row = document.createElement("tr");
      for (let flet_num = flet_min; flet_num <= flet_max; flet_num ++) {
        let num_cell = document.createElement("td");
        num_cell.id = "fn" + flet_num;
        // num_cellcell.href = "";
        let flet_num_text = document.createTextNode(flet_num);
        num_cell.appendChild(flet_num_text);
        num_row.appendChild(num_cell);
      }
      tblBody.appendChild(num_row);
      tbl.appendChild(tblBody);
      tbl.classList.add('mr-1');
      tbl.classList.add('bg-flet');

      // TODO ここにclassを入れる。追加
      let bElement = document.getElementById(this.code_configure.code_id);
      let text2 = document.createElement('div');
      let text3 = document.createTextNode(this.code_configure.name);
      text2.appendChild(text3);
      bElement.appendChild(text2);


      let aElement = document.getElementById(this.code_configure.code_id);
      aElement.appendChild(tbl);

      let wrap_code = document.createElement('div');
      wrap_code.id  = 'oneCode' + this.code_num;
      let text1 = document.createTextNode("Another paragraph, yay!");
      wrap_code.appendChild(text1);
      console.log('oneCode' + this.code_num);

      let testA = document.getElementById(this.code_configure.code_id);
      let child = document.createElement("p");
      child.classList.add('bg-danger');
      testA.appendChild(child);
    },
}

</script>