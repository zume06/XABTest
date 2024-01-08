//Arrayのプロトタイプにshuffle()メソッドを追加
//シャッフルされた配列を返す
Array.prototype.shuffle = function () {
    var i = this.length;
    while (i) {
        var j = Math.floor(Math.random() * i);
        var t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

// invalid enter key
//フォーム送信を防止
function invalid_enter() {
    if (window.event.keyCode == 13) {
        return false;
    }
}

// start experiment
function start_experiment() {
    // get user name
    var name = document.getElementById("name").value.replace(" ", "_");
    if (name == "") {
        alert("Please enter your name.");
        return false;
    }

    // get enquête
    var enq_num = "0"
    var enq = document.getElementsByName("inst");
    for (var i = 0; i < enq.length; i++) {
        if (enq[i].checked) {
            enq_num = enq[i].value;
        }
    }
    if (enq_num == "0") {
        alert("Please press yes or no.");
        return false;
    }

    // get setlist number
    var set_num = "0"
    var number = document.getElementsByName("set");
    for (var i = 0; i < number.length; i++) {
        if (number[i].checked) {
            set_num = number[i].value;
        }
    }

    if (set_num == "0") {
        alert("Please press the setlist number button.");
        return false;
    }

    // convert display
    Display();

    /*
        you have to customize this part
    */
    var sample_list_path = [];
    //data pathのリストのpathを格納
    // sanple X
    sample_list_path.push(wav_dir + "set" + set_num + "/drums_X.list");
    sample_list_path.push(wav_dir + "set" + set_num + "/bass_X.list");
    sample_list_path.push(wav_dir + "set" + set_num + "/piano_X.list");
    sample_list_path.push(wav_dir + "set" + set_num + "/guitar_X.list");
    sample_list_path.push(wav_dir + "set" + set_num + "/residuals_X.list");
    // the following ones are samples you want to compare
    // sample A
    sample_list_path.push(wav_dir + "set" + set_num + "/drums_A.list");
    sample_list_path.push(wav_dir + "set" + set_num + "/bass_A.list");
    sample_list_path.push(wav_dir + "set" + set_num + "/piano_A.list");
    sample_list_path.push(wav_dir + "set" + set_num + "/guitar_A.list");
    sample_list_path.push(wav_dir + "set" + set_num + "/residuals_A.list");
    // sample B
    sample_list_path.push(wav_dir + "set" + set_num + "/drums_B.list");
    sample_list_path.push(wav_dir + "set" + set_num + "/bass_B.list");
    sample_list_path.push(wav_dir + "set" + set_num + "/piano_B.list");
    sample_list_path.push(wav_dir + "set" + set_num + "/guitar_B.list");
    sample_list_path.push(wav_dir + "set" + set_num + "/residuals_B.list");
    /*
        end
    */

    file_list = makeFileList(sample_list_path);
    outfile = "inst_simi_2023au_" + name + "_set" + set_num + ".csv";
    scores1 = (new Array(file_list.length)).fill(0);
    scores2 = (new Array(file_list.length)).fill(0);
    scores3 = (new Array(file_list.length)).fill(0);
    //document.getElementsByName("eval1")はname="eval1"のラジオボタンの選択を取ってくる
    eval1 = document.getElementsByName("eval1");
    eval2 = document.getElementsByName("eval2");
    eval3 = document.getElementsByName("eval3");
    eval4 = document.getElementsByName("eval4");
    init();

}

// convert display
function Display() {
    document.getElementById("Display1").style.display = "none";
    document.getElementById("Display2").style.display = "block";
}

// load text file
//ファイル名受け取り->中身を読み込んで改行文字で分割=>popで末尾消して配列に格納して返す
function loadText(filename) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filename, false);
    xhr.send(null);
    var list = xhr.responseText.split(/\r\n|\r|\n/);
    list.pop();

    return list;
}

// make file list
// sanpleに全wavファイル名を格納->tripletsにそれらをトリプレットにして入れ直す
// drumsX=>bassX=>pianoX=>guitarX=>residualsX=>drumsA=>bassA=>....=>residualsB
function makeFileList(sample_list_path) {
    // prepare file list of all samples
    var sample = Array();
    for (var i = 0; i < sample_list_path.length; i++) {
        // sample[0] is the reference sample
        // sample[1]~ are the samples you compare
        sample.push(loadText(sample_list_path[i]));
    }

    var files = Array();
    for (var i = 0; i < sample[0].length; i++) {
        triplets = [
            [sample[0][i], sample[5][i], sample[10][i]],
            [sample[1][i], sample[6][i], sample[11][i]],
            [sample[2][i], sample[7][i], sample[12][i]],
            [sample[3][i], sample[8][i], sample[13][i]],
            [sample[4][i], sample[9][i], sample[14][i]],
        ]
        /*
            end
        */

        for (var j = 0; j < triplets.length; j++) {
            files.push(triplets[j]);
        }
    }
    files.shuffle();
    return files;
}

