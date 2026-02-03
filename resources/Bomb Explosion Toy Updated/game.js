/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)
*/

"use strict"; // Do NOT remove this directive!

var BOMB = {

	// CONSTANTS
	WIDTH: 18, // width of grid
	HEIGHT: 19, // height of grid
	FRAME_RATE: 6,	// frame rate

	// VARIABLES

	// These two arrays store the X and Y positions of active explosions

	explosionX: [],
	explosionY: [],

	// This holds the bomb selection

	selectBomb: 1,

	// FUNCTIONS

	// BOMB.tick()
	// Called on every clock tick
	// Used to animate the bomb explosions

	tick : function () {
		"use strict";
		var len, i, x, y, select;

		len = BOMB.explosionX.length; // number of explosions
		select = BOMB.selectBomb;

		// Loop through each active explosion
		i = 0;
		while ( i < len )
		{
			// get current position of explosion
			x = BOMB.explosionX[ i ];
			y = BOMB.explosionY[ i ];

				// update its x and y position in the array
				BOMB.explosionX[i] = x;
				BOMB.explosionY[i] = y;

				// Repaint the explosion
				if (select == 1) {
					PS.color(x, y, PS.COLOR_YELLOW);
				}
				else if (select == 2) {
					PS.color(x, y, PS.COLOR_YELLOW);
					PS.color(x, y + 1, PS.COLOR_YELLOW);
					PS.color(x, y - 1, PS.COLOR_YELLOW);
					PS.color(x + 1, y, PS.COLOR_YELLOW);
					PS.color(x - 1, y, PS.COLOR_YELLOW);
				}
				else if (select == 3) {
					PS.color(x, y, PS.COLOR_ORANGE);
					PS.color(x, y + 1, PS.COLOR_ORANGE);
					PS.color(x, y - 1, PS.COLOR_ORANGE);
					PS.color(x + 1, y, PS.COLOR_ORANGE);
					PS.color(x - 1, y, PS.COLOR_ORANGE);
					PS.color(x, y - 2, PS.COLOR_YELLOW);
					PS.color(x, y + 2, PS.COLOR_YELLOW);
					PS.color(x + 2, y, PS.COLOR_YELLOW);
					PS.color(x - 2, y, PS.COLOR_YELLOW);
					PS.color(x + 1, y + 1, PS.COLOR_YELLOW);
					PS.color(x - 1, y + 1, PS.COLOR_YELLOW);
					PS.color(x + 1, y - 1, PS.COLOR_YELLOW);
					PS.color(x - 1, y - 1, PS.COLOR_YELLOW);
				}
				else {
					PS.color(x, y, PS.COLOR_RED);
				}

				BOMB.explosionX.splice( i, 1 );
				BOMB.explosionY.splice( i, 1 );

				len -= 1;

		}

		BOMB.border();

	},

	randomSound : function () {
		var randomNumber;
		randomNumber = Math.floor(Math.random() * 4) + 1;

		switch (randomNumber) {
			case 1:
				PS.audioPlay( "fx_blast1" );
				break;
			case 2:
				PS.audioPlay( "fx_blast2" );
				break;
			case 3:
				PS.audioPlay( "fx_blast3" );
				break;
			case 4:
				PS.audioPlay( "fx_blast4" );
				break;
			default:
				PS.audioPlay( "fx_rip" );
		}
	},

	// BOMB.reset ()
	// Clears the canvas, except the borders

	reset : function () {
		"use strict";
		var i, j;
		
		for ( i = 0; i < 14 ; i += 1 )	{
			for ( j = 0; j < 14 ; j += 1 ) {
				PS.color(j + 2, i + 2, {rgb: 0x90ee90});
			}
		}
		PS.audioPlay( "fx_swoosh" );
	},

	// BOMB.bomb# ()
	// Changes the bombs you use

	bombOne : function () {
		BOMB.selectBomb = 1;
		PS.audioPlay( "fx_powerup3" );
	},

	bombTwo : function () {
		BOMB.selectBomb = 2;
		PS.audioPlay( "fx_powerup5" );
	},

	bombThree : function () {
		BOMB.selectBomb = 3;
		PS.audioPlay( "fx_powerup8" );
	},

	// BOMB.border ()
	// Adds the border so the explosion doesn't go off the field

	border : function () {
	var i = 0;
	for (i = 0; i < 16; i += 1) {
		PS.color( i, 16, PS.COLOR_WHITE );
		PS.border( i, 16, 0 );
	}

	var i = 0;
	for (i = 0; i < 16; i += 1) {
		PS.color( i, 17, PS.COLOR_WHITE );
		PS.border( i, 17, 0 );
	}

	var i = 0;
	for (i = 0; i < 16; i += 1) {
		PS.color( i, 0, PS.COLOR_WHITE );
		PS.border( i, 0, 0 );
	}
	var i = 0;
	for (i = 0; i < 16; i += 1) {
		PS.color( i, 1, PS.COLOR_WHITE );
		PS.border( i, 1, 0 );
	}

	PS.color( 16, 16, PS.COLOR_WHITE )
	PS.border( 16, 16, 0 );

	var i = 0;
	for (i = 0; i < 16; i += 1) {
		PS.color( 16, i, PS.COLOR_WHITE );
		PS.border( 16, i, 0 );
	}

	var i = 0;
	for (i = 0; i < 16; i += 1) {
		PS.color( 17, i, PS.COLOR_WHITE );
		PS.border( 17, i, 0 );
	}

	var i = 0;
	for (i = 0; i < 16; i += 1) {
		PS.color( 0, i, PS.COLOR_WHITE );
		PS.border( 0, i, 0 );
	}

	var i = 0;
	for (i = 0; i < 16; i += 1) {
		PS.color( 1, i, PS.COLOR_WHITE );
		PS.border( 1, i, 0 );
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
	PS.gridSize( BOMB.WIDTH, BOMB.HEIGHT );

	// Load and lock audio files

	PS.audioLoad( "fx_blast1", { lock : true } );
	PS.audioLoad( "fx_blast2", { lock : true } );
	PS.audioLoad( "fx_blast3", { lock : true } );
	PS.audioLoad( "fx_blast4", { lock : true } );

	// Set title
	PS.statusColor( PS.COLOR_RED );
	PS.statusText( "Bomb Explosion Toy" );
	
	// Start the animation timer
	PS.timerStart( BOMB.FRAME_RATE, BOMB.tick );


	// Set up the field
	var i = 0;
	var j = 0;

	PS.color( PS.ALL, PS.ALL, { rgb : PS.COLOR_WHITE } );
	PS.border( PS.ALL, PS.ALL, 0 );

	for (i = 0; i < 14; i += 1) {
		for (j = 0; j < 14; j += 1) {
			PS.color(i+2, j+2, {rgb: 0x90ee90});
			PS.border( i+2, j+2, 1 );
		}
	}

	// Set up the Buttons

	// Reset
	PS.color( 15, 18, {rgb: 0xe1e1e1} );
	PS.border( 15, 18, 1 );
	PS.glyphColor( 15, 18, PS.COLOR_BLACK );
	PS.glyph( 15, 18, "X" );
	PS.exec( 15, 18, BOMB.reset );

	// Bomb One
	PS.color( 2, 18, {rgb: 0xfffb97} );
	PS.border( 2, 18, 1 );
	PS.glyphColor( 2, 18, PS.COLOR_BLACK );
	PS.glyph( 2, 18, "1" );
	PS.exec( 2, 18, BOMB.bombOne );

	// Bomb Two
	PS.color( 4, 18, {rgb: 0xffda00} );
	PS.border( 4, 18, 1 );
	PS.glyphColor( 4, 18, PS.COLOR_BLACK );
	PS.glyph( 4, 18, "2" );
	PS.exec( 4, 18, BOMB.bombTwo );

	// Bomb Three
	PS.color( 6, 18, {rgb: 0xff5700} );
	PS.border( 6, 18, 1 );
	PS.glyphColor( 6, 18, PS.COLOR_BLACK );
	PS.glyph( 6, 18, "3" );
	PS.exec( 6, 18, BOMB.bombThree );

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

	// If bomb is the field, set a bomb
	if ( y < 16 && y > 1 && x < 16 && x > 1) {

		BOMB.explosionX.push(x);
		BOMB.explosionY.push(y);

		PS.color(x, y, PS.COLOR_RED); // set the color

		BOMB.randomSound();
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

