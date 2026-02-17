/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)
*/

"use strict"; // Do NOT remove this directive!

var FILLING = {

    // CONSTANTS

    WIDTH: 13, // width of grid
    HEIGHT: 11, // height of grid
    FRAME_RATE: 1,	// frame rate

    // VARIABLES

    // These two arrays store the X and Y positions of active fillings
    fillingX: [],
    fillingY: [],

    // This holds how many clicks the user has left
    amount: 13,

    // This hold which level the player is on
    currentLevel: 1,

    // This holds if a level has been completed
    // 1 = yes
    // 0 = no
    checkLevel: 1,

    // Call the endGame function once upon completing a level
    endGameOnce: 0,

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

            switch (FILLING.currentLevel) {
                case 1:
                    PS.color(x, y, PS.COLOR_BLUE);
                    PS.color(x, y + 1, PS.COLOR_BLUE);
                    PS.color(x, y - 1, PS.COLOR_BLUE);
                    PS.color(x + 1, y, PS.COLOR_BLUE);
                    PS.color(x - 1, y, PS.COLOR_BLUE);
                    break;
                case 2:
                    if (FILLING.amount >= 11 || FILLING.amount == 8 || FILLING.amount <= 6 ) {
                        PS.color(x, y, PS.COLOR_BLUE);
                        PS.color(x, y + 1, PS.COLOR_BLUE);
                        PS.color(x, y - 1, PS.COLOR_BLUE);
                        PS.color(x + 1, y, PS.COLOR_BLUE);
                        PS.color(x - 1, y, PS.COLOR_BLUE);
                    }
                    if (FILLING.amount == 10 ) {
                        PS.color(x, y, PS.COLOR_YELLOW);
                        PS.color(x, y + 1, PS.COLOR_YELLOW);
                        PS.color(x, y - 1, PS.COLOR_YELLOW);

                    }
                    if (FILLING.amount == 9 ) {
                        PS.color(x, y, PS.COLOR_MAGENTA);
                        PS.color(x + 1, y, PS.COLOR_MAGENTA);
                        PS.color(x - 1, y, PS.COLOR_MAGENTA);
                    }
                    if (FILLING.amount == 7 ) {
                        PS.color(x, y, PS.COLOR_RED);
                        PS.color(x + 1, y + 1, PS.COLOR_RED);
                        PS.color(x + 1, y - 1, PS.COLOR_RED);
                        PS.color(x - 1, y + 1, PS.COLOR_RED);
                        PS.color(x - 1, y - 1, PS.COLOR_RED);
                    }
                    break;
                case 3:
                    if (FILLING.amount >= 10 || FILLING.amount == 7 || FILLING.amount == 6 || FILLING.amount == 5 || FILLING.amount <= 2 ) {
                        PS.color(x, y, PS.COLOR_BLUE);
                        PS.color(x, y + 1, PS.COLOR_BLUE);
                        PS.color(x, y - 1, PS.COLOR_BLUE);
                        PS.color(x + 1, y, PS.COLOR_BLUE);
                        PS.color(x - 1, y, PS.COLOR_BLUE);
                    }
                    if (FILLING.amount == 9 || FILLING.amount == 4 ) {
                        PS.color(x, y, PS.COLOR_YELLOW);
                        PS.color(x, y + 1, PS.COLOR_YELLOW);
                        PS.color(x, y - 1, PS.COLOR_YELLOW);

                    }
                    if (FILLING.amount == 8 || FILLING.amount == 3 ) {
                        PS.color(x, y, PS.COLOR_MAGENTA);
                        PS.color(x + 1, y, PS.COLOR_MAGENTA);
                        PS.color(x - 1, y, PS.COLOR_MAGENTA);
                    }
                    break;
                default:
                    PS.color(x, y, PS.COLOR_BLUE);
            }

            FILLING.fillingX.splice(i, 1);
            FILLING.fillingY.splice(i, 1);

            len -= 1;

        }

        FILLING.border();

        if (FILLING.amount < 1) {

            FILLING.checkColor();

            FILLING.endGame();
            
        }

    },

    // FILLING.border ()
    // Adds the border so the fillings doesn't go off the field

    border : function () {

        var i = 0;
        for (i = 0; i < 13; i += 1) {
            PS.color(i, 1, PS.COLOR_WHITE);
            PS.border(i, 1, 0);
        }

        var i = 0;
        for (i = 0; i < 13; i += 1) {
            PS.color(i, 9, PS.COLOR_WHITE);
            PS.border(i, 9, 0);
        }

        var i = 0;
        for (i = 0; i < 9; i += 1) {
            PS.color( 2, i+1, PS.COLOR_WHITE);
            PS.border( 2, i+1, 0);
        }

        var i = 0;
        for (i = 0; i < 9; i += 1) {
            PS.color( 10, i+1, PS.COLOR_WHITE);
            PS.border( 10, i+1, 0);
        }
    },

    reset : function () {

        PS.audioPlay("fx_swoosh");

        FILLING.endGameOnce = 0;

        //Set up "reset" button
        PS.color( 0, 8, PS.COLOR_ORANGE );
        PS.border( 0, 8, 1 );
        PS.glyphColor( 0, 8, PS.COLOR_BLACK );

        // Set up "next" button
        PS.color( 12, 8, {rgb: 0xe1e1e1} );
        PS.border( 12, 8, 1 );
        PS.glyphColor( 12, 8, PS.COLOR_BLACK );
        PS.glyph( 12, 8, ">" );

        // Set title
        PS.statusColor( PS.COLOR_BLUE );
        PS.statusText( "Fill It Puzzle" );

        FILLING.checkLevel = 1;

        //Reset Life
        FILLING.amount = 13;

        //Reset Border
        FILLING.border();

        PS.color( PS.ALL, PS.ALL, { rgb : PS.COLOR_WHITE } );
        PS.border( PS.ALL, PS.ALL, 0 );

        var i = 0;
        var j = 0;
        for (i = 0; i < 7; i += 1) {
            for (j = 0; j < 7; j += 1) {
                PS.color(i+3, j+2, {rgb: PS.COLOR_GRAY});
                PS.border( i+3, j+2, 1 );
            }
        }

        // Add Level's Life

        switch (FILLING.currentLevel) {
            case 1:
                FILLING.levelOne();
                break;
            case 2:
                FILLING.levelTwo();
                break;
            case 3:
                FILLING.levelThree();
                break;
            default:
                FILLING.levelOne();
        }

        // Enable "reset" button

        PS.color( 0, 8, PS.COLOR_ORANGE );
        PS.border( 0, 8, 1 );
        PS.glyphColor( 0, 8, PS.COLOR_BLACK );
        PS.glyph( 0, 8, "R" );
        PS.exec( 0, 8, FILLING.reset );

        // Stop "next" button
        PS.color( 12, 8, {rgb: 0xe1e1e1} );
        PS.border( 12, 8, 1 );
        PS.glyphColor( 12, 8, PS.COLOR_BLACK );
        PS.glyph( 12, 8, ">" );
        PS.exec( 12, 8, FILLING.notNext );

    },

    levelOne : function () {

        var i = 0;
        for (i = 0; i < 13; i += 1) {
            PS.color( i, 0, {rgb: PS.COLOR_BLUE});
            PS.border( i, 0, 1 );
        }

    },

    levelTwo : function () {

        var i = 0;
        for (i = 0; i < 13; i += 1) {
            PS.color( i, 0, {rgb: PS.COLOR_BLUE});
            PS.border( i, 0, 1 );
        }

        PS.color( 9 , 0, {rgb: PS.COLOR_MAGENTA});

        PS.color( 10 , 0, {rgb: PS.COLOR_YELLOW});

        PS.color( 7 , 0, {rgb: PS.COLOR_RED});

    },

    levelThree : function () {

        var i = 0;
        for (i = 0; i < 13; i += 1) {
            PS.color( i, 0, {rgb: PS.COLOR_BLUE});
            PS.border( i, 0, 1 );
        }

        PS.color( 3 , 0, {rgb: PS.COLOR_MAGENTA});
        PS.color( 8 , 0, {rgb: PS.COLOR_MAGENTA});

        PS.color( 4 , 0, {rgb: PS.COLOR_YELLOW});
        PS.color( 9 , 0, {rgb: PS.COLOR_YELLOW});

    },

    notNext : function () {
        PS.audioPlay( "fx_bucket" );
    },

    // FILLING.life ()
    // Adds a health bar of how many clicks the user has left

    life : function () {

        FILLING.amount = FILLING.amount - 1;

        PS.color( FILLING.amount, 0, {rgb: PS.COLOR_GRAY_LIGHT});
        PS.border( FILLING.amount, 0, 0 );

    },

    checkColor : function () {

        // Iterate through the board
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < FILLING.HEIGHT; j++) {
                // If at any point, the color is incorrect, then do this
                if (PS.color(j, i) == PS.COLOR_GRAY) {
                    FILLING.checkLevel = 0;
                }
            }
        }
    },

    endGame : function () {

        if (FILLING.amount < 1) {

            if (FILLING.endGameOnce < 1) {

                FILLING.endGameOnce = 1;

                if (FILLING.checkLevel == 1) {

                    // Play "winning" audio
                    PS.audioPlay("fx_tada");

                    switch (FILLING.currentLevel) {
                        case 1:
                            FILLING.currentLevel = 2;

                            // Display "winning" text
                            PS.statusColor(PS.COLOR_ORANGE);
                            PS.statusText("LEVEL 1 COMPLETE!");

                            // Disable "reset" button
                            PS.color(0, 8, {rgb: 0xe1e1e1});
                            PS.exec(0, 8, FILLING.notNext);

                            // Enable "next" button
                            PS.color(12, 8, PS.COLOR_GREEN);
                            PS.exec(12, 8, FILLING.reset);
                            break;
                        case 2:
                            FILLING.currentLevel = 3;

                            // Display "winning" text
                            PS.statusColor(PS.COLOR_ORANGE);
                            PS.statusText("LEVEL 2 COMPLETE!");

                            // Disable "reset" button
                            PS.color(0, 8, {rgb: 0xe1e1e1});
                            PS.exec(0, 8, FILLING.notNext);

                            // Enable "next" button
                            PS.color(12, 8, PS.COLOR_GREEN);
                            PS.exec(12, 8, FILLING.reset);
                            break;
                        case 3:
                            // Display "winning" text
                            PS.statusColor(PS.COLOR_GREEN);
                            PS.statusText("YOU BEAT THE GAME!");

                            // Disable "reset" button
                            PS.color(0, 8, {rgb: 0xe1e1e1});
                            PS.exec(0, 8, FILLING.notNext);

                            // Disable "next" button
                            PS.color(12, 8, {rgb: 0xe1e1e1});
                            PS.exec(12, 8, FILLING.notNext);
                            break;
                        default:
                            FILLING.levelOne();
                    }
                }

                // After losing a level
                if (FILLING.checkLevel == 0) {

                    // Display "losing" text
                    PS.statusColor(PS.COLOR_VIOLET);
                    PS.statusText("You lost. Try again.");

                    // Play "losing" audio
                    PS.audioPlay("fx_bloink");

                }

            }

        }

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
            PS.color(i+3, j+2, {rgb: PS.COLOR_GRAY});
            PS.border( i+3, j+2, 1 );
        }
    }

    for (i = 0; i < 13; i += 1) {
        PS.color( i, 0, {rgb: PS.COLOR_BLUE});
        PS.border( i, 0, 1 );
    }

    // Set up "reset" button

    PS.color( 0, 8, PS.COLOR_ORANGE );
    PS.border( 0, 8, 1 );
    PS.glyphColor( 0, 8, PS.COLOR_BLACK );
    PS.glyph( 0, 8, "R" );
    PS.exec( 0, 8, FILLING.reset );

    // Set up "next" button

    PS.color( 12, 8, {rgb: 0xe1e1e1} );
    PS.border( 12, 8, 1 );
    PS.glyphColor( 12, 8, PS.COLOR_BLACK );
    PS.glyph( 12, 8, ">" );
    PS.exec( 12, 8, FILLING.notNext );

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
    if ( y < 9 && y > 1 && x < 10 && x > 2) {

        // If you have life left, set a filling
        if (FILLING.amount > 0) {
            FILLING.fillingX.push(x);
            FILLING.fillingY.push(y);

            PS.color(x, y, PS.COLOR_BLACK); // set the color

            PS.audioPlay("fx_click");

            FILLING.life();
        }
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

