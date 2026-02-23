/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)
*/

"use strict"; // Do NOT remove this directive!

var timerCustomer;
var timerRound;
var timerResult;

var PIZZA = {

    // CONSTANTS
    WIDTH: 19, // width of grid
    HEIGHT: 19, // height of grid
    FRAME_RATE_ORDERING: 125, // tick speed of customer ordering
    FRAME_RATE_RESULT: 25, // tick speed of the end screen after a round

    // VARIABLES

    // This holds how many clicks the user has left

    phase: 0, // This is how far the pizza is in its process of creation
    startGame: 1, // This ensures that the game start section is only called once
    pizzaOrder: 0, // 0 = NULL, 1 = Cheese Pizza, 2 = Pepperoni

    // Timer variables

    timerRound: 0,
    frameRateRound: 45, // tick speed of the round when making pizza
    hasCustomerOrdered: 1, // toggle Customer Waiting Timer
    isResultScreenOn: 0, // toggle result screen after a round ends

    // FUNCTIONS

    // This function starts a timer where the customer is deciding to order
    tickCustomer : function () {
        "use strict";

        // The Customer is waiting
        if ( PIZZA.hasCustomerOrdered == 1) {

            // Clear the table
            var i = 0;
            var j = 0;

            for (i = 0; i < 14; i += 1) {
                for (j = 0; j < 14; j += 1) {
                    PS.color(i + 3, j + 5, PS.COLOR_GRAY_LIGHT);
                    PS.border(i + 3, j + 5, 0);
                }
            }

            // Set title
            PS.statusColor(PS.COLOR_GRAY);
            PS.statusText("The customer is deciding...");

            PIZZA.hasCustomerOrdered = PIZZA.hasCustomerOrdered - 1;

        }
        // The Customer decides and the game starts
        else if ( PIZZA.hasCustomerOrdered == 0) {

            // Stop timer
            PS.timerStop(timerCustomer);
            PIZZA.hasCustomerOrdered = -1;

            PIZZA.timerRound = 18;

            // Allow player to make pizza
            PIZZA.phase = 1;

            PIZZA.pizzaChoice();

            PIZZA.startGameAndTimers();
        }

    },

    // This function starts the timer for how long you have to create the pizza
    tickTimer : function () {
        "use strict";

        // Timer is running...
        if ( PIZZA.timerRound >= 0) {

            PS.color(PIZZA.timerRound, 0, {rgb: PS.COLOR_WHITE});

            PIZZA.timerRound = PIZZA.timerRound - 1;

        }
        // The timer ran out!
        else if ( PIZZA.timerRound == -1) {
            PS.audioPlay("fx_squirp");

            // Stop timer
            PS.timerStop(timerRound);
            PIZZA.timerRound = -2;

            PIZZA.isResultScreenOn = 1;

            // Stop player from making pizza
            PIZZA.phase = 0;

            // Set title
            PS.statusColor(PS.COLOR_GRAY_DARK);
            PS.statusText("'You took too long!!!'");

            PIZZA.startGameAndTimers();
        }
        // You completed the round before the timer ran out!
        else if (PIZZA.timerRound == -3) {

            // Stop timer
            PS.timerStop(timerRound);
            PIZZA.timerRound = -2;

            PIZZA.isResultScreenOn = 1;

            //Check if the order is correct or not
            PIZZA.checkCreation();

            PIZZA.startGameAndTimers();
        }

    },

    // This function starts a timer after the player has finished a round
    tickResult : function () {
        "use strict";

        // End Screen
        if ( PIZZA.isResultScreenOn == 1) {

            PIZZA.isResultScreenOn = PIZZA.isResultScreenOn - 1;

        }
        // The Customer decides and the game starts
        else if ( PIZZA.isResultScreenOn == 0) {

            // Stop timer
            PS.timerStop(timerResult);
            PIZZA.isResultScreenOn = -1;

            PIZZA.hasCustomerOrdered = 1;

            // Reset pizzaOrder
            PIZZA.pizzaOrder = 0;

            // Stop player from making pizza
            PIZZA.phase = 0;

            PIZZA.startGameAndTimers();
        }
    },

    // This function is where the customer chooses the pizza
    pizzaChoice : function () {

        var randomChoice;
        randomChoice = Math.floor(Math.random() * 4) + 1;

        switch (randomChoice) {
            case 1:
                PS.statusText("'I will have a cheese pizza please!'");
                PIZZA.pizzaOrder = 1;
                break;
            case 2:
                PS.statusText("'I will have a pepperoni pizza please!'");
                PIZZA.pizzaOrder = 2;
                break;
            case 3:
                PS.statusText("'I will have a mushroom pizza please!'");
                PIZZA.pizzaOrder = 3;
                break;
            case 4:
                PS.statusText("'I will have an anchovy pizza please!'");
                PIZZA.pizzaOrder = 4;
                break;
            default:
                PS.statusText("'I will have whatever!''");
        }
    },

    // This function checks if the order is correct.
    checkCreation : function () {

        switch (PIZZA.pizzaOrder) {
            // Check for cheese pizza
            case 1:
                if (PS.color(6, 9) == PS.COLOR_YELLOW) {

                    // Set title
                    PS.statusColor(PS.COLOR_GREEN);
                    PS.statusText("'Thank you!!!'");

                    PS.audioPlay("fx_ding");
                }
                else {
                    // Set title
                    PS.statusColor(PS.COLOR_RED);
                    PS.statusText("'This is wrong!!!'");

                    PS.audioPlay("fx_wilhelm");
                }
                break;
            // Check for pepperoni pizza
            case 2:
                if (PS.color(6, 9) == 0xD51200 ) {

                    // Set title
                    PS.statusColor(PS.COLOR_GREEN);
                    PS.statusText("'Thank you!!!'");

                    PS.audioPlay("fx_ding");
                }
                else {
                    // Set title
                    PS.statusColor(PS.COLOR_RED);
                    PS.statusText("'This is wrong!!!'");

                    PS.audioPlay("fx_wilhelm");
                }
                break;
            // Check for mushroom pizza
            case 3:
                if (PS.color(6, 9) == 0x8E4C11 ) {

                    // Set title
                    PS.statusColor(PS.COLOR_GREEN);
                    PS.statusText("'Thank you!!!'");

                    PS.audioPlay("fx_ding");
                }
                else {
                    // Set title
                    PS.statusColor(PS.COLOR_RED);
                    PS.statusText("'This is wrong!!!'");

                    PS.audioPlay("fx_wilhelm");
                }
                break;
            // Check for anchovy pizza
            case 4:
                if (PS.color(6, 9) == 0xAA9690 ) {

                    // Set title
                    PS.statusColor(PS.COLOR_GREEN);
                    PS.statusText("'Thank you!!!'");

                    PS.audioPlay("fx_ding");
                }
                else {
                    // Set title
                    PS.statusColor(PS.COLOR_RED);
                    PS.statusText("'This is wrong!!!'");

                    PS.audioPlay("fx_wilhelm");
                }
                break;
            default:
                // Set title
                PS.statusColor(PS.COLOR_RED);
                PS.statusText("'I don't know what I want!'");

                PS.audioPlay("fx_wilhelm");
        }
    },

    startGameAndTimers : function () {

        if (PIZZA.startGame == 1) {

            // Set up the board

            var i = 0;
            var j = 0;

            PS.color(PS.ALL, PS.ALL, {rgb: PS.COLOR_GRAY_LIGHT});
            PS.border(PS.ALL, PS.ALL, 0);
            PS.exec(PS.ALL, PS.ALL, PIZZA.null);

            for (i = 0; i < 19; i += 1) {
                PS.color(i, 0, {rgb: PS.COLOR_WHITE});
                PS.border(i, 0, 0);
            }

            for (i = 0; i < 19; i += 1) {
                PS.color(i, 1, {rgb: PS.COLOR_WHITE});
                PS.border(i, 1, 0);
            }

            for (i = 0; i < 19; i += 1) {
                PS.color(i, 2, {rgb: PS.COLOR_WHITE});
                PS.border(i, 2, 0);
            }

            for (i = 0; i < 19; i += 1) {
                PS.color(i, 3, {rgb: PS.COLOR_WHITE});
                PS.border(i, 3, 0);
            }

            // Set up timer

            for (i = 0; i < 19; i += 1) {
                PS.color(i, 0, PS.COLOR_INDIGO);
                PS.border(i, 0, 1);
            }

            // Set up the Buttons

            // Dough/Bread button
            PS.color(1, 6, {rgb: 0xEACE84});
            PS.border(1, 6, 1);
            PS.glyphColor(1, 6, PS.COLOR_BLACK);
            PS.glyph(1, 6, "D");
            PS.exec(1, 6, PIZZA.dough);

            // Tomato Sauce button
            PS.color(1, 8, PS.COLOR_RED);
            PS.border(1, 8, 1);
            PS.glyphColor(1, 8, PS.COLOR_BLACK);
            PS.glyph(1, 8, "T");
            PS.exec(1, 8, PIZZA.tomato);

            // Cheese button
            PS.color(1, 10, PS.COLOR_YELLOW);
            PS.border(1, 10, 1);
            PS.glyphColor(1, 10, PS.COLOR_BLACK);
            PS.glyph(1, 10, "C");
            PS.exec(1, 10, PIZZA.cheese);

            // Pepperoni button
            PS.color(1, 12, {rgb: 0xD51200} );
            PS.border(1, 12, 1);
            PS.glyphColor(1, 12, PS.COLOR_BLACK);
            PS.glyph(1, 12, "P");
            PS.exec(1, 12, PIZZA.pepperoni);

            // Mushroom button
            PS.color(1, 14, {rgb: 0x8E4C11} );
            PS.border(1, 14, 1);
            PS.glyphColor(1, 14, PS.COLOR_BLACK);
            PS.glyph(1, 14, "M");
            PS.exec(1, 14, PIZZA.mushroom);

            // Anchovy button
            PS.color(1, 16, {rgb: 0xAA9690} );
            PS.border(1, 16, 1);
            PS.glyphColor(1, 16, PS.COLOR_BLACK);
            PS.glyph(1, 16, "A");
            PS.exec(1, 16, PIZZA.anchovy);

            // Bake button
            PS.color(17, 6, PS.COLOR_ORANGE);
            PS.border(17, 6, 1);
            PS.glyphColor(17, 6, PS.COLOR_BLACK);
            PS.glyph(17, 6, "B");
            PS.exec(17, 6, PIZZA.bake);

            // Finish button
            PS.color(17, 16, PS.COLOR_GREEN);
            PS.border(17, 16, 1);
            PS.glyphColor(17, 16, PS.COLOR_BLACK);
            PS.glyph(17, 16, "F");
            PS.exec(17, 16, PIZZA.finish);

            PS.audioPlay("fx_click");

            PIZZA.startGame = 0;
        }


        // Timers

        // CUSTOMER
        if (PIZZA.hasCustomerOrdered == 1) {

            // Set up timer
            for (i = 0; i < 19; i += 1) {
                PS.color(i, 0, PS.COLOR_INDIGO);
                PS.border(i, 0, 1);
            }

            // Start the customer wait timer
            timerCustomer = PS.timerStart(PIZZA.FRAME_RATE_ORDERING, PIZZA.tickCustomer);

        }
        // ROUND
        else if (PIZZA.timerRound == 18) {

            // Make the rounds faster
            if (PIZZA.frameRateRound > 15) {
                PIZZA.frameRateRound = PIZZA.frameRateRound - 5;
            }

            // Set up timer
            for (i = 0; i < 19; i += 1) {
                PS.color(i, 0, PS.COLOR_INDIGO);
                PS.border(i, 0, 1);
            }

            // Start the timer and game!
            timerRound = PS.timerStart(PIZZA.frameRateRound, PIZZA.tickTimer);

        }
        // RESULTS
        else if (PIZZA.isResultScreenOn == 1) {

            // Start the "round end" timer
            timerResult = PS.timerStart(PIZZA.FRAME_RATE_RESULT, PIZZA.tickResult);

        }

    },

    // PIZZA.dough ()
    // Starts the pizza with the dough

    dough : function () {

        if (PIZZA.phase == 1) {

            var i = 0;
            var j = 0;

            for (i = 0; i < 9; i += 1) {
                for (j = 0; j < 9; j += 1) {
                    PS.color(i + 5, j + 7, {rgb: 0xEACE84});
                    PS.border(i + 5, j + 7, 0);
                }
            }
            for (i = 0; i < 7; i += 1) {
                PS.color(i + 6, 6, {rgb: 0xEACE84});
                PS.border(i + 6, 6, 0);
            }
            for (i = 0; i < 7; i += 1) {
                PS.color(i + 6, 16, {rgb: 0xEACE84});
                PS.border(i + 6, 16, 0);
            }
            for (i = 0; i < 7; i += 1) {
                PS.color(4, i + 8, {rgb: 0xEACE84});
                PS.border(4, i + 8, 0);
            }
            for (i = 0; i < 7; i += 1) {
                PS.color(14, i + 8, {rgb: 0xEACE84});
                PS.border(14, i + 8, 0);
            }

            PS.audioPlay("fx_squish");

            PIZZA.phase = 2;
        }
        else {
            PS.audioPlay("fx_tick");
        }

    },

    // PIZZA.tomato ()
    // Adds tomato sauce to the pizza

    tomato : function () {

        if (PIZZA.phase == 2) {

            var i = 0;
            var j = 0;

            for (i = 0; i < 5; i += 1) {
                for (j = 0; j < 5; j += 1) {
                    PS.color(i + 7, j + 9, PS.COLOR_RED);
                    PS.border(i + 7, j + 9, 0);
                }
            }
            for (i = 0; i < 5; i += 1) {
                PS.color(i + 7, 8, PS.COLOR_RED);
                PS.border(i + 7, 8, 0);
            }
            for (i = 0; i < 5; i += 1) {
                PS.color(i + 7, 14, PS.COLOR_RED);
                PS.border(i + 7, 14, 0);
            }
            for (i = 0; i < 5; i += 1) {
                PS.color(6, i + 9, PS.COLOR_RED);
                PS.border(6, i + 9, 0);
            }
            for (i = 0; i < 5; i += 1) {
                PS.color(12, i + 9, PS.COLOR_RED);
                PS.border(12, i + 9, 0);
            }

            PS.audioPlay("fx_squish");

            PIZZA.phase = 3;
        }
        else {
            PS.audioPlay("fx_tick");
        }

    },

    // PIZZA.cheese ()
    // Adds cheese to the pizza

    cheese : function () {

        if (PIZZA.phase == 3) {

            var i = 0;
            var j = 0;

            for (i = 0; i < 5; i += 1) {
                for (j = 0; j < 5; j += 1) {
                    PS.color(i + 7, j + 9, PS.COLOR_YELLOW);
                    PS.border(i + 7, j + 9, 0);
                }
            }
            for (i = 0; i < 5; i += 1) {
                PS.color(i + 7, 8, PS.COLOR_YELLOW);
                PS.border(i + 7, 8, 0);
            }
            for (i = 0; i < 5; i += 1) {
                PS.color(i + 7, 14, PS.COLOR_YELLOW);
                PS.border(i + 7, 14, 0);
            }
            for (i = 0; i < 5; i += 1) {
                PS.color(6, i + 9, PS.COLOR_YELLOW);
                PS.border(6, i + 9, 0);
            }
            for (i = 0; i < 5; i += 1) {
                PS.color(12, i + 9, PS.COLOR_YELLOW);
                PS.border(12, i + 9, 0);
            }

            PS.audioPlay("fx_squish");

            PIZZA.phase = 4;
        }
        else {
            PS.audioPlay("fx_tick");
        }

    },

    // PIZZA.pepperoni ()
    // Adds pepperoni to the pizza

    pepperoni : function () {

        if (PIZZA.phase == 4) {

            PS.color(6, 9, {rgb: 0xD51200} );
            PS.color(9, 8, {rgb: 0xD51200} );
            PS.color(10, 11, {rgb: 0xD51200} );
            PS.color(7, 12, {rgb: 0xD51200} );
            PS.color(12, 10, {rgb: 0xD51200} );
            PS.color(11, 13, {rgb: 0xD51200} );
            PS.color(9, 14, {rgb: 0xD51200} );

            PS.audioPlay("fx_squish");

            PIZZA.phase = 5;
        }
        else {
            PS.audioPlay("fx_tick");
        }
    },

    // PIZZA.mushroom ()
    // Adds mushrooms to the pizza

    mushroom : function () {

        if (PIZZA.phase == 4) {

            PS.color(6, 9, {rgb: 0x8E4C11} );
            PS.color(8, 8, {rgb: 0x8E4C11} );
            PS.color(9, 11, {rgb: 0x8E4C11} );
            PS.color(12, 10, {rgb: 0x8E4C11} );
            PS.color(10, 13, {rgb: 0x8E4C11} );
            PS.color(7, 14, {rgb: 0x8E4C11} );

            PS.audioPlay("fx_squish");

            PIZZA.phase = 5;
        }
        else {
            PS.audioPlay("fx_tick");
        }
    },

    // PIZZA.anchovy ()
    // Adds anchovies to the pizza

    anchovy : function () {

        if (PIZZA.phase == 4) {

            PS.color(6, 9, {rgb: 0xAA9690} );
            PS.color(6, 10, {rgb: 0xAA9690} );

            PS.color(9, 8, {rgb: 0xAA9690} );
            PS.color(10, 8, {rgb: 0xAA9690} );

            PS.color(8, 10, {rgb: 0xAA9690} );
            PS.color(8, 11, {rgb: 0xAA9690} );

            PS.color(12, 10, {rgb: 0xAA9690} );
            PS.color(11, 10, {rgb: 0xAA9690} );

            PS.color(10, 13, {rgb: 0xAA9690} );
            PS.color(9, 13, {rgb: 0xAA9690} );

            PS.audioPlay("fx_squish");

            PIZZA.phase = 5;
        }
        else {
            PS.audioPlay("fx_tick");
        }
    },

    // PIZZA.bake ()
    // Bakes the pizza

    bake : function () {

        if (PIZZA.phase == 4 || PIZZA.phase == 5) {

            var i = 0;
            var j = 0;

            for (i = 0; i < 7; i += 1) {
                PS.color(i + 6, 6, {rgb: 0xB18823});
                PS.border(i + 6, 6, 0);
            }
            for (i = 0; i < 7; i += 1) {
                PS.color(i + 6, 16, {rgb: 0xB18823});
                PS.border(i + 6, 16, 0);
            }
            for (i = 0; i < 7; i += 1) {
                PS.color(4, i + 8, {rgb: 0xB18823});
                PS.border(4, i + 8, 0);
            }
            for (i = 0; i < 7; i += 1) {
                PS.color(14, i + 8, {rgb: 0xB18823});
                PS.border(14, i + 8, 0);
            }
            PS.color(13, 7, {rgb: 0xB18823});
            PS.color(5, 7, {rgb: 0xB18823});
            PS.color(5, 15, {rgb: 0xB18823});
            PS.color(13, 15, {rgb: 0xB18823});
            for (i = 0; i < 7; i += 1) {
                PS.color(i + 6, 7, {rgb: 0xD9B14D});
                PS.border(i + 6, 7, 0);
            }
            for (i = 0; i < 7; i += 1) {
                PS.color(i + 6, 15, {rgb: 0xD9B14D});
                PS.border(i + 6, 15, 0);
            }
            for (i = 0; i < 7; i += 1) {
                PS.color(5, i + 8, {rgb: 0xD9B14D});
                PS.border(5, i + 8, 0);
            }
            for (i = 0; i < 7; i += 1) {
                PS.color(13, i + 8, {rgb: 0xD9B14D});
                PS.border(13, i + 8, 0);
            }
            PS.color(12, 8, {rgb: 0xD9B14D});
            PS.color(6, 8, {rgb: 0xD9B14D});
            PS.color(6, 14, {rgb: 0xD9B14D});
            PS.color(12, 14, {rgb: 0xD9B14D});

            PS.audioPlay("fx_squish");

            PIZZA.phase = 6;
        }
        else {
            PS.audioPlay("fx_tick");
        }
    },

    // PIZZA.finish ()
    // Adds pepperoni to the pizza

    finish : function () {

        if (PIZZA.phase == 6) {

            PIZZA.timerRound = -3;

            PIZZA.phase = 7;

            PS.audioPlay("fx_click");
        }
        else {
            PS.audioPlay("fx_tick");
        }
    },

    null : function () {
        
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
    PS.gridSize( PIZZA.WIDTH, PIZZA.HEIGHT );

    PS.color( PS.ALL, PS.ALL, { rgb : PS.COLOR_WHITE } );
    PS.border( PS.ALL, PS.ALL, 0 );

    PS.color( 10, 10, PS.COLOR_GREEN );

    var i = 0;
    var j = 0;

    for (i = 0; i < 6; i += 1) {
        for (j = 0; j < 5; j += 1) {
            PS.color( i+6, j+7, PS.COLOR_GREEN );
            PS.exec( i+6, j+7, PIZZA.startGameAndTimers );
            PS.border( i+6, j+7, 0 );
        }
    }
    
    PS.color(12, 8, PS.COLOR_GREEN );
    PS.color(12, 9, PS.COLOR_GREEN );
    PS.color(12, 10, PS.COLOR_GREEN );
    PS.exec( 12, 8, PIZZA.startGameAndTimers );
    PS.exec( 12, 9, PIZZA.startGameAndTimers );
    PS.exec( 12, 10, PIZZA.startGameAndTimers );

    // Set title
    PS.statusColor( PS.COLOR_ORANGE );
    PS.statusText( "Pizza Maker Game" );

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

