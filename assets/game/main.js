// TapTapGuitar by Yvain RAYNAUD and Clément COULON
// version: xx.xx date : xx/xx/xx


// initialisation of the phaser game instanses with diferent parameters : (width,height,rendering context, DOM ID, essential functions)

var game = new Phaser.Game(600, 800, Phaser.AUTO, 'TapTapGuitar', { preload: preload, create: create, update: update, render:render   });

						/* Preload function : loading diffenrents assets (images, sound etc) */

function preload() {
	game.load.image('bg' , 'game/img/background.png');
	game.load.image('blue_ball' , 'game/img/blue_ball.png');
	game.load.image('green_ball' , 'game/img/green_ball.png');
	game.load.image('red_ball' , 'game/img/red_ball.png');
	game.load.image('yellow_ball' , 'game/img/yellow_ball.png');
	game.load.audio('validate', 'game/sound/validate.wav');


}

						/* variables declaration and initialisation  */

var score = 0;
var var_pop_time = 800;  // set up the spawning time at 800ms
var gameLoop
var velocity_all_ball =300; // set up velocity on y axis 
var highscore = 0;  
var random_number

						/* Create function : create differents sprite from assets */
function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE); // physics that allow all sprite to interest with the environnement 
  
	game.add.sprite(0,0, 'bg'); // setting up the background image
	
	game.paused = true ; 
	
	start_game_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);  // adding space bar key
	start_game_key.onDown.add(gameStart, this);  // when spacebar is down this lanch the fonction gameStart
	startText = game.add.text(25, 600, 'Press <SPACE> to play !', {font: '50px Arial',fill: 'white'});
	
	gameOverText = game.add.text(25, 350, 'GAME OVER ', {font: '90px Arial',fill: 'white'});
	gameOverText.visible = false;
	
	restart_game_key = game.input.keyboard.addKey(Phaser.Keyboard.ENTER); //adding enter key
	restart_game_key.onDown.add(gameRestart,this);  // when enter is down this lanch the fonction gameRestart
	restartText = game.add.text(8, 600, 'Press <ENTER> to restart !', {font: '50px Arial',fill: 'white'});
	restartText.visible = false;
	
	/* setting up S,D,F,G key for AZERTY and QWERTY user */
	blue_button= game.input.keyboard.addKey(Phaser.Keyboard.S);
	blue_button.onDown.add(addScoreBlue, this); 
	
	green_button= game.input.keyboard.addKey(Phaser.Keyboard.D);
	green_button.onDown.add(addScoreGreen, this);
	
	red_button= game.input.keyboard.addKey(Phaser.Keyboard.F);
	red_button.onDown.add(addScoreRed, this);
	
	yellow_button= game.input.keyboard.addKey(Phaser.Keyboard.G);
	yellow_button.onDown.add(addScoreYellow, this);
	
	/* All ball added in a group  */
	blue_ball_group = game.add.group();
	green_ball_group = game.add.group();
	red_ball_group = game.add.group();
	yellow_ball_group = game.add.group();
	
	gameLoop = game.time.events.loop(var_pop_time, crea_number_rand, this); // each 'var_pop_time' ms starting the crea_number_rand function 

	scoreText = game.add.text(215, 12 , 'score : '+	score, {font: '40px Arial',fill: 'white'}); 
	
	highScoreText = this.game.add.text(450, 15, 'HS : ' + highscore, {font: '40px Arial', fill: 'white'}); 
	
	niceText = game.add.text(230, 100, 'NICE !', {font: '50px Arial',fill: '#00FF21'});
	niceText.visible = false;
	
	validate = game.add.audio('validate'); // audio added 

}

						/* update function is called at every frame (~60x/second), main porte of the game*/

