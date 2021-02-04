window.onload = function(){

    Array.from(document.querySelectorAll(".searchable_table")).forEach(table => {
		const input = document.getElementById(table.dataset.search_id)
		input.addEventListener("keyup", () => {
			filter(table, input);
		});
	});

    var news_table = document.getElementById("news_table");
    var schol_table = document.getElementById("schol_table");

    if(news_table) readData(news_table, "https://spreadsheets.google.com/feeds/cells/1CV3tuKXYgO40DXAJJvSr91M7jpNcInhp_-M9hpzS1JA/1/public/values");
    if(schol_table) readData(schol_table, "https://spreadsheets.google.com/feeds/cells/1BIAyY3s9_GLcCsQBUfdGJPHfN-EsOaPi_Y5ds29fEgI/1/public/values");

}

function validURL(str) {
  var pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/; // fragment locator
  return !!pattern.test(str);
}


function filter(table, input) {
	const filter = input.value.toUpperCase();
	const rows = table.getElementsByTagName("tr");
	const filterBy = JSON.parse(table.dataset.filtered_columns);

	Array.from(rows).forEach(row => {
		const includesFilter = filterBy.some(column => {
			const cell = row.getElementsByTagName("td")[column];
			if (!cell) return true;
			let text = cell.textContent || cell.innerText;
			text = text.toUpperCase();
			return text.includes(filter);
		})
		if (includesFilter) {
			row.style.display = "";
		} else {
			row.style.display = "none";
		}
	})
}


//gets json data from spreadsheet link
var spData = new Object();
function doData(json) {
    var data = json.feed.entry;
    var id = json.feed.id.$t;
    spData[id] = data;
}


//creates table cell
function drawCell(tr, val) {
    var td = document.createElement("td");
    try{
        new URL(val);
    }catch(e){
        tr.append(td);
        td.append(val);

        return td;
    }

    var link = tr.querySelector(".name").querySelector("a");
    link.href = val;

    return null;

}

//create table row
function drawRow(table, rowData) {
    if (rowData == null) return null;
    if (rowData.length == 0) return null;

    var tr = document.createElement("tr");
    table.append(tr);

    for(var c = 0; c < rowData.length; c++) {
        var cell = drawCell(tr, rowData[c]);
        if(c == 0){
            var txt = cell.innerHTML;
            cell.innerHTML = "";
            cell.classList.add("name")

            var a = document.createElement("a");
            a.innerHTML = txt;
            cell.append(a);
        }
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