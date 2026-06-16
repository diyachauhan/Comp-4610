/*
---------------------------------------------------------
Name: Diya Chauhan
Course: COMP 4610 GUI I
Assignment: HW4 Part 1

Description:
Uses the jQuery Validation Plugin to validate user
input before generating a multiplication table.
---------------------------------------------------------
*/

// Wait until the webpage is fully loaded
$(document).ready(function () {

    // Create a custom validation rule to ensure minimum values
    // are less than or equal to their corresponding maximum values
    $.validator.addMethod(
        "lessThanEqual",
        function (value, element, param) {
            return Number(value) <= Number($(param).val());
        }
    );

    // Apply validation rules to the form
    $("#tableForm").validate({

        // Define validation rules for each input field
        rules: {

            minCol: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                lessThanEqual: "#maxCol"
            },

            maxCol: {
                required: true,
                number: true,
                min: -50,
                max: 50
            },

            minRow: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                lessThanEqual: "#maxRow"
            },

            maxRow: {
                required: true,
                number: true,
                min: -50,
                max: 50
            }
        },

        // Display custom error messages when validation fails
        messages: {

            minCol: {
                required: "Please enter a minimum column value.",
                number: "Please enter a valid number.",
                min: "Value must be at least -50.",
                max: "Value must be at most 50.",
                lessThanEqual:
                    "Minimum Column Value must be less than or equal to Maximum Column Value."
            },

            maxCol: {
                required: "Please enter a maximum column value.",
                number: "Please enter a valid number.",
                min: "Value must be at least -50.",
                max: "Value must be at most 50."
            },

            minRow: {
                required: "Please enter a minimum row value.",
                number: "Please enter a valid number.",
                min: "Value must be at least -50.",
                max: "Value must be at most 50.",
                lessThanEqual:
                    "Minimum Row Value must be less than or equal to Maximum Row Value."
            },

            maxRow: {
                required: "Please enter a maximum row value.",
                number: "Please enter a valid number.",
                min: "Value must be at least -50.",
                max: "Value must be at most 50."
            }
        },

        // Generate the multiplication table after successful validation
        submitHandler: function () {
            generateTable();
        }
    });

});


// Generate the multiplication table dynamically
function generateTable() {

    // Retrieve user input values and convert them to numbers
    let minCol = Number($("#minCol").val());
    let maxCol = Number($("#maxCol").val());
    let minRow = Number($("#minRow").val());
    let maxRow = Number($("#maxRow").val());

    // Start building the HTML table
    let table = "<table>";

    // Create the first row of column headers
    table += "<tr><th></th>";

    // Generate column header cells
    for (let col = minCol; col <= maxCol; col++) {
        table += "<th>" + col + "</th>";
    }

    // Close the header row
    table += "</tr>";

    // Generate each row of the multiplication table
    for (let row = minRow; row <= maxRow; row++) {

        table += "<tr>";

        // Create the row header cell
        table += "<td>" + row + "</td>";

        // Generate multiplication values for the current row
        for (let col = minCol; col <= maxCol; col++) {
            table += "<td>" + (row * col) + "</td>";
        }

        // Close the current row
        table += "</tr>";
    }

    // Close the table element
    table += "</table>";

    // Display the generated table in the page
    $("#tableContainer").html(table);
}