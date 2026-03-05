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

    phase: 0, // This is how far the pizza is in its process of creation
    pizzaOrder: 0, // 0 = NULL, 1 = Cheese Pizza, 2 = Pepperoni
    tutorial: 1, // 1 = tutorial level, 0 = not
    goodCounter: 1, // This is how many levels you need to complete (16 = Win!)
    badCounter: 1, // This is how many fails you have until Game Over (4 = Game Over)

    // Timer variables

    timerRound: 0,
    frameRateRound: 50, // tick speed of the round when making pizza
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

            PIZZA.startTimer();
        }

    },

    // This function starts the timer for how long you have to create the pizza
    tickTimer : function () {
        "use strict";

        // Timer is running...
        if ( PIZZA.timerRound >= 0) {

            PS.color(PIZZA.timerRound, 0, {rgb: 0xCBD0EA});

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

            // Update bad count
            PS.color(PIZZA.badCounter - 1, 2, PS.COLOR_RED);

            PIZZA.badCounter = PIZZA.badCounter + 1;

            PIZZA.startTimer();
        }
        // You completed the round before the timer ran out!
        else if (PIZZA.timerRound == -3) {

            // Stop timer
            PS.timerStop(timerRound);
            PIZZA.timerRound = -2;

            PIZZA.isResultScreenOn = 1;

            //Check if the order is correct or not
            PIZZA.checkCreation();

            PIZZA.startTimer();
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

            PIZZA.startTimer();
        }
    },

    // This function is where the customer chooses the pizza
    pizzaChoice : function () {

        var randomChoice;
        randomChoice = Math.floor(Math.random() * 5) + 1;

        // Tutorial Level
        if (PIZZA.tutorial == 1) {
            randomChoice = 1;

            // Dough/Bread button
            PS.color(1, 5, {rgb: 0xEACE84});
            PS.border(1, 5, 1);
            PS.glyphColor(1, 5, PS.COLOR_BLACK);
            PS.glyph(1, 5, "D");
            PS.exec(1, 5, PIZZA.dough);
        }

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
            case 5:
                PS.statusText("'I will have a Hawaiian pizza please!'");
                PIZZA.pizzaOrder = 5;
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
                    PIZZA.creationGood();
                }
                else {
                    PIZZA.creationBad();
                }
                break;
            // Check for pepperoni pizza
            case 2:
                if (PS.color(6, 9) == 0xD51200 ) {
                    PIZZA.creationGood();
                }
                else {
                    PIZZA.creationBad();
                }
                break;
            // Check for mushroom pizza
            case 3:
                if (PS.color(6, 9) == 0x8E4C11 ) {
                    PIZZA.creationGood();
                }
                else {
                    PIZZA.creationBad();
                }
                break;
            // Check for anchovy pizza
            case 4:
                if (PS.color(6, 9) == 0xAA9690 ) {
                    PIZZA.creationGood();
                }
                else {
                    PIZZA.creationBad();
                }
                break;
            // Check for hawaiian pizza
            case 5:
                if (PS.color(6, 9) == 0xF5A1BD ) {
                    PIZZA.creationGood();
                }
                else {
                    PIZZA.creationBad();
                }
                break;
            default:
                // Set title
                PS.statusColor(PS.COLOR_RED);
                PS.statusText("'I don't know what I want!'");

                PS.audioPlay("fx_wilhelm");
        }
    },

    creationGood : function () {

        // Set title
        PS.statusColor(PS.COLOR_GREEN);
        PS.statusText("'Thank you!!!'");

        PS.audioPlay("fx_ding");

        // Update good count
        PS.color(PIZZA.goodCounter + 3, 2, PS.COLOR_GREEN);

        PIZZA.goodCounter = PIZZA.goodCounter + 1;

    },

    creationBad : function () {

        // Set title
        PS.statusColor(PS.COLOR_RED);
        PS.statusText("'This is wrong!!!'");

        PS.audioPlay("fx_wilhelm");

        // Update bad count
        PS.color(PIZZA.badCounter - 1, 2, PS.COLOR_RED);

        PIZZA.badCounter = PIZZA.badCounter + 1;

    },

    winScreen : function () {

        // Set title
        PS.statusColor(PS.COLOR_GREEN);
        PS.statusText("YOU BEAT THE GAME!!!");

        PS.audioPlay("fx_tada");

    },

    loseScreen : function () {

        // Set title
        PS.statusColor(PS.COLOR_RED);
        PS.statusText("GAME OVER!");

        PS.audioPlay("fx_shoot6");

    },

    startTimer : function () {

        var i = 0;
        var j = 0;

        // CUSTOMER
        if (PIZZA.hasCustomerOrdered == 1) {

            // Set up timer
            for (i = 0; i < 19; i += 1) {
                PS.color(i, 0, PS.COLOR_INDIGO);
                PS.border(i, 0, 1);
            }

            // Check if the game has ENDED?
            if (PIZZA.goodCounter == 16 || PIZZA.badCounter == 4) {

                // Clear the table
                for (i = 0; i < 18; i += 1) {
                    for (j = 0; j < 14; j += 1) {
                        PS.color(i + 0, j + 5, PS.COLOR_GRAY_LIGHT);
                        PS.glyphColor(i + 0, j + 5, PS.COLOR_GRAY_LIGHT);
                        PS.glyph(i + 0, j + 5, " ");
                        PS.exec(i + 0, j + 5, PIZZA.null);
                        PS.border(i + 0, j + 5, 0);
                    }
                }

                // The Player WON!
                if (PIZZA.goodCounter == 16) {
                    PIZZA.winScreen();
                }

                // The Player lost.
                if (PIZZA.badCounter == 4) {
                    PIZZA.loseScreen();
                }

            }
            else {
                // Start the customer wait timer
                timerCustomer = PS.timerStart(PIZZA.FRAME_RATE_ORDERING, PIZZA.tickCustomer);
            }

        }
        // ROUND
        else if (PIZZA.timerRound == 18) {

            // Make the rounds faster
            if (PIZZA.frameRateRound >= 15) {
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

            // Tutorial Level
            if (PIZZA.tutorial == 1) {
                // Tomato Sauce button
                PS.color(1, 7, PS.COLOR_RED);
                PS.border(1, 7, 1);
                PS.glyphColor(1, 7, PS.COLOR_BLACK);
                PS.glyph(1, 7, "T");
                PS.exec(1, 7, PIZZA.tomato);
            }
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

            // Tutorial Level
            if (PIZZA.tutorial == 1) {
                // Cheese button
                PS.color(1, 9, PS.COLOR_YELLOW);
                PS.border(1, 9, 1);
                PS.glyphColor(1, 9, PS.COLOR_BLACK);
                PS.glyph(1, 9, "C");
                PS.exec(1, 9, PIZZA.cheese);
            }
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

            // Tutorial Level
            if (PIZZA.tutorial == 1) {
                // Bake button
                PS.color(17, 5, PS.COLOR_ORANGE);
                PS.border(17, 5, 1);
                PS.glyphColor(17, 5, PS.COLOR_BLACK);
                PS.glyph(17, 5, "B");
                PS.exec(17, 5, PIZZA.bake);
            }
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

            PS.color(11, 13, {rgb: 0xAA9690} );
            PS.color(10, 13, {rgb: 0xAA9690} );

            PS.color(8, 14, {rgb: 0xAA9690} );
            PS.color(7, 14, {rgb: 0xAA9690} );

            PS.audioPlay("fx_squish");

            PIZZA.phase = 5;
        }
        else {
            PS.audioPlay("fx_tick");
        }
    },

    // PIZZA.hawaiian ()
    // Adds ham and pineapple to the pizza

    hawaiian : function () {

        if (PIZZA.phase == 4) {

            //Ham
            PS.color(6, 9, {rgb: 0xF5A1BD} );
            PS.color(11, 14, {rgb: 0xF5A1BD} );
            PS.color(11, 9, {rgb: 0xF5A1BD} );
            PS.color(8, 12, {rgb: 0xF5A1BD} );

            //Pineapple
            PS.color(9, 8, {rgb: 0xFEEF73} );
            PS.color(7, 10, {rgb: 0xFEEF73} );
            PS.color(9, 13, {rgb: 0xFEEF73} );
            PS.color(10, 11, {rgb: 0xFEEF73} );

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

            // Tutorial Level
            if (PIZZA.tutorial == 1) {
                // Finish button
                PS.color(17, 17, PS.COLOR_GREEN);
                PS.border(17, 17, 1);
                PS.glyphColor(17, 17, PS.COLOR_BLACK);
                PS.glyph(17, 17, "F");
                PS.exec(17, 17, PIZZA.finish);
            }
        }
        else {
            PS.audioPlay("fx_tick");
        }
    },

    // PIZZA.clear ()
    // Clears the pizza during a round

    clear : function () {

        if (PIZZA.phase >= 2 && PIZZA.phase <= 6) {

            var i = 0;
            var j = 0;

            for (i = 0; i < 14; i += 1) {
                for (j = 0; j < 14; j += 1) {
                    PS.color(i + 3, j + 5, PS.COLOR_GRAY_LIGHT);
                    PS.border(i + 3, j + 5, 0);
                }
            }

            PS.audioPlay("fx_swoosh");

            PIZZA.phase = 1;
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

            // Tutorial Level
            if (PIZZA.tutorial == 1) {

                // Pepperoni button
                PS.color(1, 11, {rgb: 0xD51200} );
                PS.border(1, 11, 1);
                PS.glyphColor(1, 11, PS.COLOR_BLACK);
                PS.glyph(1, 11, "P");
                PS.exec(1, 11, PIZZA.pepperoni);

                // Mushroom button
                PS.color(1, 13, {rgb: 0x8E4C11} );
                PS.border(1, 13, 1);
                PS.glyphColor(1, 13, PS.COLOR_BLACK);
                PS.glyph(1, 13, "M");
                PS.exec(1, 13, PIZZA.mushroom);

                // Anchovy button
                PS.color(1, 15, {rgb: 0xAA9690} );
                PS.border(1, 15, 1);
                PS.glyphColor(1, 15, PS.COLOR_BLACK);
                PS.glyph(1, 15, "A");
                PS.exec(1, 15, PIZZA.anchovy);

                // Hawaiian button
                PS.color(1, 17, {rgb: 0xF5A1BD} );
                PS.border(1, 17, 1);
                PS.glyphColor(1, 17, PS.COLOR_BLACK);
                PS.glyph(1, 17, "H");
                PS.exec(1, 17, PIZZA.hawaiian);

                // Clear button
                PS.color(17, 15, PS.COLOR_WHITE);
                PS.border(17, 15, 1);
                PS.glyphColor(17, 15, PS.COLOR_RED);
                PS.glyph(17, 15, "X");
                PS.exec(17, 15, PIZZA.clear);

                PIZZA.tutorial = 0;

            }

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

    // Set up the board

    var i = 0;
    var j = 0;

    PS.color(PS.ALL, PS.ALL, {rgb: PS.COLOR_GRAY_LIGHT});
    PS.border(PS.ALL, PS.ALL, 0);

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

    // Set up bad count
    for (i = 0; i < 3; i += 1) {
        PS.color(i, 2, {rgb: 0xB44646});
        PS.border(i, 2, 1);
    }

    // Set up good count
    for (i = 0; i < 15; i += 1) {
        PS.color(i+4, 2, {rgb: 0xA2A139});
        PS.border(i+4, 2, 1);
    }

    // Set title
    PS.statusColor( PS.COLOR_ORANGE );
    PS.statusText( "Pizza Maker Game" );

    // Load and lock audio files
    PS.audioLoad( "fx_squirp", { lock : true } );
    PS.audioLoad( "fx_wilhelm", { lock : true } );
    PS.audioLoad( "fx_ding", { lock : true } );
    PS.audioLoad( "fx_tada", { lock : true } );
    PS.audioLoad( "fx_shoot6", { lock : true } );
    PS.audioLoad( "fx_squish", { lock : true } );
    PS.audioLoad( "fx_tick", { lock : true } );
    PS.audioLoad( "fx_swoosh", { lock : true } );
    PS.audioLoad( "fx_click", { lock : true } );

    PIZZA.startTimer();

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

