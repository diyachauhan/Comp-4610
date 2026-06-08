
/*
Name: Diya Chauhan
Course: COMP 4610 GUI I
Assignment: HW3 JavaScript Multiplication Table
*/

function generateTable() {

    let minCol = Number(document.getElementById("minCol").value);
    let maxCol = Number(document.getElementById("maxCol").value);
    let minRow = Number(document.getElementById("minRow").value);
    let maxRow = Number(document.getElementById("maxRow").value);

    let error = document.getElementById("error");

    error.innerHTML = "";

    if (
        document.getElementById("minCol").value === "" ||
        document.getElementById("maxCol").value === "" ||
        document.getElementById("minRow").value === "" ||
        document.getElementById("maxRow").value === ""
    ) {
        error.innerHTML = "Please enter all values.";
        return;
    }

    if (
        minCol < -50 || minCol > 50 ||
        maxCol < -50 || maxCol > 50 ||
        minRow < -50 || minRow > 50 ||
        maxRow < -50 || maxRow > 50
    ) {
        error.innerHTML = "Values must be between -50 and 50.";
        return;
    }

    if (minCol > maxCol) {
        error.innerHTML =
            "Minimum Column Value cannot be greater than Maximum Column Value.";
        return;
    }

    if (minRow > maxRow) {
        error.innerHTML =
            "Minimum Row Value cannot be greater than Maximum Row Value.";
        return;
    }

    let table = "<table>";

    table += "<tr><th></th>";

    for (let col = minCol; col <= maxCol; col++) {
        table += "<th>" + col + "</th>";
    }

    table += "</tr>";

    for (let row = minRow; row <= maxRow; row++) {

        table += "<tr>";

        table += "<td>" + row + "</td>";

        for (let col = minCol; col <= maxCol; col++) {
            table += "<td>" + (row * col) + "</td>";
        }

        table += "</tr>";
    }

    table += "</table>";

    document.getElementById("tableContainer").innerHTML = table;
}
