/*
--------------------------------------------------------
Name: Diya Chauhan
Course: COMP 4610 GUI I
Assignment: Homework 5

Description:
One-Line Scrabble Game using jQuery UI
--------------------------------------------------------
*/


/*
                GAME VARIABLES
 */

let tileBag = [];

let rack = [];

let board = new Array(15).fill(null);

let currentWord = "";

let currentWordScore = 0;

let totalScore = 0;


/*
            BONUS SQUARES
 */



const bonusSquares = [

    "normal",
    "normal",
    "doubleWord",
    "normal",
    "normal",
    "normal",
    "doubleLetter",
    "normal",
    "doubleLetter",
    "normal",
    "normal",
    "normal",
    "doubleWord",
    "normal",
    "normal"

];


/*
            PAGE LOAD
*/

$(function () {

    initializeGame();

    $("#submitBtn").click(function () {

        submitWord();

    });

    $("#shuffleBtn").click(function () {

        shuffleRack();

    });

    $("#recallBtn").click(function () {

        recallTiles();

    });

    $("#restartBtn").click(function () {

        restartGame();

    });

});
/*
            INITIALIZE GAME
 */

function initializeGame() {

    createTileBag();

    drawSevenTiles();

    displayRack();

    initializeBoard();

    updateScoreBoard();

}
/*
            CREATE TILE BAG
 */

function createTileBag() {

    tileBag = [];

    for (let letter in ScrabbleTiles) {

        let amount = ScrabbleTiles[letter]["original-distribution"];

        for (let i = 0; i < amount; i++) {

            tileBag.push(letter);

        }

    }

}
/*
            UPDATE SCOREBOARD
 */

function updateScoreBoard() {

    $("#currentWord").text(currentWord || "---");

    $("#wordScore").text(currentWordScore);

    $("#totalScore").text(totalScore);

    $("#tilesRemaining").text(tileBag.length);

}
/*
            INITIALIZE BOARD
 */

function initializeBoard() {

    $(".boardSlot").each(function () {

        $(this).droppable({

            accept: ".tile",

            hoverClass: "boardHover",

            drop: function (event, ui) {

                let slot = $(this);

                let position = slot.data("position");

                if (slot.children().length > 0) {

                    ui.draggable.draggable("option", "revert", true);

                    return;

                }

                board[position] = ui.draggable.data("letter");

                ui.draggable.draggable("option", "revert", false);

                ui.draggable.css({

                    top: 0,
                    left: 0,
                    position: "relative"

                });

                slot.append(ui.draggable);
                ui.draggable.draggable("disable");

                updateCurrentWord();

            }

        });

    });

}
/*
            DRAW 7 RANDOM TILES
*/

function drawSevenTiles() {

    rack = [];

    while (rack.length < 7 && tileBag.length > 0) {

        // Pick a random tile from the bag
        let randomIndex = Math.floor(Math.random() * tileBag.length);

        let letter = tileBag[randomIndex];

        // Add it to the rack
        rack.push(letter);

        // Remove it from the tile bag
        tileBag.splice(randomIndex, 1);

    }

}
/*
            DISPLAY RACK
 */

function displayRack() {

    $("#rackTiles").empty();

    rack.forEach(function(letter, index) {

        let tile = createTile(letter, index);

        $("#rackTiles").append(tile);

    });

    makeTilesDraggable();

}
/*
            CREATE ONE TILE
*/

function createTile(letter, index) {

    let imageName;

    if(letter === "_"){

        imageName = "Scrabble_Tile_Blank.jpg";

    }
    else{

        imageName = "Scrabble_Tile_" + letter + ".jpg";

    }

    return $("<img>", {

        class: "tile",

        src: "../images/" + imageName,

        "data-letter": letter,

        "data-rack": index,

        alt: letter

    });

}
/*
            MAKE TILES DRAGGABLE
 */

function makeTilesDraggable() {

    $(".tile").draggable({

        revert: "invalid",

        containment: "document",

        cursor: "move",

        stack: ".tile",

        start: function(){

            $(this).css("z-index",999);

        }

    });

}
/*
            REFILL RACK
 */

function refillRack() {

    while(rack.length < 7 && tileBag.length > 0){

        let randomIndex = Math.floor(Math.random() * tileBag.length);

        rack.push(tileBag[randomIndex]);

        tileBag.splice(randomIndex,1);

    }

    displayRack();

    updateScoreBoard();

}
/*
            REFILL RACK
*/

function refillRack() {

    while(rack.length < 7 && tileBag.length > 0){

        let randomIndex = Math.floor(Math.random() * tileBag.length);

        rack.push(tileBag[randomIndex]);

        tileBag.splice(randomIndex,1);

    }

    displayRack();

    updateScoreBoard();

}
/*
            UPDATE CURRENT WORD
 */

function updateCurrentWord() {

    currentWord = "";

    currentWordScore = 0;

    for (let i = 0; i < board.length; i++) {

        if (board[i] !== null) {

            currentWord += board[i];

        }

    }

    calculateCurrentScore();

}
/*
            CALCULATE SCORE
 */

function calculateCurrentScore() {

    currentWordScore = 0;

    let wordMultiplier = 1;

    $(".boardSlot").each(function(index){

        let tile = $(this).children(".tile");

        if(tile.length===0){

            return;

        }

        let letter = tile.data("letter");

        let value = ScrabbleTiles[letter]["value"];

        let bonus = bonusSquares[index];

        switch(bonus){

            case "doubleLetter":

                value *= 2;

                break;

            case "tripleLetter":

                value *= 3;

                break;

            case "doubleWord":

                wordMultiplier *= 2;

                break;

        }

        currentWordScore += value;

    });

    currentWordScore *= wordMultiplier;

    updateScoreBoard();

}
/*
            RECALL TILES
 */

function recallTiles() {

    $(".boardSlot .tile").each(function () {

    $(this).draggable("enable");

    $("#rackTiles").append($(this));

});

    board.fill(null);

    currentWord = "";

    currentWordScore = 0;

    makeTilesDraggable();

    updateScoreBoard();

    $("#message").text("Tiles Returned.");

}

/*
            SUBMIT WORD
 */

function submitWord() {

    // No tiles placed
    if (currentWord.length === 0) {

        $("#message").text("Place at least one tile.");

        return;
    }

    // Add current score to total
    totalScore += currentWordScore;

    // Remove played tiles from the rack
    rack = rack.filter(function (letter) {

        return !currentWord.includes(letter);

    });

    // Clear board
    board.fill(null);

    $(".boardSlot").empty();

    // Reset current word
    currentWord = "";

    currentWordScore = 0;

    // Draw replacement tiles
    refillRack();

    updateScoreBoard();

    // Check game over
    if (tileBag.length === 0 && rack.length === 0) {

        $("#message").text(
            "Game Over! Final Score: " + totalScore
        );

    } else {

        $("#message").text("Word Submitted!");

    }

}
/*
            SHUFFLE RACK
*/

function shuffleRack() {

    for (let i = rack.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        [rack[i], rack[j]] = [rack[j], rack[i]];

    }

    displayRack();

    $("#message").text("Tiles Shuffled.");

}
/* Restart the game*/

function restartGame() {

    tileBag = [];

    rack = [];

    board.fill(null);

    currentWord = "";

    currentWordScore = 0;

    totalScore = 0;

    $(".boardSlot").empty();

    createTileBag();

    drawSevenTiles();

    displayRack();

    updateScoreBoard();

    $("#message").text("New Game Started.");

}