function update() {
	
	// these 4 following conditions are the same but for different group of colour
	
	if (blue_ball_group.length === 0)  // check is blue_ball_group.child exist
	{
		// do nothing
	}else {
	
		if (blue_ball_group.getChildAt(0).y>800) // check if blue_ball_group.child is out of lower edge
		{
			blue_ball_group.getChildAt(0).destroy();
			gameOverText.visible = true; // add game over text
			game.paused = true; // pause the game
			restartText.visible = true; // add restart text
		}
	}
	
	if (green_ball_group.length === 0)
	{
		//	do nothing
	}else {
		if (green_ball_group.getChildAt(0).y>800)
		{
			green_ball_group.getChildAt(0).destroy();
			gameOverText.visible = true;
			game.paused = true;
			restartText.visible = true; 
		}
		
	
	}

	if (red_ball_group.length === 0)
	{
		//	do nothing
	}else {
	
		if (red_ball_group.getChildAt(0).y>800)
		{
			red_ball_group.getChildAt(0).destroy();
			gameOverText.visible = true;
			game.paused = true;
			restartText.visible = true; 
		}
		
	}

	if (yellow_ball_group.length === 0)
	{
		//	do nothing
	}else {
	if (yellow_ball_group.getChildAt(0).y>800)
		{
			yellow_ball_group.getChildAt(0).destroy();
			gameOverText.visible = true;
			game.paused = true;
			restartText.visible = true; 
		}
	}


	/* store Highscore in localstorage (in the browser) */
	
	highScoreText.text = 'HS : ' + localStorage.getItem("highscore");
	if (score > localStorage.getItem("highscore")) 
    {
		localStorage.setItem("highscore", score);
    }
	
	gameLoop.delay = var_pop_time; // update 60 times per second the var_pop_time variable

	
}
	

							/* Different functions used in the game (increased score, check position etc)*/


function crea_number_rand() {
	random_number = game.rnd.integerInRange(1, 4) ; // create integer in (1,4) range
	if (random_number == 1)
	{
		crea_sprite_blue(); // call the crea_sprite_blue function
	}
	if (random_number == 2)
	{
		crea_sprite_green();
	}
	if (random_number == 3)
	{
		crea_sprite_red();
	}
	if (random_number == 4)
	{
		crea_sprite_yellow();
	}
}

// these 4 following conditions are the same (except the coordinates) but for different group of colour

function crea_sprite_blue() {
	var blue_ball_rand = game.add.sprite(83, 50, 'blue_ball'); // create sprite named 'blue_ball" at (x,y)
	game.physics.enable( [blue_ball_rand], Phaser.Physics.ARCADE); // setting up Physics on this ball
	blue_ball_rand.body.velocity.y = velocity_all_ball; // setting up velocity at velocity_all_ball
	blue_ball_group.add(blue_ball_rand); // add the ball to the blue_ball_group 
	
}

function crea_sprite_green() {
	var green_ball_rand = game.add.sprite(203, 50, 'green_ball');

	game.physics.enable( [green_ball_rand], Phaser.Physics.ARCADE);
	green_ball_rand.body.velocity.y = velocity_all_ball;
	green_ball_group.add(green_ball_rand);
	
}

function crea_sprite_red() {
	var red_ball_rand = game.add.sprite(323, 50, 'red_ball');

	game.physics.enable( [red_ball_rand], Phaser.Physics.ARCADE);
	red_ball_rand.body.velocity.y = velocity_all_ball;
	red_ball_group.add(red_ball_rand);
}

function crea_sprite_yellow() {
	var yellow_ball_rand = game.add.sprite(443, 50, 'yellow_ball');
	game.physics.enable( [yellow_ball_rand], Phaser.Physics.ARCADE);
	yellow_ball_rand.body.velocity.y = velocity_all_ball;
	yellow_ball_group.add(yellow_ball_rand);
}

	// these 4 following conditions are the same but for different group of colour
function addScoreBlue () {
	
	if (blue_ball_group.length === 0) // check if any child exist
	{
		//	nothing
	}else {
		 // check coordinates of the first child to increase the score
		if (blue_ball_group.getChildAt(0).y>500&&blue_ball_group.getChildAt(0).y<620) // if ball is validated not so close the validation bar --> +1 point
		{
			score+=1; // increase score
			blue_ball_group.getChildAt(0).destroy(); // kill child
			scoreText.setText('score :' + score); //update score text
			validate.play(); 
			var_pop_time -=1; // define a new var_pop_time value (increasing the difficulty)
			velocity_all_ball += 10; // increase the velocity of each balls (increasing the difficulty)
			
		}
		if (blue_ball_group.getChildAt(0).y>=620&&blue_ball_group.getChildAt(0).y<670) // if ball is validated close to the validation bar  --> +5 point
		{
			score+=5; 
			blue_ball_group.getChildAt(0).destroy();
			scoreText.setText('score :' + score);
			game.time.events.add(0, showNiceText, this);  // call show text function 
			validate.play();
			var_pop_time -=1;
			velocity_all_ball += 10;
		}	
		if (blue_ball_group.getChildAt(0).y<500)
		{
			score -=1;
			scoreText.setText('score :' + score);
		}
	
	}
}
	
