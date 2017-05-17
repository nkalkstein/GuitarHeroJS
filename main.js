var game = new Phaser.Game(600, 800, Phaser.AUTO, 'TapTapGuitar', { preload: preload, create: create, update: update, render:render   });

function preload() {
	game.load.image('bg' , 'img/background2.2.png');
	game.load.image('blue_ball' , 'img/blue_ball.png');
	game.load.image('green_ball' , 'img/green_ball.png');
	game.load.image('red_ball' , 'img/red_ball.png');
	game.load.image('yellow_ball' , 'img/yellow_ball.png');
	game.load.audio('validate', 'sound/validate.wav');
	game.load.audio('miss', 'sound/miss.wav');

	
}

var score
var text
var Blue_button
var var_pop_time
var gameLoop
var velocity_all_ball
var highscore = 0;
var highScoreText = 0;


function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE); //ajout de la physique
	game.physics.arcade.gravity.y = 100;   

	game.add.sprite(0,0, 'bg');
	
	validate = game.add.audio('validate');
	miss = game.add.audio('miss');
	
	
	
	blue_ball_group = game.add.group();
	green_ball_group = game.add.group();
	red_ball_group = game.add.group();
	yellow_ball_group = game.add.group();
	
	var_pop_time = 800;
	
	gameLoop = game.time.events.loop(var_pop_time, crea_number_rand, this);

	velocity_all_ball = 300;
	
	
	niceText = game.add.text(230, 60, 'NICE !', {font: '50px Arial',fill: 'green'});
	goodText = game.add.text(230, 100, 'GOOD !', {font: '50px Arial',fill: 'yellow'});
	missText = game.add.text(230, 140, 'MISS !', {font: '50px Arial',fill: 'red'});
	
	niceText.visible = false;
	goodText.visible = false;
	missText.visible = false;
	
	
	score = 1;
	scoreText = game.add.text(215, 10 , 'Score :'+	score, {font: '40px Arial',fill: 'white'});
	
	blue_button= game.input.keyboard.addKey(Phaser.Keyboard.A);
	blue_button.onDown.add(addScoreBlue, this);
	
	green_button= game.input.keyboard.addKey(Phaser.Keyboard.Z);
	green_button.onDown.add(addScoreGreen, this);
	
	red_button= game.input.keyboard.addKey(Phaser.Keyboard.E);
	red_button.onDown.add(addScoreRed, this);
	
	yellow_button= game.input.keyboard.addKey(Phaser.Keyboard.R);
	yellow_button.onDown.add(addScoreYellow, this);
	
	highScoreText = this.game.add.text(10, 18, 'Best: ' + highscore, {font: '30px Arial', fill: 'white'});
	
	game.paused = true ; 
	start_game_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	start_game_key.onDown.add(gameStart, this);
	
	startText = game.add.text(2, 620, '-Press Space bar to start !-', {font: '50px Arial',fill: 'white'});
	
	gameOverText = game.add.text(30, 350, 'GAME OVER ', {font: '90px Arial',fill: 'white'});
	gameOverText.visible = false;
	
	
	restart_game_key = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	restart_game_key.onDown.add(gameRestart,this);
		
	restartText = game.add.text(2, 620, '-Press ENTER to restart !-', {font: '50px Arial',fill: 'white'});
	restartText.visible = false;
}

function gameStart() {
	if (score == 1)
	{
	startText.visible = true;
	setTimeout(function(){startText.visible = false;}, 400);
	game.paused = false ;
	}
	else 
	{ 
		startText.visible = false;
	}
}

function gameRestart(){
	
	if (restart_game_key.isDown)
	{
		game.paused = false;
		game.state.restart();
	}
}


