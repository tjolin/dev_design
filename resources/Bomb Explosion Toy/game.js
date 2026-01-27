/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)
*/

"use strict"; // Do NOT remove this directive!

var BOMB = {

	// CONSTANTS
	WIDTH: 20, // width of grid
	HEIGHT: 20, // height of grid
	FRAME_RATE: 6,	// frame rate

	// VARIABLES

	// These two arrays store the X and Y positions of active explosions

	explosionX: [],
	explosionY: [],

	// FUNCTIONS

	// BOMB.tick()
	// Called on every clock tick
	// Used to animate the bomb explosions

	tick : function () {
		"use strict";
		var len, i, x, y;

		len = BOMB.explosionX.length; // number of explosions

		// Loop through each active explosion
		i = 0;
		while ( i < len )
		{
			// get current position of explosion
			x = BOMB.explosionX[ i ];
			y = BOMB.explosionY[ i ];

			// If bomb is above last row, erase it and redraw it (WORK IN PROGRESS)
			if ( y < BOMB.WIDTH ) {

				// erase the existing explosion
				PS.color(x, y, PS.COLOR_ORANGE);

				// add 1 to y position
				y += 1;
				x += 1;
				y -= 1;
				x -= 1;

				// update its x and y position in the array
				BOMB.explosionX[i] = x;
				BOMB.explosionY[i] = y;

				// Has explosion reached the border yet?
				if (y < BOMB.WIDTH) // nope
				{
					// Repaint the explosion
					PS.color(x, y, PS.COLOR_YELLOW);
				}

				// Explosion has reached bottom
				else {
					PS.color(x, y, PS.COLOR_GRAY);
				}

				// point index to next explosion
				i += 1;
			}

			else
			{
				BOMB.explosionX.splice( i, 1 );
				BOMB.explosionY.splice( i, 1 );

				// Arrays are now one element smaller, so update the array length variable
				// But leave the index variable [i] alone!
				// It's already pointing at the next explosion

				len -= 1;
			}


		}
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
	PS.gridSize( BOMB.HEIGHT, BOMB.WIDTH );

	// Set the color of the "board"
	PS.color( PS.ALL, PS.ALL, PS.COLOR_GREEN );

	// Add fader FX to bottom row only
	// This makes the beads flash white when they "splash"
	//PS.fade( PS.ALL, BOMB.HEIGHT, BOMB.WIDTH, { rgb : PS.COLOR_WHITE } );

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

	// If drop is above bottom row, start a drop

		BOMB.explosionX.push( x );
		BOMB.explosionY.push( y );

		PS.color( x, y, PS.COLOR_RED ); // set the color

		BOMB.randomSound();

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

