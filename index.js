window.onload = function(){

    Array.from(document.querySelectorAll(".searchable_table")).forEach(table => {
		const input = document.getElementById(table.dataset.search_id)
		input.addEventListener("keyup", () => {
			filter(table, input);
		});
        readData(table)
	});

    document.getElementById("defaultOpen").click();
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

function openTable(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
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
            cell.classList.add("name");

            var a = document.createElement("a");
            a.innerHTML = txt;
            cell.append(a);
        }
    }
    return tr;
}

//creates table
function readData(parent) {
    var id = parent.getAttribute("data-source");
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
