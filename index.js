window.onload = function(){
    var elective_search = document.getElementById("elective_search");
    var opp_search = document.getElementById("opp_search");
    var schol_search = document.getElementById("schol_search")
    var opp_table = document.getElementById("opp_table");

    if(elective_search) elective_search.addEventListener("keyup", function(){
        filter("elective_search", "elective_table");
    });
    if(opp_search) opp_search.addEventListener("keyup", function(){
            filter("opp_search", "opp_table");
    });
    if(schol_search) schol_search.addEventListener("keyup", function(){
            filter("schol_search", "schol_table");
    });
    if(opp_table) readData(opp_table);

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
var spData = null;
function doData(json) {
    spData = json.feed.entry;
}


//creates table cell
function drawCell(tr, val) {
    var td = document.createElement("td")
    tr.append(td);
    td.append(val);
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
function readData(parent) {
    var data = spData;
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
