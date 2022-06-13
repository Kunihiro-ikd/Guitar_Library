<template>
  <MainHeader></MainHeader>

  <div class="row">
    <div id="test1" class="col-12"></div>
    <div class="col-12 container">
      <h3>SavedCode </h3>
      <div>
        <button @click="logout" class="btn border">ログアウト</button>
      </div>

      <draggable
        class="dragArea row  flex-nowrap overflow-auto"
        :list="list1"
        :group="{ name: 'people', pull: 'clone', put: false }"
        @change="endDrag"
      >
        <div
          class="list-group-item col-3 col-md-2 codearea"
          v-for="element in list1"
          :key="element.name"
        >
          <div>
            {{ element.name }}
          </div>
          <div :id="element.code_id"></div>
        </div>
      </draggable>
    </div>

    <div class="col-12">
      <draggable
        class="dragArea row flex-nowrap overflow-auto codearea"
        :list="list2"
        group="people"
        @change="log"
      >
        <div
          class="list-group-item col-2 col-md-3"
          v-for="element in list2"
          :key="element.name"
        >
        <div>
          {{ element.name }}
        </div>

          <getCodeComponent
            :getList="element"
            :test="element.name"
          >
          </getCodeComponent>
        </div>

      </draggable>
    </div>
    <div>配列 list2</div>
    <div>{{ list2 }}</div>

  </div>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
import getCode from '../../components/getCode.vue'
import axios from 'axios';
import router from '../../router/index.js';
import MainHeader from  '../../components/header/MainHeader.vue'


const string1 = [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[0,10],[0,11],[0,12],[0,13],[0,14],[0,15],[0,16],[0,17],[0,18],[0,19],[0,20]];
const string2 = [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9],[1,10],[1,11],[1,12],[1,13],[1,14],[1,15],[1,16],[1,17],[1,18],[1,19],[1,20]];
const string3 = [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9],[2,10],[2,11],[2,12],[2,13],[2,14],[2,15],[2,16],[2,17],[2,18],[2,19],[2,20]];
const string4 = [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[3,10],[3,11],[3,12],[3,13],[3,14],[3,15],[3,16],[3,17],[3,18],[3,19],[3,20]];
const string5 = [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],[4,10],[4,11],[4,12],[4,13],[4,14],[4,15],[4,16],[4,17],[4,18],[4,19],[4,20]];
const string6 = [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10],[5,11],[5,12],[5,13],[5,14],[5,15],[5,16],[5,17],[5,18],[5,19],[5,20]];
const strings = [ string1, string2, string3, string4, string5, string6 ];