function update() {
	if (blue_ball_group.length === 0)
	{
		//	nothing
	}else {
	
		if (blue_ball_group.getChildAt(0).y>800)
		{
			blue_ball_group.getChildAt(0).destroy();
			score-=1; 
			scoreText.setText('Score :' + score);
 			game.time.events.add(0, showMissText, this);
			miss.play();
			gameOverText.visible = true;
			game.paused = true;
			restartText.visible = true;
		}
	}
	
	if (green_ball_group.length === 0)
	{
		//	nothing
	}else {
		if (green_ball_group.getChildAt(0).y>800)
		{
			green_ball_group.getChildAt(0).destroy();
			score-=1; 
			scoreText.setText('Score :' + score);
			game.time.events.add(0, showMissText, this);
			miss.play();
			gameOverText.visible = true;
			game.paused = true;
			restartText.visible = true; 
		}
		
	
	}

	if (red_ball_group.length === 0)
	{
		//	nothing
	}else {
	
		if (red_ball_group.getChildAt(0).y>800)
		{
			red_ball_group.getChildAt(0).destroy();
			score-=1; 
			scoreText.setText('Score :' + score);
			game.time.events.add(0, showMissText, this);
			miss.play();
			gameOverText.visible = true;
			game.paused = true;
			restartText.visible = true; 
		}
		
	}

	if (yellow_ball_group.length === 0)
	{
		//	nothing
	}else {
	if (yellow_ball_group.getChildAt(0).y>800)
		{
			yellow_ball_group.getChildAt(0).destroy();
			score-=1; 
			scoreText.setText('Score :' + score);
			game.time.events.add(0, showMissText, this);
			miss.play();
			gameOverText.visible = true;
			game.paused = true;
			restartText.visible = true; 
		}
	}
	
	// +1point = -1 pop_time  and  +5points = -5 pop_time ( check function addScore for every ball)
	gameLoop.delay = var_pop_time;
	
	highScoreText.text = 'Best: ' + localStorage.getItem("highscore");
	if (score > localStorage.getItem("highscore")) 
    {
		localStorage.setItem("highscore", score);
    }
	
	
}
	
function addScoreBlue () {
	
	if (blue_ball_group.length === 0)
	{
		//	nothing
	}else {
		
		if (blue_ball_group.getChildAt(0).y>500&&blue_ball_group.getChildAt(0).y<600)
		{
			score+=1;
			blue_ball_group.getChildAt(0).destroy();
			scoreText.setText('Score :' + score);
			game.time.events.add(0, showGoodText, this);
			validate.play();
			var_pop_time -=1;
			velocity_all_ball += 10;
			
		}
		if (blue_ball_group.getChildAt(0).y>=600&&blue_ball_group.getChildAt(0).y<700)
		{
			score+=5; 
			blue_ball_group.getChildAt(0).destroy();	
			scoreText.setText('Score :' + score);
			game.time.events.add(0, showNiceText, this);
			validate.play();
			var_pop_time -=1;
			velocity_all_ball += 10;
		}	
		if (red_ball_group.getChildAt(0).y<500)
		{
			score -=1;
			scoreText.setText('Score :' + score);
		}
	
	}
}
	
function addScoreGreen () {
	if (green_ball_group.length === 0)
	{
		//	nothing
	}else {


		if (green_ball_group.getChildAt(0).y>500&&green_ball_group.getChildAt(0).y<600)
		{
			score+=1;
			green_ball_group.getChildAt(0).destroy();
			scoreText.setText('Score :' + score);
			game.time.events.add(0, showGoodText, this);
			var_pop_time -=1;
			velocity_all_ball += 10;
		}
		if (green_ball_group.getChildAt(0).y>=600&&green_ball_group.getChildAt(0).y<700)
		{
			score+=5; 
			green_ball_group.getChildAt(0).destroy();	
			scoreText.setText('Score :' + score);
			game.time.events.add(0, showNiceText, this);
			var_pop_time -=1;
			velocity_all_ball += 10;
		}	
		if (red_ball_group.getChildAt(0).y<500)
		{
			score -=1;
			scoreText.setText('Score :' + score);
			
		}
	}
}

