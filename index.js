window.onload = function(){
    var elective_search = document.getElementById("elective_search");
    var news_search = document.getElementById("news_search");
    var schol_search = document.getElementById("schol_search")
    var news_table = document.getElementById("news_table");
    var schol_table = document.getElementById("schol_table");

    if(elective_search) elective_search.addEventListener("keyup", function(){
        filter("elective_search", "elective_table");
    });
    if(news_search) news_search.addEventListener("keyup", function(){
            filter("news_search", "news_table");
    });
    if(schol_search) schol_search.addEventListener("keyup", function(){
            filter("schol_search", "schol_table");
    });
    if(news_table) readData(news_table, "https://spreadsheets.google.com/feeds/cells/1CV3tuKXYgO40DXAJJvSr91M7jpNcInhp_-M9hpzS1JA/1/public/values");
    if(schol_table) readData(schol_table, "https://spreadsheets.google.com/feeds/cells/1BIAyY3s9_GLcCsQBUfdGJPHfN-EsOaPi_Y5ds29fEgI/1/public/values");

}

function validURL(str) {
  var pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/; // fragment locator
  return !!pattern.test(str);
}


function filter(source, target) {
    var input, filter, table, tr, td, i, txtValue;

    //gets input and makes uppercase
    input = document.getElementById(source);
    filter = input.value.toUpperCase();

    //gets table to filter
    table = document.getElementById(target);
    tr = table.getElementsByTagName("tr");

    //loop for filtering
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0]; //only searches first column for now, might change later
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) tr[i].style.display = ""; //if found, display normally
            else tr[i].style.display = "none"; // else hide it
        }
    }
}


//gets json data from spreadsheet link
var spData = new Object();
function doData(json) {
    var data = json.feed.entry;
    var id = json.feed.id.$t;
    console.log(data);
    console.log(id);
    spData[id] = data;
}


//creates table cell
function drawCell(tr, val) {
    var td = document.createElement("td");
    tr.append(td);
    try{
        new URL(val);
        var link = document.createElement("a");
        link.href = val;
        link.append("Link");
        td.append(link);
    }catch(e){
        td.append(val);
    }
    return td;
}

//create table row
function drawRow(table, rowData) {
    if (rowData == null) return null;
    if (rowData.length == 0) return null;

    var tr = document.createElement("tr");
    table.append(tr);

    for(var c = 0; c < rowData.length; c++) {
        drawCell(tr, rowData[c]);
    }
    return tr;
}

//creates table
function readData(parent, id) {
    var data = spData[id];
    var rowData = [];
    for(var r = 0; r < data.length; r++) {
        var cell = data[r]["gs$cell"];
        var val = cell["$t"];
        if (cell.col == 1) {
            drawRow(parent, rowData);
            rowData = [];
        }
        if(cell.row != 1) rowData.push(val);
    }
    drawRow(parent, rowData);
}