export default {
  name: "demoCloneDrag",
  order: 2,
  components: {
    draggable: VueDraggableNext,
    getCodeComponent: getCode,
    MainHeader: MainHeader,
  },
  data() {
    return {
      list1: [],
      list2: [
        // { "name": "Code1", "id": 100, "code": [ [ 0, 8 ], [ 1, 8 ], [ 2, 12 ], [ 3, 10 ], [], [] ], "code_id": "180e45c8e1dCode1" },
      ],
      code_num: 0,
      couter_made_code: 0,
    };
  },
  updated() {
    this.$nextTick(() => {
      for(let i = 0; i < this.list1.length; i++) {
        this.makeCode(this.list1[i].code, this.list1[i].code_id);
      }
    })
  },
  mounted() {
    let data = {login: localStorage.getItem('login')}
    axios.post('/get_list', data)
      .then((response) => {
        console.log('get_list!!');
        console.log(response['data'][0]);
        console.log(Object.keys(response['data']).length);
        const getDate = new Date();
        let random_id = getDate.getTime().toString(16);

        for (let i = 0; i < Object.keys(response['data']).length; i++) {
          console.log(response['data'][i])
          this.list2.push({ "name": "Code" + i, "id": 100, "code": response['data'][i]['code_list'], "code_id": random_id + i },)
        }
        console.log('list2')
        console.log(this.list2)
      })

    let tbl     = document.createElement("table");
    let tblBody = document.createElement("tbody");

    tbl.style.display = "inline-block"
    tbl.classList.add("one_code")

    for (let i = 0; i < 6; i++) {
      let row = document.createElement("tr");

      for (let j = 0; j < 15; j++) {
        let cell = document.createElement("td");
        let div  = document.createElement("div");
        div.classList.add("guitar_table_point");
        let cellText = document.createTextNode("a");

        cell.id     = "sf" + i + j;
        let cell_id = "sf" + i + j;
        cell.href   = "";
        div.appendChild(cellText);
        cell.appendChild(div);

        //クリック時コードを生成
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
    logout() {
      const data = {};
      axios.post('/logout', data)
      .then((response) => {
        console.log(response);
        localStorage.removeItem("accessToken");
        router.push('/login')
      })
      .catch(error => {
        console.log(error);
      })
    },
    saveCode() {
      let data_list = [];
      for (let i = 0; i < this.list2.length; i++) {
        data_list.push(this.list2[i]['code'])
      }
      const data = {code: data_list, login: localStorage.getItem('login')};
      axios.post('/save_code', data)
      .then((response) => {
        alert('保存しました');
        console.log(response);
      })
      .catch(error => {
        console.log('save_code!!Error');
        console.log(error);
      })
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

      const getDate = new Date();
      let random_id = getDate.getTime().toString(16);

      this.list1 = [];

      for (let i = 0; i < got_codes_list.length; i++) {
        this.list1.push({ name: 'Code' + i, id: 100, code: got_codes_list[i], code_id: random_id + 'Code' + i, code_id_clone: random_id + 'code_clone' + i});
      }

    },

    //クリックしたセルの弦とフレットの序数を取得
    //入力 例root_code_position = [2,4], kind_of_code = [0, 4, 5] major
    //出力 例[  [[1,2], [2,3], [3,4]],  [[2,3],[3,4],[4,5],[5,6] ]]
    allGuitarCodeList(root_sound, kind_of_code) {
      const code_root_position   = [Number(root_sound[0]), Number(root_sound[1])];
      const all_string_flet_list = strings;
      const absolute_root        = this.absoluteSoundNum(root_sound);
      const absolute_root_origin = Number(absolute_root % 12);

      console.log('allGuitarCodeList渡された変数', root_sound, kind_of_code, this.showSound(absolute_root_origin));

      //TODO major以外の配列も作成できるようにする. kind_of_code = [0, 3, 7] minor
      // let code          = kind_of_code;
      const code                    = [0, 4, 7];
      const search_string_limit_max = code_root_position[0] - 1;
      const search_string_limit_min = -1;
      const search_flet_limit_max   = ((code_root_position[1] + 4) > 20) ? 20 : code_root_position[1] + 4;
      const search_flet_limit_min   = ((code_root_position[1] - 4) < 0)  ?  0 : code_root_position[1] - 4;

      let all_code_positions = [[], [], [], [], [], []];

      for (let a_search_string = search_string_limit_max; search_string_limit_min < a_search_string; a_search_string--){//弦[ [弦, フレット], [弦, フレット], ... ]

        for (let a_search_flet = search_flet_limit_min;  a_search_flet <  search_flet_limit_max; a_search_flet++) {//フレット[弦, フレット]
          // TODO 追加されるポジションをすべて正しく、押さえらるレベルで
          let judge_code_component = false;
          let search_number = this.absoluteSoundNum(all_string_flet_list[a_search_string][a_search_flet]) % 12;

          for (let code_component = 0; code_component < code.length; code_component++) {
            let test = (absolute_root_origin + code[code_component]) % 12;
            if (search_number  == test) {
              judge_code_component = true;
            }
          }
          if (judge_code_component) {
            all_code_positions[a_search_string].push(all_string_flet_list[a_search_string][a_search_flet]);
          }

        }
      }
      
      // ポジションの組み合わせ
      let result = this.combinePosition(root_sound, all_code_positions);
      this.code_num = result.length;

      return result;
    },

    absoluteSoundNum(root_position) {
      // const root        = 12;
      const string_root = root_position[0];
      const flet_root   = root_position[1];

      let absoluteSoundNum_result = 0;
      
      switch (string_root){
          case 0:
              absoluteSoundNum_result = 24 + flet_root;
              break;
          case 1:
              absoluteSoundNum_result = 19 + flet_root;
              break;
          case 2:
              absoluteSoundNum_result = 15 + flet_root;
              break;
          case 3:
              absoluteSoundNum_result = 10 + flet_root;
              break;
          case 4:
              absoluteSoundNum_result = 5 + flet_root;
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
      let clicked_string = root_sound[0];
      let combine_position = [];
      let result =[];
      let string1_position = all_code_positions[0];
      let string2_position = all_code_positions[1];
      let string3_position = all_code_positions[2];
      let string4_position = all_code_positions[3];
      let string5_position = all_code_positions[4];

        switch (clicked_string) {
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

    makeCode(code_configure, code_id) {
      console.log('makecCode!!!!');

      let code_view = document.getElementById(code_id);
      if (code_view.firstChild !== null) {
        code_view.removeChild(code_view.firstChild);
      }

      let code_component = code_configure;
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

        for (let got_code_string = 0; got_code_string < code_component.length; got_code_string++) {
          let string_num_exist = code_component[got_code_flet][0];
          string_list[string_num_exist] = 1;
        }
      }

      let tbl     = document.createElement("table");
      let tblBody = document.createElement("tbody");
      tbl.style.display = "inline-block"
      tbl.classList.add("one_code")

      for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");

        for (let j = flet_min; j <= flet_max; j++) {
          let cell  = document.createElement("td");
          let div   = document.createElement("div");
          cell.id   = "st" + i + j;
          cell.href = "";
          div.classList.add("guitar_table_point");

          let cellText = document.createTextNode("-");

          for (let got_code_content = 0; got_code_content < code_component.length; got_code_content++) {
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
        let num_cell      = document.createElement("td");
        num_cell.id       = "fn" + flet_num;
        let flet_num_text = document.createTextNode(flet_num);
        num_cell.appendChild(flet_num_text);
        num_row.appendChild(num_cell);
      }

      tblBody.appendChild(num_row);
      tbl.appendChild(tblBody);
      tbl.classList.add('mr-1');
      tbl.classList.add('bg-flet');
      let aElement = document.getElementById(code_id);
      aElement.appendChild(tbl);
    },

    log() {
      console.log('log');

    },
    endDrag() {
      console.log('update');
    },
  }
};
</script>
<style scoped></style>