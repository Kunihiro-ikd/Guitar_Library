<template>
  <div class="hello">
    <div>components/HelloWorld.vue</div>
    <div class="container">
      <div class="row">
          <div id="test1" class="col-12"></div>

        <div class="col-12">
          <h3>draggle </h3>
          <div class="container">
            <draggable
              class="dragArea w-full bg-pink row flex-nowrap overflow-auto"
              :list="list1"
              :group="{ name: 'people', pull: 'clone', put: false }"
              :sort="true"
              @change="log"
              :move="checkMove"
            >
            <template v-for="(code, index) in list1" :key="code" >
                <oneCode
                  :code_configure="code"
                  :code_num="index"
                  class="col-auto"
                >
                {{index}}
                </oneCode>
            </template>
            <div>
            </div>
  
              <!-- <div
                class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                v-for="element in list1"
                :key="element.name"
              >
                {{ element.name }}
              </div> -->
  
            
            </draggable>
          </div>
          <h3>drag accept</h3>
          <draggable
            class="dragArea list-group w-full"
            :list="list2"
            group="people"
            @change="log"
            :move="checkMove"
          >
          <pickOneCode
              v-for="code, index in list2"
              :key="code"
              :code_configure="code"
              :code_num="index"
            >
            </pickOneCode>
          
            <!-- <div
              :id="index"
              class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
              v-for="element, index in list2"
              :key="element.name"
            >
              {{ element.name }}
            </div> -->
          </draggable>

        </div>
      </div>
      <h2 class="bg-primary mt-5">仕切り</h2>
      <div class="test2"></div>
      <div class="text-start container">
        <div class="row">
          <div class="col-10">list1</div>
          <div class="col-10" v-for="data in list1" :key="data">{{ data }}</div>
          <div class="col-10">list2</div>
          <div class="col-10" v-for="data in list2" :key="data">{{ data }}</div>
        </div>
      </div>
        <h2 class="bg-primary mt-5">仕切り</h2>

      <div id="test2"  style="display: flex; overflow-x: scroll; white-space: nowrap;">
        <p>コード test2</p>
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import oneCode from '../components/oneCode.vue'
import pickOneCode from '../components/oneCode.vue'
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
export default defineComponent({
  name: 'TestDraga',
  props: {
    msg: String
  },
  components: {
    draggable: VueDraggableNext,
    oneCode: oneCode,
    pickOneCode: pickOneCode,
  },
  data(){
    return {
      count: 6,
      counter: 5,
      dragging: false,
      enabled: true,
      list1: [],
      list2: [
        { name: 'Joao', id: 2, string: 1, flet: 1, code: [[1,1], [1,1], [1,1], [1,1], [1,1], [1,1] ], code_name: 'major', },
      ],
    }
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
        // cell.addEventListener("click", {cell_id: cell_id, handleEvent: this.makeCodeHtmlGuitar(cell_id)}, false);
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

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    let aElement = document.getElementById("test1");
    aElement.appendChild(tbl);

    let test  = document.createElement("div");
    let testText = document.createTextNode("bbb");
    test.appendChild(testText);
    aElement.appendChild(test);

  },
  methods: {
    showItems() {
      alert(this.items.map(val => { return val.id }))
    },
    // makeCode(list_test) {
    //   const all_strings   = strings;
    //   const got_codes = list_test;
    //   // got_codes = [[13, 17, 18], [25, 29, 30], [37, 41, 42]];

    //   let all_code_component = [];

    //   for (let num1 = 0; num1 < got_codes.length; num1++) {
    //     let root = got_codes[num1][0];

    //      //all_strings のデータからコードになりうるデータを探す. 例:major)root, 3rd, 5thをピックアップ 
    //     for (let num2 = 0; num2 < 6; num2++) {
    //       for (let num3 = 0; num3 < all_strings[0].length; num3++) {
    //         let searching_flet = all_strings[num2][num3];
    //         if (root == searching_flet) {
    //           let code_comp = [];
    //           code_comp.push([num2, num3]);
    //           //弦
    //           for (let num4_second = num2 - 1; 0 <= num4_second ; num4_second--) {
    //           //フレット
    //             for (let num5_third = num3; num5_third < num3 + 4; num5_third++) {
    //               for (let num6_got_code = 0; num6_got_code < got_codes.length; num6_got_code++) {
    //                 if (got_codes[num1][num6_got_code] == all_strings[num4_second][num5_third]) {
    //                   code_comp.push([num4_second, num5_third]);
    //                 }
    //               }
    //             }
    //           }
    //           all_code_component.push(code_comp);
    //         }
    //       }
    //     }
    //   }
    //   return all_code_component;
    // },

  createElement(tag, attr = null, ext = null) {
    var element = document.createElement(tag);
    if (attr !== null) {
      Object.keys(attr).forEach(function(e){
        element.setAttribute(e, attr[e]);
      });
    }
    if (ext !== null) ext(element);
    return element;
  },

  makeCodeHtmlGuitar(cell_id) {
      //前のコードの削除
      console.log(cell_id);
      let previus_dlement = document.getElementById("test2");
      if (previus_dlement !== null) {
        while (previus_dlement.firstChild) {
          previus_dlement.removeChild(previus_dlement.firstChild);
        }
      }

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

      //dragAndDropの初期化・追加
      this.list1 = [];
      for (let i = 0; i < got_codes_list.length; i++) {
        this.list1.push({ name: 'Code' + i, id: 100, code: got_codes_list[i], })
      }

      
      for (let got_code = 0; got_code < got_codes_list.length; got_code++) {
        //flet の最大値最小値の取得
        let flet_max = 0;
        let flet_min = 20;
        let string_list = [0, 0, 0, 0, 0, 0];
        for (let got_code_flet = 0; got_code_flet < got_codes_list[got_code].length; got_code_flet++) {
          if (got_codes_list[got_code][got_code_flet][1] < flet_min) {
            flet_min = got_codes_list[got_code][got_code_flet][1];
          }
          if (got_codes_list[got_code][got_code_flet][1] > flet_max) {
            flet_max = got_codes_list[got_code][got_code_flet][1];
          }

          //各stringに抑えるpositionが存在するか確認→string_listに入れる
          for(let got_code_string = 0; got_code_string < got_codes_list[got_code].length; got_code_string++){
            let string_num_exist = got_codes_list[got_code][got_code_flet][0];
            string_list[string_num_exist] = 1;
          }
        }

          let tbl = document.createElement("table");
          let tblBody = document.createElement("tbody");
          tbl.classList.add("one_code")

          for (let i = 0; i < 6; i++) {
            // creates a table row
            let row = document.createElement("tr");
            for (let j = flet_min; j <= flet_max; j++) {
              let cell = document.createElement("td");
              cell.id = "st" + i + j;
              cell.href = "";

              let div  = document.createElement("div");
              div.classList.add("guitar_table_point");

              let cellText = document.createTextNode("a");
              for(let got_code_content = 0; got_code_content < got_codes_list[got_code].length; got_code_content++){
                if (string_list[i] == 0) {
                  div.classList.add("guitar-cell-off");
                } else if (got_codes_list[got_code][got_code_content][0] == i && got_codes_list[got_code][got_code_content][1] == j){
                  div.classList.add("text-red");
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
          tbl.classList.add('mr-1', 'bg-flet');

          // TODO ここにclassを入れる。追加

          let aElement = document.getElementById("test2");
          aElement.appendChild(tbl);
      }
        // return []
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
              console.log('追加されるコード',search_number, '構成コードの検索→',test, '追加', this.showSound(search_number));
              judge_code_component = true;
            }
          }
          // コードの候補になるポジションを追加
          if (judge_code_component) {
            // TODO all_code_positionsが間違っている。
            all_code_positions[a_search_string].push(all_string_flet_list[a_search_string][a_search_flet]);
          }
        }
      }
      //TODO 洗い出したポジションを組み合わせてコードを作る
      let result = this.combinePosition(root_sound, all_code_positions);

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

    combinePosition (root_sound, all_code_positions){
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

  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
