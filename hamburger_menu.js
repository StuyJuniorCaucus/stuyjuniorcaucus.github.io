function hamburgerMenu() {
	var container = document.getElementById("navbarLinks");
	if (container.style.display === "block") {
		container.style.display = "none";
	} else {
		container.style.display = "block";
	}
}