function addScoreGreen () {
	if (green_ball_group.length === 0)
	{
		//	nothing
	}else {


		if (green_ball_group.getChildAt(0).y>500&&green_ball_group.getChildAt(0).y<620)
		{
			score+=1;
			green_ball_group.getChildAt(0).destroy();
			scoreText.setText('score :' + score);
			var_pop_time -=1;
			velocity_all_ball += 10;
		}
		if (green_ball_group.getChildAt(0).y>=620&&green_ball_group.getChildAt(0).y<670)
		{
			score+=5; 
			green_ball_group.getChildAt(0).destroy();	
			scoreText.setText('score :' + score);
			game.time.events.add(0, showNiceText, this);
			var_pop_time -=1;
			velocity_all_ball += 10;
		}	
		if (green_ball_group.getChildAt(0).y<500)
		{
			score -=1;
			scoreText.setText('score :' + score);

			
		}
	}
}

function addScoreRed () {
	if (red_ball_group.length === 0)
	{
		//	nothing
	}else {

		if (red_ball_group.getChildAt(0).y>500&&red_ball_group.getChildAt(0).y<620)
		{
			score+=1;
			red_ball_group.getChildAt(0).destroy();
			scoreText.setText('score :' + score);
			var_pop_time -=1;
			velocity_all_ball += 10;
		}
		if (red_ball_group.getChildAt(0).y>=620&&red_ball_group.getChildAt(0).y<670)
		{
			score+=5; 
			red_ball_group.getChildAt(0).destroy();	
			scoreText.setText('score :' + score);
			game.time.events.add(0, showNiceText, this);
			var_pop_time -=1;
			velocity_all_ball += 10;
		}	
		if (red_ball_group.getChildAt(0).y<500)
		{
			score -=1;
			scoreText.setText('score :' + score);

			
		}
	}
	
}

function addScoreYellow () {
	if (yellow_ball_group.length === 0)
	{
		//	nothing
	}else {

	
		if (yellow_ball_group.getChildAt(0).y>500&&yellow_ball_group.getChildAt(0).y<620)
		{
			score+=1;
			yellow_ball_group.getChildAt(0).destroy();
			scoreText.setText('score :' + score);
		
			var_pop_time -=1;
			velocity_all_ball += 10;
		}
		if (yellow_ball_group.getChildAt(0).y>=620&&yellow_ball_group.getChildAt(0).y<670)
		{
			score+=5; 
			yellow_ball_group.getChildAt(0).destroy();	
			scoreText.setText('score :' + score);
			game.time.events.add(0, showNiceText, this);
			var_pop_time -=1;
			velocity_all_ball += 10;
		}	
		if (yellow_ball_group.getChildAt(0).y<500)
		{
			score -=1;
			scoreText.setText('score :' + score);

			
		}
	}
}



function showNiceText() {
	niceText.visible = true;  // show 'NICE !' text
 	setTimeout(function(){niceText.visible = false;}, 600);  // 'NICE !' text disapear 600ms later 
}


//function to start the game 
function gameStart() {
	
	if (score == 0)
	{
	startText.visible = true; // show startText 
	setTimeout(function(){startText.visible = false;}, 400);  // startText disapear 400ms later
	game.paused = false ; 
	}
	else  
	{ 
		startText.visible = false;  
	}
}

// function to restart the game
function gameRestart(){
	
	if (restart_game_key.isDown)  
	{
		game.paused = false;
		game.state.restart();  // restart all function 
	}
}


								/* render debug info */
function render() {
 
}

