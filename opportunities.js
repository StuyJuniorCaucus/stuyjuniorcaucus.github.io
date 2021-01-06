window.onload = function(){
    var elective = document.getElementById("elective_search");
    var opp = document.getElementById("opp_search");

    if(elective) elective.addEventListener("keyup", function(){
        filter("elective_search", "elective_table");
    });
    if(opp) opp.addEventListener("keyup", function(){
        filter("opp_search", "opp_table");
    });

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
