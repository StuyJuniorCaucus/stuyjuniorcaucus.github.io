function hamburgerMenu() {
	var container = document.getElementById("navbarLinks");
	if (container.style.display === "flex") {
		container.style.display = "none";
	} else {
		container.style.display = "flex";
	}
}
