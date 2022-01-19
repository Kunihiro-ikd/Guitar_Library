// //各フレットの数値の組み合わせ キーはがデフォルト
    // TODO 何フレットまで作るべき？
    // E, F#, F, G, G#, A, A#, B, C, C#, D, D#
    const string1 = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];
    const string2 = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
    const string3 = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
    const string4 = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
    const string5 = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    const string6 = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    const strings = [
                    [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
                    [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
                    [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
                    [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
                    [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                    [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    ];

    //コード 全種類作成したい
    // TODO https://guitarbeginner.info/cord/kind.html#:~:text=%E3%82%AE%E3%82%BF%E3%83%BC%E3%81%AE%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE,%E3%81%97%E3%81%8B%E3%81%82%E3%82%8A%E3%81%BE%E3%81%9B%E3%82%93%E3%80%82
    const major_code             = [0, 4, 5];
    const mainor_code            = [0, 3, 5];
    const major_seventh_code     = [0, 4, 5, 7];
    const mainor_seventh_code    = [0, 3, 5, 7];


    //E, F, G
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
        var code_array =[];
        var code = [];
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
                //last code
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

        /**
        // E, F#, F, G, G#, A, A#, B, C, C#, D, D#
        const string1 = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];
        const string2 = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
        const string3 = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
        const string4 = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
        const string5 = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        const string6 = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
         * */
        console.log(got_codes, 'got_codes');
        console.log(first_string, first_string.length );
        const flet_num = first_string.length;
         var all_code_component = [];

         for(var num1 = 0; num1<got_codes.length; num1++){
             var root = got_codes[num1][0];
             console.log(root, 'root');
             console.log(got_codes.length, 'got_codes.length');

             //all_strings のデータからコードになりうるデータを探す
             // 弦
             for(var num2 = 0; num2<6; num2++){
                //  if(num2 <= 2){
                //      break;
                //  }
                 // フレット
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

                                    console.log(num1, 'num1');
                                    console.log(num6_got_code, 'num6_got_code');
                                    console.log(num4_second, 'num4_second');
                                    console.log(num5_third, 'num5_third');
                                    if(got_codes[num1][num6_got_code] == all_strings[num4_second][num5_third]){
                                        code_comp.push([num4_second, num5_third]);
                                        // console.log([num4_second, num5_third], code_comp, 'ifのなか');
                                    }
                                }
                            }
                            // let add_flet = ;
                        }
                        all_code_component.push(code_comp);
                    }
                    // console.log(all_code_component, );
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
        this.allGuitarCodeList(root_sound);

        //クリックしたセルから、作成すべきコードの添字配列を作成する
        // this.makeAllCodeConfiguration();
        console.log('makeCode>>>>>asdfasdf>>>>>>>>');
        console.log(makeCode(root_code));


        var got_codes_list = [[[0,10],[2,3],[3,4],[1,3]], [[1,5],[2,3],[3,4]]];
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
            console.log("string_list>>>" + string_list);

            //他の関数から値を受け取る
            // var codes = this.makeAllCodeConfiguration();

            var tbl = document.createElement("table");
            var tblBody = document.createElement("tbody");
            // creating all cells


            console.log('flet_max', flet_max, 'flet_min', flet_min);
            for (var i = 0; i < 6; i++) {
                // creates a table row
                var row = document.createElement("tr");
                for (var j = flet_min; j <= flet_max; j++) {
                    // Create a <td> element and a text node, make the text
                    // node the contents of the <td>, and put the <td> at
                    // the end of the table row
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
                    //guitar_table_point
                    // add the row to the end of the table body
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
            
            
            // put the <tbody> in the <table>
                tbl.appendChild(tblBody);
                var aElement = document.getElementById("test2");
                // aElement.remove();
                aElement.appendChild(tbl);


                //区切り
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
    //入力　例root_code_position = [2,4]
    //出力　例[  [[1,2], [2,3], [3,4]],  [[2,3],[3,4],[4,5],[5,6] ]]
    //クリックしたセルから
    function allGuitarCodeList(root_sound){
        var root = root_sound;
        //絶対音を作成
        var absolute_root = this.absoluteSoundNum(root);

        var all_string_flet_list = strings;

        for(var a_string of all_string_flet_list){
            for(var a_flet of a_string){
                if(a_flet == absolute_root){

                }


            }
        }



        return [ [[2,4], [3,5], [4,5]], [[1,2], [2,3], [3,4]] ]
    }

    //絶対的な音の高さを出力 Eを基準に
    // [0,0] 6弦1フレット　→　12
    // [1,2] 5弦3フレット　→　19
    // [2,3] 6弦3フレット　→　24
    // 入力　[0,0]
    // 出力  12
    function absoluteSoundNum(root_position)
    {
        var root        = 12;
        var string_root = root_position[0];
        var flet_root   = root_position[1];

        var result = -1;

        switch (string_root){
            case 0:
                result = result + 0 + flet_root;
                break;
            case 1:
                result = result + 5 + flet_root;
                break;
            case 2:
                result = result + 10 + flet_root;
                break;
            case 3:
                result = result + 15 + flet_root;
                break;
            case 4:
                result = result + 19 + flet_root;
                break;
            case 5:
                result = result + 24 + flet_root;
                break;
        }

        return result;
    }

    function callConsole()
    {
        console.log('clicked');
    }

    //filter
    function filterCode(code_list, config)
    {
        var codes = this.makeAllCodeConfiguration();
        return []
    }