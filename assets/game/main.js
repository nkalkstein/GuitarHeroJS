// TapTapGuitar by Yvain RAYNAUD and Clément COULON
// version: xx.xx date : xx/xx/xx


// initialisation of the phaser game instanses with diferent parameters : (width,height,rendering context, DOM ID, essential functions)

var game = new Phaser.Game(600, 800, Phaser.AUTO, 'TapTapGuitar', { preload: preload, create: create, update: update, render:render   });

						/* Preload function : loading diffenrents assets (images, sound etc) */

function preload() {
	game.load.image('bg' , 'assets/game/img/background.png');
	game.load.image('blue_ball' , 'assets/game/img/blue_ball.png');
	game.load.image('green_ball' , 'assets/game/img/green_ball.png');
	game.load.image('red_ball' , 'assets/game/img/red_ball.png');
	game.load.image('yellow_ball' , 'assets/game/img/yellow_ball.png');
	game.load.image('logo','assets/game/img/logo.png');
	
	game.load.audio('note1', 'assets/game/sound/Vocal 011.mp3');
	game.load.audio('note2', 'assets/game/sound/Vocal 012.mp3');
	game.load.audio('note3', 'assets/game/sound/Vocal 013.mp3');
	game.load.audio('note4', 'assets/game/sound/Vocal 014.mp3');
	game.load.audio('note5', 'assets/game/sound/Vocal 015.mp3');
	game.load.audio('note6', 'assets/game/sound/Vocal 016.mp3');
	game.load.audio('note7', 'assets/game/sound/Vocal 017.mp3');
	game.load.audio('note8', 'assets/game/sound/Vocal 018.mp3');
	game.load.audio('note9', 'assets/game/sound/Vocal 019.mp3');
	game.load.audio('note10', 'assets/game/sound/Vocal 020.mp3');
	game.load.audio('note11', 'assets/game/sound/Vocal 021.mp3');
}

						/* variables declaration and initialisation  */

var score
var var_pop_time  
var gameLoop
var velocity_all_ball  
var highscore = 0;  
var random_number

var music_note

						/* Create function : create differents sprite from assets */
function create() {
	
	score = 0;
	music_note = 0;
	
	var_pop_time = 800;	// set up the spawning time at 800ms
	velocity_all_ball =300; // set up velocity on y axis
	
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
	
	highScoreText = this.game.add.text(445, 15, 'HS : ' +highscore, {font: '40px Arial', fill: 'white'}); 
	
	niceText = game.add.text(230, 100, 'NICE !', {font: '50px Arial',fill: '#00FF21'});
	niceText.visible = false;
	
	logo = game.add.sprite(10,8, 'logo');
	logo.scale.setTo(0.30,0.30);  // size reduction
	
	game.sound.stopAll();  //stop all sound for the restart
	
	note11 = game.add.audio('note1');// audio added
	note12 = game.add.audio('note2');
	note13 = game.add.audio('note3');
	note14 = game.add.audio('note4');
	note15 = game.add.audio('note5');
	note16 = game.add.audio('note6');
	note17 = game.add.audio('note7');
	note18 = game.add.audio('note8');
	note19 = game.add.audio('note9');
	note20 = game.add.audio('note10');
	note21 = game.add.audio('note11');
	
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
			var_pop_time -=1; // define a new var_pop_time value (increasing the difficulty)
			velocity_all_ball +=20; // increase the velocity of each balls (increasing the difficulty)
			music_note +=1;	// compteur determine quelle note il faut joueur
			game_music(); //execute la fonction pour jouer la bonne note
			
		}
		if (blue_ball_group.getChildAt(0).y>=620&&blue_ball_group.getChildAt(0).y<670) // if ball is validated close to the validation bar  --> +5 point
		{
			score+=5; 
			blue_ball_group.getChildAt(0).destroy();
			scoreText.setText('score :' + score);
			game.time.events.add(0, showNiceText, this);  // call show text function 
			var_pop_time -=1;
			velocity_all_ball +=20;
			music_note +=1;
			game_music();
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
			velocity_all_ball +=20;
			music_note +=1;
			game_music();
		}
		if (green_ball_group.getChildAt(0).y>=620&&green_ball_group.getChildAt(0).y<670)
		{
			score+=5; 
			green_ball_group.getChildAt(0).destroy();	
			scoreText.setText('score :' + score);
			game.time.events.add(0, showNiceText, this);
			var_pop_time -=1;
			velocity_all_ball +=20;
			music_note +=1;
			game_music();
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
			velocity_all_ball +=20;
			music_note +=1;
			game_music();
		}
		if (red_ball_group.getChildAt(0).y>=620&&red_ball_group.getChildAt(0).y<670)
		{
			score+=5; 
			red_ball_group.getChildAt(0).destroy();	
			scoreText.setText('score :' + score);
			game.time.events.add(0, showNiceText, this);
			var_pop_time -=1;
			velocity_all_ball +=20;
			music_note +=1;
			game_music();
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
			velocity_all_ball +=20;
			music_note +=1;
			game_music();
		}
		if (yellow_ball_group.getChildAt(0).y>=620&&yellow_ball_group.getChildAt(0).y<670)
		{
			score+=5; 
			yellow_ball_group.getChildAt(0).destroy();	
			scoreText.setText('score :' + score);
			game.time.events.add(0, showNiceText, this);
			var_pop_time -=1;
			velocity_all_ball +=20;
			music_note +=1;
			game_music();
		}	
		if (yellow_ball_group.getChildAt(0).y<500)
		{
			score -=1;
			scoreText.setText('score :' + score);

			
		}
	}
}


function game_music() {
	if (music_note == 1){note11.play();}	//music pattern 
	if (music_note == 2){note12.play();}
	if (music_note == 3){note13.play();}
	if (music_note == 4){note14.play();}
	if (music_note == 5){note12.play();}
	if (music_note == 6){note15.play();}
	if (music_note == 7){note11.play();}
	if (music_note == 8){note12.play();}
	if (music_note == 9){note13.play();}
	if (music_note == 10){note14.play();}
	if (music_note == 11){note12.play();}
	if (music_note == 12){note15.play();}
	if (music_note == 13){note11.play();}
	if (music_note == 14){note12.play();}
	if (music_note == 15){note13.play();}
	if (music_note == 16){note14.play();}
	if (music_note == 17){note12.play();}
	if (music_note == 18){note15.play();}
	
	if (music_note == 19){note19.play();}	
	if (music_note == 20){note12.play();}
	if (music_note == 21){note13.play();}
	if (music_note == 22){note14.play();}
	if (music_note == 23){note12.play();}
	if (music_note == 24){note16.play();}
	if (music_note == 25){note19.play();}
	if (music_note == 26){note16.play();}
	if (music_note == 27){note19.play();}
	if (music_note == 28){note16.play();}
	if (music_note == 29){note14.play();}
	if (music_note == 30){note12.play();}
	if (music_note == 31){note13.play();}
	if (music_note == 32){note14.play();}
	if (music_note == 33){note16.play();}
	if (music_note == 34){note15.play();}
	if (music_note == 35){note11.play();}
	if (music_note == 36){note17.play();}
	if (music_note == 25){note18.play();}
	if (music_note == 25){note19.play();}
	if (music_note == 25){note12.play();}
	if (music_note == 25){note13.play();}
	if (music_note == 25){note14.play();}
	if (music_note == 25){note12.play();}
	if (music_note == 25){note16.play();}

	
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

