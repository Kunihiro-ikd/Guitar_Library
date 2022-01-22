// //各フレットの数値の組み合わせ キーはがデフォルト
    // TODO 何フレットまで作るべき？
    // E, F#, F, G, G#, A, A#, B, C, C#, D, D#

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

    // TODO 全てのコードの組み合わせ
    // major → root, 3rd, 5th/ seventh → root, 3rd, 5th, 7th
    // 意味和から無いコード作ってしまった。
    function makeAllCodeConfiguration(root, code_kind)
    {
        console.log('makeAllCodeConfiguration>>>>>>>>>>>>>>>>');
        const major_code = [0, 4, 5];
        const from_to = [12, 47];
        let code_array =[];
        let code = [];
        // var list_code =[];
                for(var num=from_to[0] + (root % 12); num<=from_to[1]; num = num + 12){
                        //初期化
                        let list =[];
                        //first code
                        if(num ==from_to[0] + (root % 12) ){
                            //配列に root , 3rd, 5th の追加
                            for(var num2=0; num2<major_code.length; num2++){
                                list.push(num + major_code[num2]);
                            }
                            code_array.push(list);
                            console.log('if');
                        //last code
                        }else if(num + 12 >=from_to[1]){
                            console.log('else if');
                            for(var num2=0; num2<major_code.length; num2++){
                                list.push(num + major_code[num2]);
                            }
                            code_array.push(list);
                        }else{
                            console.log('else');
                            for(var num2=0; num2<major_code.length; num2++){
                                list.push(num - major_code[num2]);
                            }
                            code_array.push(list);
                            //初期化
                            list = [];
                            for(var num2=0; num2<major_code.length; num2++){
                                list.push(num + major_code[num2]);
                            }
                            code_array.push(list);
                        }
                    if(num + 12 >from_to[1]){
                        console.log(from_to[1], num, 'break');
                        break;
                    }
                }
        console.log('出力コード',code_array);
        console.log('finish_function>>>>>>>>>>>>>>>>>>>>>');
        return code_array;
    }

    //root が root のコードだけ作成
    //構成 major → root, 3rd, 5th/ 7th →
    function makeCodeRootConfiguration(root, code_kind)
    {
        console.log('makeCodeRootConfiguration>>>>>>>>>>>>>>>>');
        const major_code = [0, 4, 5];
        const from_to = [12, 47];
        var code_array =[];
        var code = [];
        // var list_code =[];
        for(var num=from_to[0] + (root % 12); num<=from_to[1]; num = num + 12){
                //初期化
                let list =[];
                for(var num2=0; num2<major_code.length; num2++){
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

    function callConsole(){
        console.log('clicked');
    }

    //構成音から抑えるべきフレッドと弦のリストを作成
    function makeCode(list_test)
    {
        console.log('makeCode>>>>>>>>>>>>>>>>>呼び出し');
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
         var all_code_component = [];

         for(var num1 = 0; num1<got_codes.length; num1++){
             var root = got_codes[num1][0];

             //all_strings のデータからコードになりうるデータを探す
             // 弦
             for(var num2 = 0; num2<6; num2++){
                 for(var num3 = 0; num3<all_strings[0].length; num3++){
                    let searching_flet = all_strings[num2][num3];
                    console.log('searching_flet', searching_flet, num3);
                    // console.log('root', root);
                    if(root == searching_flet){
                        // console.log('searching_flet', searching_flet);
                        var code_comp = [];
                        code_comp.push([num2, num3]);
                        console.log(code_comp, 'code_comp最初に追加');
                        //弦
                        for(var num4_second = num2 - 1; 0 <= num4_second ; num4_second--){
                            //フレット
                            for(var num5_third = num3; num5_third < num3 + 4; num5_third++){
                                for(var num6_got_code = 0; num6_got_code < got_codes.length; num6_got_code++){
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
        for(var test1 = 0; test1 < all_code_component.length; test1++){
            for(var test2 = 0; test2 < all_code_component[test1].length; test2++){
                for(var test3 = 0; test3 < all_code_component[test1][test2].length; test3++){
                }
            }
        }
        return all_code_component;
    }

    //guitar 最初にギターのコードを作成
    function makeCodehtml()
    {
        console.log('makeCodehtml>>>>');
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");
        // creating all cells
        for (var i = 0; i < 6; i++) {
            // creates a table row
            var row = document.createElement("tr");

            for (var j = 0; j < 15; j++) {
            var cell = document.createElement("td");
            var div  = document.createElement("div");
            //callConsole
            div.classList.add("guitar_table_point")
            var cellText = document.createTextNode("a");

            //各cell の td に入れる id を作成
            cell.id = "sf" + i+j;
            var cell_id = "sf" + i+j;

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
        var row_flet_num = document.createElement("tr");
        for(var k = 0; k < 15; k++){
            var cell_flet_num = document.createElement("td");
            var flet_num_text = document.createTextNode(k);
            cell_flet_num.appendChild(flet_num_text);
            row_flet_num.appendChild(cell_flet_num);
        }
        tblBody.appendChild(row_flet_num);

        // put the <tbody> in the <table>
        tbl.appendChild(tblBody);
        var aElement = document.getElementById("test1");
        aElement.appendChild(tbl);
        // return []
    }

    // 配列を受け取ってコードを作成する
    // max_flet, min_flet を取得し適した長さのコードをブラウザに表示する
    // Cコードの場合1 - 3 フレットの長さのコードを表示
    function makeCodeHtmlGuitar()
    {
        console.log('クリックされたmakeCodeHtmlGuitar>>>>>>', this.cell_id);

        //クリックされたセルのid の設定
        var set_string = -1;
        var set_flet   = -1;
        if(this.cell_id.length == 5){
            // フレットが2桁
            set_string = this.cell_id.substring(2, 3);
            set_flet   = this.cell_id.substring(3, 5);
        }else{
            //フレットが1桁
            set_string = this.cell_id.substring(2, 3);
            set_flet   = this.cell_id.substring(3, 4);
        }
        
        // TODO ここにセルをクリックしたときに配列を作成するコードを使う
        var root = 'root';
        var root_sound = [set_string, set_flet];

        //クリックしたセルから、作成すべきコードの添字配列を作成する
        // this.makeAllCodeConfiguration();
        // console.log(makeCode(root_code));

        // var got_codes_list = [[[0,10],[2,3],[3,4],[1,3]], [[1,5],[2,3],[3,4]]];
        var got_codes_list = allGuitarCodeList([set_string, set_flet], 'major');
        console.log('got_codes_list>>>>', got_codes_list);
        for(var got_code = 0; got_code < got_codes_list.length; got_code++){

            //flet の最大値最小値の取得
            var flet_max = 0;
            var flet_min = 20;
            var string_list = [0, 0, 0, 0, 0, 0];
            for(var got_code_flet = 0; got_code_flet < got_codes_list[got_code].length; got_code_flet++){
                if(got_codes_list[got_code][got_code_flet][1] < flet_min){
                    flet_min = got_codes_list[got_code][got_code_flet][1];
                }
                if(got_codes_list[got_code][got_code_flet][1] > flet_max){
                    flet_max = got_codes_list[got_code][got_code_flet][1];
                }
                
                //string
                for(var got_code_string = 0; got_code_string < got_codes_list[got_code].length; got_code_string++){
                    var string_num_exist = got_codes_list[got_code][got_code_flet][0];
                    string_list[string_num_exist] = 1;
                }
            }
            // console.log("string_list>>>" + string_list);

            //他の関数から値を受け取る
            // var codes = this.makeAllCodeConfiguration();

            var tbl = document.createElement("table");
            var tblBody = document.createElement("tbody");

            // console.log('flet_max', flet_max, 'flet_min', flet_min);
            for (var i = 0; i < 6; i++) {
                // creates a table row
                var row = document.createElement("tr");
                for (var j = flet_min; j <= flet_max; j++) {
                    var cell = document.createElement("td");
                    var div  = document.createElement("div");
                    //callConsole
                    div.classList.add("guitar_table_point")
                    div.addEventListener("click", callConsole, false);
                    cell.id = "st" + i+j;
                    cell.href = "";
                    var cellText = document.createTextNode("a");
                    for(var got_code_content = 0; got_code_content < got_codes_list[got_code].length; got_code_content++){
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
            var num_row = document.createElement("tr");
            for(var flet_num = flet_min; flet_num <= flet_max; flet_num ++){
                var num_cell = document.createElement("td");
                num_cell.id = "fn" + flet_num;
                // num_cellcell.href = "";
                var flet_num_text = document.createTextNode(flet_num);
                num_cell.appendChild(flet_num_text);
                num_row.appendChild(num_cell);
            }
            tblBody.appendChild(num_row);
            tbl.appendChild(tblBody);
            var aElement = document.getElementById("test2");
            //TODO 新しいコードの生成時には前のコードはすべて削除する
            // aElement.remove();
            aElement.appendChild(tbl);

            //区切り　実装段階では消す
            var part = document.createElement("p");
            var part_text = document.createTextNode("区切り");
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

        console.log('allGuitarCodeList', root_sound, kind_of_code);
        //変数の初期化
        const code_root_position   = [Number(root_sound[0]), Number(root_sound[1])];
        const all_string_flet_list = strings;//存在するフレットと弦のリスト
        const absolute_root        = absoluteSoundNum(root_sound);//root 絶対音を作成
        const absolute_root_origin = absolute_root % 12;

        //TODO 今後major以外の配列も作成できるようにする
        const code                 = [0, 4, 5];
        // var code          = kind_of_code;こんな感じで渡す

        const search_string_limit_max = code_root_position[1] - 1;
        const search_string_limit_min = 0;
        const search_flet_limit_max   = ((code_root_position[1] + 4) > 20) ? 20 : code_root_position[1] + 4;
        const search_flet_limit_min   = ((code_root_position[1] - 4) < 0)  ?  0 : code_root_position[1] - 4;

        //コードの構成に使えそうなポジションの洗い出し
        let all_code_positions = [[], [], [], [], [], []];
        console.log('コードの構成に使えそうなポジションの洗い出し');
        for(let a_search_string = search_string_limit_max;search_string_limit_min < a_search_string; a_search_string--){//弦[ [弦, フレット], [弦, フレット], ... ] TODO ここどうする？？
            for(let a_search_flet = search_flet_limit_min;  a_search_flet <  search_flet_limit_max; a_search_flet++){//フレット[弦, フレット]
                let judge_code_component = false
                for(let code_component = 0; code_component < code.length; code_component++){
                    //TODO string1の値が追加されていない・・？
                    console.log((absoluteSoundNum(all_string_flet_list[a_search_string][a_search_flet]) %12 )  == ((absolute_root_origin + code[code_component]) % 12));
                    if((absoluteSoundNum(all_string_flet_list[a_search_string][a_search_flet]) %12 )  == ((absolute_root_origin + code[code_component]) % 12)){
                        judge_code_component = true;
                    } 
                }
                if(judge_code_component){
                    //codeのなかのどれかの数と同じであればコードを配列に作成
                    // console.log('all_string_flet_list[a_search_string][a_search_flet]', all_string_flet_list[a_search_string][a_search_flet]);
                    // console.log(all_code_positions);
                    all_code_positions[a_search_string].push(all_string_flet_list[a_search_string][a_search_flet]);
                }
            }
        }

        let result_allGuitarCodeList = [];

        //配列の格納
        console.log('all_code_positions', all_code_positions);
        const string1_position=  all_code_positions[0];
        const string2_position=  all_code_positions[1];
        const string3_position=  all_code_positions[2];
        const string4_position=  all_code_positions[3];
        const string5_position=  all_code_positions[4];
        const string6_position=  all_code_positions[5];

        
        console.log('コードになりえるポジションのすべての組み合わせ');
        console.log(string1_position, string2_position, string6_position);
        
        //コードになりえるポジションのすべての組み合わせ
        for(let string1_variable = 0; string1_variable < string1_position.length; string1_variable++){
            for(let string2_variable = 0; string2_variable < string2_position.length; string2_variable++){
                for(let string3_variable = 0; string3_variable < string3_position.length; string3_variable++){
                    for(let string4_variable = 0; string4_variable < string4_position.length; string4_variable++){
                        for(let string5_variable = 0; string5_variable < string5_position.length; string5_variable++){
                            let fifth_string_position_combination = [
                                all_code_positions[0][string1_position],
                                all_code_positions[1][string2_position],
                                all_code_positions[2][string3_position],
                                all_code_positions[3][string4_position],
                                all_code_positions[4][string5_position]
                            ];
                            console.log('fifth_string_position_combination', fifth_string_position_combination);
                            for(let string6_variable = 0; string6_variable < string6_position.length; string6_variable++){
                                let sixth_string_position = all_code_positions[0][string6_position];
                                // TODO ここにフィルター
                                // root, 3rd, 5thi などのすべての構成要素がそろっているか確認する
                                result_allGuitarCodeList += (fifth_string_position_combination + sixth_string_position);
                            }
                        }
                    }
                }
            }
        }
        console.log('result_allGuitarCodeList', result_allGuitarCodeList);

        return result_allGuitarCodeList;
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
                absoluteSoundNum_result = absoluteSoundNum_result + 24 + flet_root;
                break;
            case 2:
                absoluteSoundNum_result = absoluteSoundNum_result + 19 + flet_root;
                break;
            case 3:
                absoluteSoundNum_result = absoluteSoundNum_result + 14 + flet_root;
                break;
            case 4:
                absoluteSoundNum_result = absoluteSoundNum_result + 9 + flet_root;
                break;
            case 5:
                absoluteSoundNum_result = absoluteSoundNum_result + 5 + flet_root;
                break;
            case 6:
                absoluteSoundNum_result = absoluteSoundNum_result + 0 + flet_root;
                break;
        }
        return absoluteSoundNum_result;
    }