function setAudio() {
    document.getElementById("page").textContent = "" + (n + 1) + "/" + scores1.length;

    document.getElementById("audio_x").innerHTML = 'SoundX:<br>'
        + '<audio src="' + file_list[n][0]
        + '" controls preload="auto">'
        + '</audio>';

    document.getElementById("audio_a").innerHTML = 'SoundA:<br>'
        + '<audio src="' + file_list[n][1]
        + '" controls preload="auto">'
        + '</audio>';

    document.getElementById("audio_b").innerHTML = 'SoundB:<br>'
        + '<audio src="' + file_list[n][2]
        + '" controls preload="auto">'
        + '</audio>';
    console.log(file_list[n][0]);
    console.log(file_list[n][1]);
    console.log(file_list[n][2]);
}

function init() {
    n = 0;
    setAudio();
    evalCheck();
    setButton();
}

function evalCheck() {
    const c1 = scores1[n];
    if ((c1 <= 0) || (c1 > eval1.length)) {
        for (var i = 0; i < eval1.length; i++) {
            eval1[i].checked = false;
        }
    }
    else {
        eval1[c1 - 1].checked = true;
    }
    const c2 = scores2[n];
    if ((c2 <= 0) || (c2 > eval2.length)) {
        for (var i = 0; i < eval2.length; i++) {
            eval2[i].checked = false;
        }
    }
    else {
        eval2[c2 - 1].checked = true;
    }
    const c3 = scores3[n];
    if ((c3 <= 0) || (c3 > eval3.length)) {
        for (var i = 0; i < eval3.length; i++) {
            eval3[i].checked = false;
        }
    }
    else {
        eval3[c3 - 1].checked = true;
    }
    const c4 = scores4[n];
    if ((c4 <= 0) || (c4 > eval4.length)) {
        for (var i = 0; i < eval4.length; i++) {
            eval4[i].checked = false;
        }
    }
    else {
        eval4[c3 - 1].checked = true;
    }
    eval1[2].checked = true;
    eval2[2].checked = true;
    eval3[2].checked = true;
    eval4[2].checked = true;
}


//どういう評価がなされたらnextを表示する（document.getElementById("next2").disabled = false; にする）か
// n は問番号
// iは何番目のボタン押したか
// eval[0] eval[1] eval[2] eval[3] eval[4] どれかチェックされててかつ
// eval1~eval3全部[2]はだめ
function setButton() {
    var condition1;
    var condition2;
    var condition3;
    var condition4;
    for (var i = 0; i < eval1.length; i++) {
        if (eval1[i].checked) {
            condition1 = true;
            break
        }
    }
    for (var i = 0; i < eval2.length; i++) {
        if (eval2[i].checked) {
            condition2 = true;
            break
        }
    }
    for (var i = 0; i < eval3.length; i++) {
        if (eval3[i].checked) {
            condition3 = true;
            break
        }
    }
    for (var i = 0; i < eval4.length; i++) {
        if (eval4[i].checked) {
            condition4 = true;
            break
        }
    }
    var condition5;
    condition5 = true;
    if (eval1[2].checked && eval2[2].checked && eval3[2].checked) {
        condition5 = false;
    }
    if (eval4[2].checked) {
        condition5 = false;
    }
    if (n == (scores1.length - 1)) {
        document.getElementById("prev").disabled = false;
        document.getElementById("next2").disabled = true;
        document.getElementById("finish").disabled = true;
        if (condition1 && condition2 && condition3 && condition4 && condition5) {
            document.getElementById("finish").disabled = false;
        }
    }
    else {
        if (n == 0) {
            document.getElementById("prev").disabled = true;
        }
        else {
            document.getElementById("prev").disabled = false;
        }
        document.getElementById("next2").disabled = true;
        document.getElementById("finish").disabled = true;
        if (condition1 && condition2 && condition3 && condition4 && condition5) {
            document.getElementById("next2").disabled = false;
        }
    }
}


function evaluation() {
    for (var i = 0; i < eval1.length; i++) {
        if (eval1[i].checked) {
            scores1[n] = i;
        }
    }
    for (var i = 0; i < eval2.length; i++) {
        if (eval2[i].checked) {
            scores2[n] = i;
        }
    }
    for (var i = 0; i < eval3.length; i++) {
        if (eval3[i].checked) {
            scores3[n] = i;
        }
    }
    for (var i = 0; i < eval4.length; i++) {
        if (eval4[i].checked) {
            scores4[n] = i;
        }
    }
    setButton();
}

