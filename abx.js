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
    scores = (new Array(file_list.length)).fill(0);
    eval = document.getElementsByName("eval");
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
        if (i < (sample[0].length / 2)) {
            triplets = [
                [sample[0][i], sample[5][i], sample[10][i]],
                [sample[1][i], sample[6][i], sample[11][i]],
                [sample[2][i], sample[7][i], sample[12][i]],
                [sample[3][i], sample[8][i], sample[13][i]],
                [sample[4][i], sample[9][i], sample[14][i]],
            ]
        }
        else {
            triplets = [
                [sample[0][i], sample[10][i], sample[5][i]],
                [sample[1][i], sample[11][i], sample[6][i]],
                [sample[2][i], sample[12][i], sample[7][i]],
                [sample[3][i], sample[13][i], sample[8][i]],
                [sample[4][i], sample[14][i], sample[9][i]],
            ]
        }


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
    document.getElementById("page").textContent = "" + (n + 1) + "/" + scores.length;

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
}

function init() {
    n = 0;
    setAudio();
    evalCheck();
    setButton();
}

function evalCheck() {
    const c = scores[n];
    if ((c <= 0) || (c > eval.length)) {
        for (var i = 0; i < eval.length; i++) {
            eval[i].checked = false;
        }
    }
    else {
        eval[c - 1].checked = true;
    }
}

function setButton() {
    if (n == (scores.length - 1)) {
        document.getElementById("prev").disabled = false;
        document.getElementById("next2").disabled = true;
        document.getElementById("finish").disabled = true;
        for (var i = 0; i < eval.length; i++) {
            if (eval[i].checked) {
                document.getElementById("finish").disabled = false;
                break;
            }
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
        for (var i = 0; i < eval.length; i++) {
            if (eval[i].checked) {
                document.getElementById("next2").disabled = false;
                break;
            }
        }
    }
}

function evaluation() {
    for (var i = 0; i < eval.length; i++) {
        if (eval[i].checked) {
            scores[n] = i + 1;
        }
    }
    setButton();
}
function selectpoint() {
    for (var i = 0; i < eval.length; i++) {
        if (select[i].checked) {
            point[n] = i + 1;
        }
    }
    setButton();
}

function exportCSV() {
    var ans = [];
    var ans_AB = [];
    for (var i = 0; i < file_list.length; i++) {
        if (scores[i] == 1) {
            ans[i] = "A+"
            conf[i] = "+"
        }
        else if (scores[i] == 2) {
            ans[i] = "A-"
            conf[i] = "-"
        }
        else if (scores[i] == 3) {
            ans[i] = "B+"
            conf[i] = "+"
        }
        else if (scores[i] == 4) {
            ans[i] = "B-"
            conf[i] = "-"
        }
    }

    var csvData = "";
    csvData += "" + "X" + "," + "A" + "," + "B" + "," + "score" + "," + "conf" + "," + "ans" + "point" + "\r\n";
    for (var i = 0; i < file_list.length; i++) {
        csvData += "" + file_list[i][0] + "," + file_list[i][1] + ","
            + file_list[i][2] + ","
            + scores[i] + ","
            + conf[i] + ","
            + ans[i] + ","
            + point[i] + "\r\n";
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
var scores;

// since loadText() doesn't work in local
var n = 0;
var eval = document.getElementsByName("eval");