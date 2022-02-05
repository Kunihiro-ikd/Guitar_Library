// //各フレットの数値の組み合わせ キーはがデフォルト
    // TODO 何フレットまで作るべき？
    // E, F#, F, G, G#, A, A#, B, C, C#, D, D#
    const codes_list = ['E', 'F#', 'F', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'];

    const string1 = [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9],[1,10],[1,11],[1,12],[1,13],[1,14],[1,15],[1,16],[1,17],[1,18],[1,19],[1,20]];
    const string2 = [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9],[2,10],[2,11],[2,12],[2,13],[2,14],[2,15],[2,16],[2,17],[2,18],[2,19],[2,20]];
    const string3 = [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[3,10],[3,11],[3,12],[3,13],[3,14],[3,15],[3,16],[3,17],[3,18],[3,19],[3,20]];
    const string4 = [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],[4,10],[4,11],[4,12],[4,13],[4,14],[4,15],[4,16],[4,17],[4,18],[4,19],[4,20]];
    const string5 = [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10],[5,11],[5,12],[5,13],[5,14],[5,15],[5,16],[5,17],[5,18],[5,19],[5,20]];
    const string6 = [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[6,15],[6,16],[6,17],[6,18],[6,19],[6,20]];
    const strings = [
        string1,
        string2,
        string3,
        string4,
        string5,
        string6
    ];

    //コード 全種類作成したい
    // TODO https://guitarbeginner.info/cord/kind.html#:~:text=%E3%82%AE%E3%82%BF%E3%83%BC%E3%81%AE%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE,%E3%81%97%E3%81%8B%E3%81%82%E3%82%8A%E3%81%BE%E3%81%9B%E3%82%93%E3%80%82
    const major_code             = [0, 4, 5];
    const mainor_code            = [0, 3, 5];
    const major_seventh_code     = [0, 4, 5, 7];
    const mainor_seventh_code    = [0, 3, 5, 7];


    //E, F, G...,D
    //E基準
    const key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    const parameter ={
        root: 0,
        code_kind: 1,
        config: 'all',
        //音の最高低音と
        from_to: [12, 47]
    };


    function run(parameter)
    {
        //配列
        const made_codes = makeCodeConfiguration(parameter);
    }


    // 音の構成
    // TODO root top、3rd top, 5th top
    function makeCodeConfiguration(parameter)
    {
        // root と code_kind を受け取って音の配列をを返す関数
        const code_list = makeAllCodeConfiguration(parameter['root'], parameter['code_kind']);

        // ↑で作成した配列を root top, 必要な配列だけを返す
        const list2 = filterCode(code_list, parameter['config']);

        return []
    }

    //root が root のコードだけ作成
    //構成 major → root, 3rd, 5th/ 7th →
    function makeCodeRootConfiguration(root, code_kind)
    {
        const major_code = [0, 4, 5];
        const from_to = [12, 47];
        let code_array =[];
        let code = [];
        // let list_code =[];
        for(let num=from_to[0] + (root % 12); num<=from_to[1]; num = num + 12){
                //初期化
                let list =[];
                for(let num2=0; num2<major_code.length; num2++){
                    list.push(num + major_code[num2]);
                }
                code_array.push(list);
            if(num + 12 >from_to[1]){
                console.log(from_to[1], num, 'break');
                break;
            }
        }
        return code_array;
    }

    //構成音から抑えるべきフレッドと弦のリストを作成
    function makeCode(list_test)
    {
        const  first_string  = string1;
        const  second_string = string2;
        const  third_string  = string3;
        const  fourth_string = string4;
        const  fifth_string  = string5;
        const  sixth_string  = string6;
        const  all_strings   = strings;

        // const  got_codes = [[13, 17, 18], [25, 29, 30], [37, 41, 42]];
        const got_codes = list_test;

        const flet_num = first_string.length;
         let all_code_component = [];

         for(let num1 = 0; num1<got_codes.length; num1++){
             let root = got_codes[num1][0];

             //all_strings のデータからコードになりうるデータを探す
             // 弦
             for(let num2 = 0; num2<6; num2++){
                 for(let num3 = 0; num3<all_strings[0].length; num3++){
                    let searching_flet = all_strings[num2][num3];
                    console.log('searching_flet', searching_flet, num3);
                    // console.log('root', root);
                    if(root == searching_flet){
                        // console.log('searching_flet', searching_flet);
                        let code_comp = [];
                        code_comp.push([num2, num3]);
                        //弦
                        for(let num4_second = num2 - 1; 0 <= num4_second ; num4_second--){
                            //フレット
                            for(let num5_third = num3; num5_third < num3 + 4; num5_third++){
                                for(let num6_got_code = 0; num6_got_code < got_codes.length; num6_got_code++){
                                    if(got_codes[num1][num6_got_code] == all_strings[num4_second][num5_third]){
                                        code_comp.push([num4_second, num5_third]);
                                        // console.log([num4_second, num5_third], code_comp, 'ifのなか');
                                    }
                                }
                            }
                        }
                        all_code_component.push(code_comp);
                    }
                 }
             }
         }
        // console.log(all_code_component, 'all_code_component');
        for(let test1 = 0; test1 < all_code_component.length; test1++){
            for(let test2 = 0; test2 < all_code_component[test1].length; test2++){
                for(let test3 = 0; test3 < all_code_component[test1][test2].length; test3++){
                }
            }
        }
        return all_code_component;
    }

    function callConsole(){
        console.log('clicked');
    }

    //guitar 最初にギターのコードを作成
    function makeCodehtml()
    {
        let tbl = document.createElement("table");
        let tblBody = document.createElement("tbody");
        // creating all cells
        for (let i = 0; i < 6; i++) {
            // creates a table row
            let row = document.createElement("tr");

            for (let j = 0; j < 15; j++) {
            let cell = document.createElement("td");
            let div  = document.createElement("div");
            div.classList.add("guitar_table_point")
            let cellText = document.createTextNode("a");

            //各cell の td に入れる id を作成
            cell.id = "sf" + i+j;
            let cell_id = "sf" + i+j;

            cell.href = "";
            div.appendChild(cellText);
            cell.appendChild(div);

            // セルをクリックした時、関数が動く
            cell.addEventListener("click", {cell_id: cell_id, handleEvent: makeCodeHtmlGuitar}, false);
            row.appendChild(cell);
            }
            tblBody.appendChild(row);
            tblBody.classList.add("guitar-cell")
        }
        //flet の序数
        let row_flet_num = document.createElement("tr");
        for(let k = 0; k < 15; k++){
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
        // return []
    }

    // 配列を受け取ってコードを作成する
    // max_flet, min_flet を取得し適した長さのコードをブラウザに表示する
    // Cコードの場合1 - 3 フレットの長さのコードを表示
    function makeCodeHtmlGuitar()
    {
        //クリックされたセルのid の設定
        let set_string = -1;
        let set_flet   = -1;
        if(this.cell_id.length == 5){
            // フレットが2桁
            set_string = this.cell_id.substring(2, 3);
            set_flet   = this.cell_id.substring(3, 5);
        }else{
            //フレットが1桁
            set_string = this.cell_id.substring(2, 3);
            set_flet   = this.cell_id.substring(3, 4);
        }
        
        //  ここにセルをクリックしたときに配列を作成するコードを使う
        let root = 'root';
        let root_sound = [Number(set_string), Number(set_flet)];

        // クリックしたセルから、作成すべきコードの添字配列を作成する
        let got_codes_list = allGuitarCodeList(root_sound, 'major');
        
        for(let got_code = 0; got_code < got_codes_list.length; got_code++){

            //flet の最大値最小値の取得
            let flet_max = 0;
            let flet_min = 20;
            let string_list = [0, 0, 0, 0, 0, 0];
            for(let got_code_flet = 0; got_code_flet < got_codes_list[got_code].length; got_code_flet++){
                if(got_codes_list[got_code][got_code_flet][1] < flet_min){
                    flet_min = got_codes_list[got_code][got_code_flet][1];
                }
                if(got_codes_list[got_code][got_code_flet][1] > flet_max){
                    flet_max = got_codes_list[got_code][got_code_flet][1];
                }
                
                //string
                for(let got_code_string = 0; got_code_string < got_codes_list[got_code].length; got_code_string++){
                    let string_num_exist = got_codes_list[got_code][got_code_flet][0];
                    string_list[string_num_exist] = 1;
                }
            }

            let tbl = document.createElement("table");
            let tblBody = document.createElement("tbody");

            // console.log('flet_max', flet_max, 'flet_min', flet_min);
            for (let i = 0; i < 6; i++) {
                // creates a table row
                let row = document.createElement("tr");
                for (let j = flet_min; j <= flet_max; j++) {
                    let cell = document.createElement("td");
                    let div  = document.createElement("div");
                    //callConsole
                    div.classList.add("guitar_table_point")
                    div.addEventListener("click", callConsole, false);
                    cell.id = "st" + i+j;
                    cell.href = "";
                    let cellText = document.createTextNode("a");
                    for(let got_code_content = 0; got_code_content < got_codes_list[got_code].length; got_code_content++){
                        if(string_list[i] == 0){
                            div.classList.add("guitar-cell-off");

                        }else if(got_codes_list[got_code][got_code_content][0] == i && got_codes_list[got_code][got_code_content][1] == j){
                            div.classList.add("text-red");
                        }
                    }
                    div.appendChild(cellText);
                    cell.appendChild(div);
                    row.appendChild(cell);
                    row.classList.add("guitar-cell")
                }
                    tblBody.appendChild(row);
            }

            //flet の番号
            let num_row = document.createElement("tr");
            for(let flet_num = flet_min; flet_num <= flet_max; flet_num ++){
                let num_cell = document.createElement("td");
                num_cell.id = "fn" + flet_num;
                // num_cellcell.href = "";
                let flet_num_text = document.createTextNode(flet_num);
                num_cell.appendChild(flet_num_text);
                num_row.appendChild(num_cell);
            }
            tblBody.appendChild(num_row);
            tbl.appendChild(tblBody);
            let aElement = document.getElementById("test2");
            //TODO 新しいコードの生成時には前のコードはすべて削除する
            // while (aElement.firstChild) {
            //     aElement.removeChild(aElement.firstChild);
            // }
            // aElement.remove();
            aElement.appendChild(tbl);

            //区切り　実装段階では消す
            let part = document.createElement("p");
            let part_text = document.createTextNode("区切り");
            part.appendChild(part_text);
            part.classList.add("text-red");
            aElement.appendChild(part);
        }
        // return []
    }



    //ギターのフレットをクリックした時、クリックしたセルの弦とフレットの序数を取得
    //入力から、コードを押さえるための strings　の添え字を出力 
    //入力　例root_code_position = [2,4], kind_of_code　= [0, 4, 5] major
    //出力　例[  [[1,2], [2,3], [3,4]],  [[2,3],[3,4],[4,5],[5,6] ]]
    function allGuitarCodeList(root_sound, kind_of_code)
    {
        //変数の初期化
        const code_root_position   = [Number(root_sound[0]), Number(root_sound[1])];
        const all_string_flet_list = strings;//存在するフレットと弦のリスト
        const absolute_root        = absoluteSoundNum(root_sound);//root 絶対音を作成
        const absolute_root_origin = Number(absolute_root % 12);

        console.log('allGuitarCodeList渡された変数', root_sound, kind_of_code, showSound(absolute_root_origin));

        //TODO 今後major以外の配列も作成できるようにする
        // let code          = kind_of_code;こんな感じで渡す
        const code                 = [0, 4, 5];
        console.log('code_root_position', code_root_position, absolute_root_origin);

        const search_string_limit_max = code_root_position[0]  -1;
        const search_string_limit_min = -1;
        const search_flet_limit_max   = ((code_root_position[1] + 4) > 20) ? 20 : code_root_position[1] + 4;
        const search_flet_limit_min   = ((code_root_position[1] - 4) < 0)  ?  0 : code_root_position[1] - 4;


        //コードの構成に使えそうなポジションの洗い出し
        let all_code_positions = [[], [], [], [], [], []];
        for(let a_search_string = search_string_limit_max;search_string_limit_min < a_search_string; a_search_string--){//弦[ [弦, フレット], [弦, フレット], ... ] TODO ここどうする？？
            for(let a_search_flet = search_flet_limit_min;  a_search_flet <  search_flet_limit_max; a_search_flet++){//フレット[弦, フレット]
                //音階が和音になるか確認
                // TODO　追加されるポジションが間違っている
                let judge_code_component = false
                let search_number = absoluteSoundNum(all_string_flet_list[a_search_string][a_search_flet]) % 12;

                // コードになりえるポジション追加
                for(let code_component = 0; code_component < code.length; code_component++){
                    let test = (absolute_root_origin + code[code_component]) % 12;
                    // console.log('検索', showSound(test));
                    if(search_number  == test){
                        console.log('追加されるコード',search_number, '構成コードの検索→',test, '追加', showSound(search_number));
                        judge_code_component = true;
                    }
                }
                // コードの候補になるポジションを追加
                if(judge_code_component){
                    all_code_positions[a_search_string].push(all_string_flet_list[a_search_string][a_search_flet]);
                }
            }
        }
        console.log('コード候補のポジション', all_code_positions);
        // console.log(all_code_positions);
        //TODO 洗い出したポジションを組み合わせてコードを作る
        let result = combinePosition(root_sound, all_code_positions);

        return result;
    }

    //TODO 洗い出したポジションを組み合わせてコードを作る
    function combinePosition (root_sound, all_code_positions){
        console.log('root_sound all_code_positions', root_sound, all_code_positions);
        let clicked_string = root_sound[0];
        let combine_position = [];
        let result =[];
        string1_position = all_code_positions[0];
        string2_position = all_code_positions[1];
        string3_position = all_code_positions[2];
        string4_position = all_code_positions[3];
        string5_position = all_code_positions[4];
        // console.log(string1_position.length, string2_position.length, string3_position.length, string4_position.length, string5_position.length);
        console.log(clicked_string);
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
                
                console.log('2>>>>>');
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
                console.log('3>>>>>');
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
                
                console.log('4>>>>>');
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
                                    console.log('あああ', all_code_positions[0]);
                                }
                            }
                        }
                    }
                }
                
                console.log('5>>>>>');
                break;
        }
        console.log(combine_position);

        result = combine_position;

        return result;
        // return all_code_positions;
    }

    //絶対的な音の高さを出力 Eを基準に
    // [0,0] 1弦1フレット　→　36
    // [1,2] 2弦3フレット　→　33
    // [6,0] 2弦3フレット　→　12
    // 入力　[0,0]
    // 出力  12
    function absoluteSoundNum(root_position)
    {
        const root        = 12;
        const string_root = root_position[0];
        const flet_root   = root_position[1];

        let absoluteSoundNum_result = 0;
        
        switch (string_root){
            case 1:
                absoluteSoundNum_result = 24 + flet_root;
                break;
            case 2:
                absoluteSoundNum_result = 19 + flet_root;
                break;
            case 3:
                absoluteSoundNum_result = 15 + flet_root;
                break;
            case 4:
                absoluteSoundNum_result = 10 + flet_root;
                break;
            case 5:
                absoluteSoundNum_result = 5 + flet_root;
                break;
            case 6:
                absoluteSoundNum_result = 0 + flet_root;
                break;
        }
        return absoluteSoundNum_result;
    }

    function showSound(showSound)
    {
        sound_list = ['E','F','F#','G','G#','A','A#','B','C','C#','D','D#'];
        return showSound,sound_list[showSound];
    }
