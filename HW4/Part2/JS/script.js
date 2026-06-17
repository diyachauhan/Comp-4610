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

// Wait until page loads
$(document).ready(function () {

    let tabCounter = 1;

    $("#tabs").tabs();

    // Custom validation rule
    $.validator.addMethod(
        "lessThanEqual",
        function (value, element, param) {

            return Number(value) <= Number($(param).val());

        }
    );

    // Initialize sliders
    initializeSlider("#minColSlider", "#minCol");
    initializeSlider("#maxColSlider", "#maxCol");
    initializeSlider("#minRowSlider", "#minRow");
    initializeSlider("#maxRowSlider", "#maxRow");

    // Textbox -> Slider binding
    $("input").on("input", function () {

        let value = Number($(this).val());

        let sliderID = "#" + $(this).attr("id") + "Slider";

        $(sliderID).slider("value", value);

        updateTableLive();
    });

    // Validation
    $("#tableForm").validate({

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

        submitHandler: function () {

            createNewTab();
        }
    });

    // Delete all tabs
    $("#deleteAllTabs").click(function () {

        $("#tabs ul li").not(":first").remove();

        $("#tabs div").not("#welcomeTab").remove();

        $("#tabs").tabs("refresh");
    });

    // Create slider
    function initializeSlider(sliderID, inputID) {

        $(sliderID).slider({

            min: -50,
            max: 50,
            value: 0,

            slide: function (event, ui) {

                $(inputID).val(ui.value);

                updateTableLive();
            }
        });

        $(inputID).val(0);
    }

    // Live table updates
    function updateTableLive() {

        if ($("#tableForm").valid()) {

            generateTable();
        }
    }

    // Generate temporary preview
    function generateTable() {

        let html = buildTableHTML();

        $("#welcomeTab").html(html);
    }

    // Create new tab
    function createNewTab() {

        let tabID = "tab-" + tabCounter;

        let title =
            $("#minCol").val() + "," +
            $("#maxCol").val() + "," +
            $("#minRow").val() + "," +
            $("#maxRow").val();

        $("#tabs ul").append(

            "<li>" +
            "<a href='#" + tabID + "'>" +
            title +
            "</a>" +
            "<span class='closeTab'>×</span>" +
            "</li>"
        );

        $("#tabs").append(

            "<div id='" + tabID + "'>" +
            buildTableHTML() +
            "</div>"
        );

        $("#tabs").tabs("refresh");

        tabCounter++;
    }

    // Delete individual tab
    $(document).on("click", ".closeTab", function () {

        let panelID = $(this)
            .closest("li")
            .remove()
            .attr("aria-controls");

        $("#" + panelID).remove();

        $("#tabs").tabs("refresh");
    });

    // Build multiplication table
    function buildTableHTML() {

        let minCol = Number($("#minCol").val());
        let maxCol = Number($("#maxCol").val());

        let minRow = Number($("#minRow").val());
        let maxRow = Number($("#maxRow").val());

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

        return table;
    }

});