function addScoreRed () {
	if (red_ball_group.length === 0)
	{
		//	nothing
	}else {

		if (red_ball_group.getChildAt(0).y>500&&red_ball_group.getChildAt(0).y<600)
		{
			score+=1;
			red_ball_group.getChildAt(0).destroy();
			scoreText.setText('Score :' + score);
			game.time.events.add(0, showGoodText, this);
			var_pop_time -=1;
			velocity_all_ball += 10;
		}
		if (red_ball_group.getChildAt(0).y>=600&&red_ball_group.getChildAt(0).y<700)
		{
			score+=5; 
			red_ball_group.getChildAt(0).destroy();	
			scoreText.setText('Score :' + score);
			game.time.events.add(0, showNiceText, this);
			var_pop_time -=1;
			velocity_all_ball += 10;
		}	
		if (red_ball_group.getChildAt(0).y<500)
		{
			score -=1;
			scoreText.setText('Score :' + score);
			
		}
	}
	
}

function addScoreYellow () {
	if (yellow_ball_group.length === 0)
	{
		//	nothing
	}else {

	
		if (yellow_ball_group.getChildAt(0).y>500&&yellow_ball_group.getChildAt(0).y<600)
		{
			score+=1;
			yellow_ball_group.getChildAt(0).destroy();
			scoreText.setText('Score :' + score);
			game.time.events.add(0, showGoodText, this);
			var_pop_time -=1;
			velocity_all_ball += 10;
		}
		if (yellow_ball_group.getChildAt(0).y>=600&&yellow_ball_group.getChildAt(0).y<700)
		{
			score+=5; 
			yellow_ball_group.getChildAt(0).destroy();	
			scoreText.setText('Score :' + score);
			game.time.events.add(0, showNiceText, this);
			var_pop_time -=1;
			velocity_all_ball += 10;
		}	
		if (red_ball_group.getChildAt(0).y<500)
		{
			score -=1;
			scoreText.setText('Score :' + score);
			
		}
	}
}

function showMissText() {
	missText.visible = true;
	setTimeout(function(){missText.visible = false;}, 600); 
}

function showNiceText() {
	niceText.visible = true;
	setTimeout(function(){niceText.visible = false;}, 600); 
}

function showGoodText() {
	goodText.visible = true;
	setTimeout(function(){goodText.visible = false;}, 600); 
}


var random_number
function crea_number_rand() {
	random_number = game.rnd.integerInRange(1, 4) ;
	if (random_number == 1)
	{
		crea_sprite_blue();
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

function crea_sprite_blue() {
	var blue_ball_rand = game.add.sprite(85, 50, 'blue_ball');
	blue_ball_rand.scale.setTo(1.5,1.5);
	game.physics.enable( [blue_ball_rand], Phaser.Physics.ARCADE);
	blue_ball_rand.body.velocity.y = velocity_all_ball;
	blue_ball_group.add(blue_ball_rand);
	
}

function crea_sprite_green() {
	var green_ball_rand = game.add.sprite(205, 50, 'green_ball');
	green_ball_rand.scale.setTo(1.5,1.5);
	game.physics.enable( [green_ball_rand], Phaser.Physics.ARCADE);
	green_ball_rand.body.velocity.y = velocity_all_ball;
	green_ball_group.add(green_ball_rand);
	
}

function crea_sprite_red() {
	var red_ball_rand = game.add.sprite(327, 50, 'red_ball');
	red_ball_rand.scale.setTo(1.5,1.5);
	game.physics.enable( [red_ball_rand], Phaser.Physics.ARCADE);
	red_ball_rand.body.velocity.y = velocity_all_ball;
	red_ball_group.add(red_ball_rand);
}

function crea_sprite_yellow() {
	var yellow_ball_rand = game.add.sprite(446, 50, 'yellow_ball');
	yellow_ball_rand.scale.setTo(1.5,1.5);
	game.physics.enable( [yellow_ball_rand], Phaser.Physics.ARCADE);
	yellow_ball_rand.body.velocity.y = velocity_all_ball;
	yellow_ball_group.add(yellow_ball_rand);
}


function render() {

    // debug info pour les boules

}

