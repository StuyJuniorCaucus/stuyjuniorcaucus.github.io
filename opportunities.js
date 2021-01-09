window.onload = function(){
    var elective = document.getElementById("elective_search");
    var opp = document.getElementById("opp_search");
    var opp_table = document.getElementById("opp_table");

    if(elective) elective.addEventListener("keyup", function(){
        filter("elective_search", "elective_table");
    });
    if(opp) opp.addEventListener("keyup", function(){
            filter("opp_search", "opp_table");
    });
    if(opp_table) readData(opp_table);

}


function filter(source, target) {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(source);
    filter = input.value.toUpperCase();
    table = document.getElementById(target);
    tr = table.getElementsByTagName("tr");


    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) tr[i].style.display = "";
            else tr[i].style.display = "none";
        }
    }
}

var spData = null;
function doData(json) {
    spData = json.feed.entry;
}

function drawCell(tr, val) {
    var td = document.createElement("td")
    tr.append(td);
    td.append(val);
    return td;
}

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


function readData(parent) {
    var data = spData;
    var rowData = [];
    for(var r = 1; r < data.length; r++) {
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
