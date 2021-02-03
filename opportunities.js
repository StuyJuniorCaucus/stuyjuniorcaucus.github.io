window.onload = () => {
	Array.from(document.querySelectorAll(".searchable_table")).forEach(table => {
		const input = document.getElementById(table.dataset.search_id)
		input.addEventListener("keyup", () => {
			filter(table, input);
		});
	});
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