function exportCSV() {
    var ans1 = [];
    var conf1 = [];
    for (var i = 0; i < file_list.length; i++) {
        if (scores1[i] == 0) {
            ans1[i] = "A"
            conf1[i] = "+"
        }
        else if (scores1[i] == 1) {
            ans1[i] = "A"
            conf1[i] = "-"
        }
        else if (scores1[i] == 2) {
            ans1[i] = "None"
            conf1[i] = "None"
        }
        else if (scores1[i] == 3) {
            ans1[i] = "B"
            conf1[i] = "-"
        }
        else if (scores1[i] == 4) {
            ans1[i] = "B"
            conf1[i] = "+"
        }
    }
    var ans2 = [];
    var conf2 = [];
    for (var i = 0; i < file_list.length; i++) {
        if (scores2[i] == 0) {
            ans2[i] = "A"
            conf2[i] = "+"
        }
        else if (scores2[i] == 1) {
            ans2[i] = "A"
            conf2[i] = "-"
        }
        else if (scores2[i] == 2) {
            ans2[i] = "None"
            conf2[i] = "None"
        }
        else if (scores2[i] == 3) {
            ans2[i] = "B"
            conf2[i] = "-"
        }
        else if (scores2[i] == 4) {
            ans2[i] = "B"
            conf2[i] = "+"
        }
    }
    var ans3 = [];
    var conf3 = [];
    for (var i = 0; i < file_list.length; i++) {
        if (scores3[i] == 0) {
            ans3[i] = "A"
            conf3[i] = "+"
        }
        else if (scores3[i] == 1) {
            ans3[i] = "A"
            conf3[i] = "-"
        }
        else if (scores3[i] == 2) {
            ans3[i] = "None"
            conf3[i] = "None"
        }
        else if (scores3[i] == 3) {
            ans3[i] = "B"
            conf3[i] = "-"
        }
        else if (scores3[i] == 4) {
            ans3[i] = "B"
            conf3[i] = "+"
        }
    }
    var ans4 = [];
    var conf4 = [];
    for (var i = 0; i < file_list.length; i++) {
        if (scores4[i] == 0) {
            ans4[i] = "A"
            conf4[i] = "+"
        }
        else if (scores4[i] == 1) {
            ans4[i] = "A"
            conf4[i] = "-"
        }
        else if (scores4[i] == 2) {
            ans4[i] = "None"
            conf4[i] = "None"
        }
        else if (scores4[i] == 3) {
            ans4[i] = "B"
            conf4[i] = "-"
        }
        else if (scores4[i] == 4) {
            ans4[i] = "B"
            conf4[i] = "+"
        }
    }

    var enq = document.getElementsByName("inst");
    for (var i = 0; i < enq.length; i++) {
        if (enq[i].checked) {
            enq_num = enq[i].value;
        }
    }
    var csvData = "";
    csvData += "" + "X" + "," + "A" + "," + "B" + "," + "timbre-ans" + "," + "timbre-conf" + "," + "rhythm-ans" + "," + "rhythm-conf" + "," + "melody-ans" + "," + "melody-conf" + "," + "enq" + "," + "whole-ans" + "," + "whole-conf" + "\r\n";
    for (var i = 0; i < file_list.length; i++) {
        csvData += "" + file_list[i][0] + "," + file_list[i][1] + ","
            + file_list[i][2] + ","
            + ans1[i] + ","
            + conf1[i] + ","
            + ans2[i] + ","
            + conf2[i] + ","
            + ans3[i] + ","
            + conf3[i] + ","
            + ans4[i] + ","
            + conf4[i] + ","
            + enq_num + "\r\n";
    }

    const link = document.createElement("a");
    document.body.appendChild(link);
    link.style = "display:none";
    const blob = new Blob([csvData], { type: "octet/stream" });
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    link.download = outfile;
    link.click();
    window.URL.revokeObjectURL(url);
    link.parentNode.removeChild(link);
}

function next() {
    n++;
    setAudio();
    evalCheck();
    setButton();
}

function prev() {
    n--;
    setAudio();
    evalCheck();
    setButton();
}

function finish() {
    exportCSV();
}


// directory name
const wav_dir = "wav/";

// invalid enter key
document.onkeypress = invalid_enter();

// global variables
var outfile;
var file_list;
var scores1;
var scores2;
var scores3;
var scores4;

// since loadText() doesn't work in local
var n = 0;
var eval1 = document.getElementsByName("eval1");
var eval2 = document.getElementsByName("eval2");
var eval3 = document.getElementsByName("eval3");
var eval4 = document.getElementsByName("eval4");