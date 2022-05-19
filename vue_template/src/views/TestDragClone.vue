<template>
  <div class="row">
    <div id="test1" class="col-12"></div>
    <div class="col-12 container">
      <h3>Draggable 1</h3>

      <draggable
        class="dragArea row  flex-nowrap overflow-auto"
        :list="list1"
        :group="{ name: 'people', pull: 'clone', put: false }"
        @change="endDrag"
      >
        <div
          class="list-group-item col-3 "
          v-for="element, index in list1"
          :key="element.name"
        >
          <div>
            {{ element.name }}
          </div>
          <div :id="'code' + index"></div>
        </div>
      </draggable>
    </div>

    <div class="col-12">
      <h3>Draggable 2</h3>
      <draggable
        class="dragArea row flex-nowrap overflow-auto"
        :list="list2"
        group="people"
        @change="log"
      >
        <div
          class="list-group-item col-2"
          v-for="element in list2"
          :key="element.name"
        >
          {{ element.name }}
        </div>
      </draggable>
    </div>
    <div id="test2"></div>


  </div>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
const string1 = [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[0,10],[0,11],[0,12],[0,13],[0,14],[0,15],[0,16],[0,17],[0,18],[0,19],[0,20]];
const string2 = [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9],[1,10],[1,11],[1,12],[1,13],[1,14],[1,15],[1,16],[1,17],[1,18],[1,19],[1,20]];
const string3 = [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9],[2,10],[2,11],[2,12],[2,13],[2,14],[2,15],[2,16],[2,17],[2,18],[2,19],[2,20]];
const string4 = [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[3,10],[3,11],[3,12],[3,13],[3,14],[3,15],[3,16],[3,17],[3,18],[3,19],[3,20]];
const string5 = [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],[4,10],[4,11],[4,12],[4,13],[4,14],[4,15],[4,16],[4,17],[4,18],[4,19],[4,20]];
const string6 = [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10],[5,11],[5,12],[5,13],[5,14],[5,15],[5,16],[5,17],[5,18],[5,19],[5,20]];
const strings = [
    string1,
    string2,
    string3,
    string4,
    string5,
    string6,
];
export default {
  name: "cloneDrag",
  order: 2,
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      list1: [],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ],
      codeCombination: [],
      code_num: 0,
      couter_made_code: 0,
    };
  },
  watch: {
    list1() {
      console.log('list1変化');
    }
  },
  updated() {
    this.$nextTick(() => {
      for(let i = 0; i < this.codeCombination.length; i++) {
        this.makeCode(this.codeCombination[i], i);
      }
    })
  },
  mounted() {
    let tbl     = document.createElement("table");
    let tblBody = document.createElement("tbody");

    tbl.style.display = "inline-block"
    tbl.classList.add("one_code")
    // creating all cells
    for (let i = 0; i < 6; i++) {
      let row = document.createElement("tr");

      for (let j = 0; j < 15; j++) {
        let cell = document.createElement("td");
        let div  = document.createElement("div");
        div.classList.add("guitar_table_point");
        let cellText = document.createTextNode("a");

        //各cell の td に入れる id を作成
        cell.id     = "sf" + i + j;
        let cell_id = "sf" + i + j;
        cell.href   = "";
        div.appendChild(cellText);
        cell.appendChild(div);

        // セルをクリックした時、関数が動く
        cell.addEventListener("click", this.makeCodeHtmlGuitar.bind(cell_id), false);
        row.appendChild(cell);
      }
      tblBody.appendChild(row);
      tblBody.classList.add("guitar-cell");
    }
    //flet の序数
    let row_flet_num = document.createElement("tr");
    for (let k = 0; k < 15; k++) {
      let cell_flet_num = document.createElement("td");
      let flet_num_text = document.createTextNode(k);
      cell_flet_num.appendChild(flet_num_text);
      row_flet_num.appendChild(cell_flet_num);
    }
    tblBody.appendChild(row_flet_num);

    tbl.appendChild(tblBody);
    let aElement = document.getElementById("test1");
    aElement.appendChild(tbl);
  },
  methods: {
    //初期化
    codeInitialization() {
      let previus_dlement = document.getElementById("draggaleCreateCode");
      if (previus_dlement !== null) {
        while (previus_dlement.firstChild) {
          previus_dlement.removeChild(previus_dlement.firstChild);
        }
      }
    },

  makeCodeHtmlGuitar(cell_id) {
       //クリックされたセルのid の設定
      let set_string = -1;
      let set_flet   = -1;

      if (cell_id.currentTarget.id.length === 5) {// フレットが10以上
        set_string = cell_id.currentTarget.id.substring(2, 3);
        set_flet   = cell_id.currentTarget.id.substring(3, 5);
      } else { // フレットが10以上
        set_string = cell_id.currentTarget.id.substring(2, 3);
        set_flet   = cell_id.currentTarget.id.substring(3, 4);
      }

      let root_sound = [Number(set_string), Number(set_flet)];

      // クリックしたセルから、作成すべきコードの添字配列を作成する
      let got_codes_list = this.allGuitarCodeList(root_sound, 'major');
      this.couter_made_code = got_codes_list;

      //dragAndDropの初期化・追加
      this.list1 = [];
      for (let i = 0; i < got_codes_list.length; i++) {
        this.list1.push({ name: 'Code' + i, id: 100, code: got_codes_list[i], })
      }
      this.codeCombination = got_codes_list;
    },

    //ギターのフレットをクリックした時、クリックしたセルの弦とフレットの序数を取得
    //入力から、コードを押さえるための strings の添え字を出力
    //入力 例root_code_position = [2,4], kind_of_code = [0, 4, 5] major
    //出力 例[  [[1,2], [2,3], [3,4]],  [[2,3],[3,4],[4,5],[5,6] ]]
    allGuitarCodeList(root_sound, kind_of_code) {
      //変数の初期化
      const code_root_position   = [Number(root_sound[0]), Number(root_sound[1])];
      const all_string_flet_list = strings;//存在するフレットと弦のリスト
      const absolute_root        = this.absoluteSoundNum(root_sound);//root 絶対音を作成
      const absolute_root_origin = Number(absolute_root % 12);

      console.log('allGuitarCodeList渡された変数', root_sound, kind_of_code, this.showSound(absolute_root_origin));

      //TODO 今後major以外の配列も作成できるようにする
      // let code          = kind_of_code;こんな感じで渡す
      const code                    = [0, 4, 7];
      const search_string_limit_max = code_root_position[0] - 1;
      const search_string_limit_min = -1;
      const search_flet_limit_max   = ((code_root_position[1] + 4) > 20) ? 20 : code_root_position[1] + 4;
      const search_flet_limit_min   = ((code_root_position[1] - 4) < 0)  ?  0 : code_root_position[1] - 4;

      //コードの構成に使えそうなポジションの洗い出し
      let all_code_positions = [[], [], [], [], [], []];
      for (let a_search_string = search_string_limit_max; search_string_limit_min < a_search_string; a_search_string--){//弦[ [弦, フレット], [弦, フレット], ... ] TODO ここどうする？？
        for (let a_search_flet = search_flet_limit_min;  a_search_flet <  search_flet_limit_max; a_search_flet++) {//フレット[弦, フレット]
          //音階が和音になるか確認
          // TODO 追加されるポジションが間違っている
          let judge_code_component = false;
          let search_number = this.absoluteSoundNum(all_string_flet_list[a_search_string][a_search_flet]) % 12;

          // コードになりえるポジション追加
          for (let code_component = 0; code_component < code.length; code_component++) {
            let test = (absolute_root_origin + code[code_component]) % 12;
            // console.log('検索', showSound(test));
            if (search_number  == test) {
              judge_code_component = true;
            }
          }
          // 候補ポジションを all_code_positions に追加
          if (judge_code_component) {
            // TODO all_code_positionsが間違っている。
            all_code_positions[a_search_string].push(all_string_flet_list[a_search_string][a_search_flet]);
          }
        }
      }
      //TODO 洗い出したポジションを組み合わせてコードを作る
      let result = this.combinePosition(root_sound, all_code_positions);

      this.code_num = result.length;

      return result;//[Aray(6), Array(6), Array(6), ...]
    },

    absoluteSoundNum(root_position) {
        // const root        = 12;
        const string_root = root_position[0];
        const flet_root   = root_position[1];

        let absoluteSoundNum_result = 0;
        
        switch (string_root){
            case 0:
                absoluteSoundNum_result = 24 + flet_root ;
                break;
            case 1:
                absoluteSoundNum_result = 19 + flet_root ;
                break;
            case 2:
                absoluteSoundNum_result = 15 + flet_root ;
                break;
            case 3:
                absoluteSoundNum_result = 10 + flet_root ;
                break;
            case 4:
                absoluteSoundNum_result = 5 + flet_root ;
                break;
            case 5:
                absoluteSoundNum_result = 0 + flet_root + 12;
                break;
        }
        return absoluteSoundNum_result;
    },

    showSound(showSound) {
        let sound_list = ['E','F','F#','G','G#','A','A#','B','C','C#','D','D#'];
        return showSound,sound_list[showSound];
    },

    combinePosition(root_sound, all_code_positions) {
        console.log('root_sound all_code_positions', root_sound, all_code_positions);
        let clicked_string = root_sound[0];
        let combine_position = [];
        let result =[];
        let string1_position = all_code_positions[0];
        let string2_position = all_code_positions[1];
        let string3_position = all_code_positions[2];
        let string4_position = all_code_positions[3];
        let string5_position = all_code_positions[4];
        // console.log(string1_position.length, string2_position.length, string3_position.length, string4_position.length, string5_position.length);
        switch (clicked_string){
            case 0:
                result = [];
                break;
            case 1:
                result = [];
                break;
            case 2:
              for(let string1_variable = 0; string1_variable < string1_position.length; string1_variable++){
                  for(let string2_variable = 0; string2_variable < string2_position.length; string2_variable++){
                      combine_position.push([
                          all_code_positions[0][string1_variable],
                          all_code_positions[1][string2_variable],
                          root_sound,
                          [],
                          [],
                          [],
                      ]);
                  }
              }
              
              break;
            case 3:
              for(let string1_variable = 0; string1_variable < string1_position.length; string1_variable++){
                  for(let string2_variable = 0; string2_variable < string2_position.length; string2_variable++){
                      for(let string3_variable = 0; string3_variable < string3_position.length; string3_variable++){
                          combine_position.push([
                              all_code_positions[0][string1_variable],
                              all_code_positions[1][string2_variable],
                              all_code_positions[2][string3_variable],
                              root_sound,
                              [],
                              [],
                          ]);
                      }
                  }
              }
                break;
            case 4:
              for(let string1_variable = 0; string1_variable < string1_position.length; string1_variable++){
                  for(let string2_variable = 0; string2_variable < string2_position.length; string2_variable++){
                      for(let string3_variable = 0; string3_variable < string3_position.length; string3_variable++){
                          for(let string4_variable = 0; string4_variable < string4_position.length; string4_variable++){
                              combine_position.push([
                                all_code_positions[0][string1_variable],
                                all_code_positions[1][string2_variable],
                                all_code_positions[2][string3_variable],
                                all_code_positions[3][string4_variable],
                                root_sound,
                                []
                              ]);
                          }
                      }
                  }
              }
                
                break;

            case 5:
              for(let string1_variable = 0; string1_variable < string1_position.length; string1_variable++){
                  for(let string2_variable = 0; string2_variable < string2_position.length; string2_variable++){
                      for(let string3_variable = 0; string3_variable < string3_position.length; string3_variable++){
                          for(let string4_variable = 0; string4_variable < string4_position.length; string4_variable++){
                              for(let string5_variable = 0; string5_variable < string5_position.length; string5_variable++){
                                  combine_position.push([
                                    all_code_positions[0][string1_variable],
                                    all_code_positions[1][string2_variable],
                                    all_code_positions[2][string3_variable],
                                    all_code_positions[3][string4_variable],
                                    all_code_positions[4][string5_variable],
                                    root_sound
                                  ]);
                              }
                          }
                      }
                  }
              }
              break;
        }

        result = combine_position;

        return result;
        // return all_code_positions;
    },
   addList() {
      this.list2.push({ name: 'addList', id: this.counter });
      this.counter++;
    },
    replace() {
      console.log('replace')
    },
    checkMove(event) {
      console.log('checkMove', event.draggedContext);
      console.log('Future index: ' + event.draggedContext.futureIndex)
    },
    // log(event) {
    //   const { moved, added } = event

    //   if (moved) console.log('moved', moved)
    //   if (added) console.log('added', added, added.element)
    // },
    makeCode(code_configure, code_num) {
      console.log('makecCode!!!!');

      let code_view = document.getElementById('code' + code_num);
      if (code_view.firstChild !== null) {
        code_view.removeChild(code_view.firstChild);
      }
      // for(let i = 0; i < this.couter_made_code; i++) {
      //   if (code_view !== null) {
      //     while (code_view.firstChild) {
      //     }
      //   }
      // }
      let code_component = code_configure;
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
      // code_num_id = code_num - 1;
      console.log('makeCode');
      let aElement = document.getElementById('code' + code_num);
      aElement.appendChild(tbl);
    },
    log() {
      console.log('log')
    },
    endDrag() {
      console.log('update');
    }
  }
};
</script>
<style scoped></style>