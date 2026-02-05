/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)
*/

"use strict"; // Do NOT remove this directive!

var FILLING = {

    // CONSTANTS
    WIDTH: 15, // width of grid
    HEIGHT: 10, // height of grid
    FRAME_RATE: 6,	// frame rate

    // VARIABLES

    // These two arrays store the X and Y positions of active fillings

    fillingX: [],
    fillingY: [],

    // This holds how many clicks the user has left

    amount: 14,

    // FUNCTIONS

    // FILLING.tick()
    // Called on every clock tick
    // Used to animate the bomb fillings

    tick : function () {
        "use strict";
        var len, i, x, y, select;

        len = FILLING.fillingX.length; // number of fillings

        // Loop through each active fillings
        i = 0;
        while (i < len) {
            // get current position of fillings
            x = FILLING.fillingX[i];
            y = FILLING.fillingY[i];

            // update its x and y position in the array
            FILLING.fillingX[i] = x;
            FILLING.fillingY[i] = y;

            PS.color(x, y, PS.COLOR_BLUE);
            PS.color(x, y + 1, PS.COLOR_BLUE);
            PS.color(x, y - 1, PS.COLOR_BLUE);
            PS.color(x + 1, y, PS.COLOR_BLUE);
            PS.color(x - 1, y, PS.COLOR_BLUE);


            FILLING.fillingX.splice(i, 1);
            FILLING.fillingY.splice(i, 1);

            len -= 1;

        }

        FILLING.border();

    },

    // FILLING.border ()
    // Adds the border so the fillings doesn't go off the field

    border : function () {

        var i = 0;
        for (i = 0; i < 15; i += 1) {
            PS.color(i, 1, PS.COLOR_WHITE);
            PS.border(i, 1, 0);
        }

        var i = 0;
        for (i = 0; i < 15; i += 1) {
            PS.color(i, 9, PS.COLOR_WHITE);
            PS.border(i, 9, 0);
        }

        var i = 0;
        for (i = 0; i < 9; i += 1) {
            PS.color( 3, i+1, PS.COLOR_WHITE);
            PS.border( 3, i+1, 0);
        }

        var i = 0;
        for (i = 0; i < 9; i += 1) {
            PS.color( 11, i+1, PS.COLOR_WHITE);
            PS.border( 11, i+1, 0);
        }
    },

    // FILLING.life ()
    // Adds a health bar of how many clicks the user has left

    life : function () {

        FILLING.amount = FILLING.amount - 1;

        PS.color( FILLING.amount, 0, {rgb: PS.COLOR_GRAY});
        PS.border( FILLING.amount, 0, 1 );

    }
};

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.init = function (system, options) {
    "use strict";

    // Set up the grid
    PS.gridSize( FILLING.WIDTH, FILLING.HEIGHT );

    // Set up the board
    var i = 0;
    var j = 0;

    PS.color( PS.ALL, PS.ALL, { rgb : PS.COLOR_WHITE } );
    PS.border( PS.ALL, PS.ALL, 0 );

    for (i = 0; i < 7; i += 1) {
        for (j = 0; j < 7; j += 1) {
            PS.color(i+4, j+2, {rgb: PS.COLOR_GRAY});
            PS.border( i+4, j+2, 1 );
        }
    }

    for (i = 0; i < 14; i += 1) {
        PS.color( i, 0, {rgb: PS.COLOR_BLUE});
        PS.border( i, 0, 1 );
    }

    // Load and lock audio files

    PS.audioLoad( "fx_click", { lock : true } );

    // Set title
    PS.statusColor( PS.COLOR_BLUE );
    PS.statusText( "Fill It Puzzle" );

    // Start the animation timer
    PS.timerStart( FILLING.FRAME_RATE, FILLING.tick );
};

/*
PS.touch ( x, y, data, options )
Called when the left mouse button is clicked over bead(x, y), or when bead(x, y) is touched.
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.touch = function( x, y, data, options ) {
    "use strict";

    // If filling is the board, set a filling
    if ( y < 9 && y > 1 && x < 11 && x > 3) {

        // If you have life left, set a filling
        if (FILLING.amount > 0) {
            FILLING.fillingX.push(x);
            FILLING.fillingY.push(y);

            PS.color(x, y, PS.COLOR_BLACK); // set the color

            PS.audioPlay("fx_click");

            FILLING.life();
        }
    }

    if (FILLING.amount < 1) {
        PS.statusColor( PS.COLOR_ORANGE );
        PS.statusText( "GAME END! (Is it filled?)" );
    }

};

PS.release = function( x, y, data, options ) {

};

PS.enter = function( x, y, data, options ) {

};

PS.exit = function( x, y, data, options ) {

};

PS.exitGrid = function( options ) {

};

PS.keyDown = function( key, shift, ctrl, options ) {

};

PS.keyUp = function( key, shift, ctrl, options ) {

};

PS.input = function( sensors, options ) {

};

