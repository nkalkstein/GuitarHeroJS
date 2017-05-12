var game = new Phaser.Game(600, 800, Phaser.AUTO, 'GuitarHeroJSGame', { preload: preload, create: create, update: update, render:render   });

function preload() {
	game.load.image('bg' , 'img/background.png');
	game.load.image('blue_ball' , 'img/blue_ball.png');
	game.load.image('green_ball' , 'img/green_ball.png');
	game.load.image('red_ball' , 'img/red_ball.png');
	game.load.image('yellow_ball' , 'img/yellow_ball.png');
	game.load.audio('validate', 'sound/validate.wav');
	
}
var point_test
var score
var bouleblueKey
var text
var Blue_button
var var_pop_time
function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE); //ajout de la physique
	game.physics.arcade.gravity.y = 100;   

	game.add.sprite(0,0, 'bg');
	
	validate = game.add.audio('validate');
	
	text = game.add.text(game.world.centerX, game.world.centerY, 'test :');
	
	blue_ball_group = game.add.group();
	green_ball_group = game.add.group();
	red_ball_group = game.add.group();
	yellow_ball_group = game.add.group();
	
	
	crea_sprite_blue();
	crea_sprite_green();
	crea_sprite_red();
	crea_sprite_yellow();
	
	var var_pop_time = 500
	var_pop_timeText = game.add.text(game.world.centerX-250, game.world.centerY, 'poptime :', + var_pop_time);
	game.time.events.loop(5, crea_number_rand, this);
	var_pop_timeText.setText('poptime:' + var_pop_time);
	
	score = 1;
	scoreText = game.add.text(game.world.centerX, game.world.centerY-50, 'score :'+	score);
	
	blue_button= game.input.keyboard.addKey(Phaser.Keyboard.A);
	blue_button.onDown.add(addScoreBlue, this);
	
	green_button= game.input.keyboard.addKey(Phaser.Keyboard.Z);
	green_button.onDown.add(addScoreGreen, this);
	
	red_button= game.input.keyboard.addKey(Phaser.Keyboard.E);
	red_button.onDown.add(addScoreRed, this);
	
	yellow_button= game.input.keyboard.addKey(Phaser.Keyboard.R);
	yellow_button.onDown.add(addScoreYellow, this);
	
	
}

function addScoreBlue () {
	if (blue_ball_group.getChildAt(0).y>500&&blue_ball_group.getChildAt(0).y<600)
	{
		score+=1;
		blue_ball_group.getChildAt(0).destroy();
		scoreText.setText('score :' + score);
		validate.play();
	}
	if (blue_ball_group.getChildAt(0).y>=600&&blue_ball_group.getChildAt(0).y<700)
	{
		score+=5; 
		blue_ball_group.getChildAt(0).destroy();	
		scoreText.setText('score :' + score);
		validate.play();
	}	
}

function addScoreGreen () {
	if (green_ball_group.getChildAt(0).y>500&&green_ball_group.getChildAt(0).y<600)
	{
		score+=1;
		green_ball_group.getChildAt(0).destroy();
		scoreText.setText('score :' + score);
	}
	if (green_ball_group.getChildAt(0).y>=600&&green_ball_group.getChildAt(0).y<700)
	{
		score+=5; 
		green_ball_group.getChildAt(0).destroy();	
		scoreText.setText('score :' + score);
	}	
}

function addScoreRed () {
	if (red_ball_group.getChildAt(0).y>500&&red_ball_group.getChildAt(0).y<600)
	{
		score+=1;
		red_ball_group.getChildAt(0).destroy();
		scoreText.setText('score :' + score);
	}
	if (red_ball_group.getChildAt(0).y>=600&&red_ball_group.getChildAt(0).y<700)
	{
		score+=5; 
		red_ball_group.getChildAt(0).destroy();	
		scoreText.setText('score :' + score);
	}	
}

function addScoreYellow () {
	if (yellow_ball_group.getChildAt(0).y>500&&yellow_ball_group.getChildAt(0).y<600)
	{
		score+=1;
		yellow_ball_group.getChildAt(0).destroy();
		scoreText.setText('score :' + score);
	}
	if (yellow_ball_group.getChildAt(0).y>=600&&yellow_ball_group.getChildAt(0).y<700)
	{
		score+=5; 
		yellow_ball_group.getChildAt(0).destroy();	
		scoreText.setText('score :' + score);
	}	
}

function update() {
	
	if (blue_ball_group.getChildAt(0).y>800)
	{
		blue_ball_group.getChildAt(0).destroy();
		score-=1; 
		scoreText.setText('score :' + score);
	
	}
	if (green_ball_group.getChildAt(0).y>800)
	{
		green_ball_group.getChildAt(0).destroy();
		score-=1; 
		scoreText.setText('score :' + score);
	
	}
	if (red_ball_group.getChildAt(0).y>800)
	{
		red_ball_group.getChildAt(0).destroy();
		score-=1; 
		scoreText.setText('score :' + score);
	
	}
	if (yellow_ball_group.getChildAt(0).y>800)
	{
		yellow_ball_group.getChildAt(0).destroy();
		score-=1; 
		scoreText.setText('score :' + score);
	}
	if (score > 10) {
		var_pop_time = 5;
		var_pop_timeText.setText('poptime:' + var_pop_time);

	}
	
}
	




var random_number
function crea_number_rand() {
	random_number = game.rnd.integerInRange(1, 4) ;
	text.setText('test :' + random_number);
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
	var blue_ball_rand = game.add.sprite(82, -6000, 'blue_ball');
	blue_ball_rand.scale.setTo(1.5,1.5);
	game.physics.enable( [blue_ball_rand], Phaser.Physics.ARCADE);
	blue_ball_rand.body.gravity.y=6;
	blue_ball_group.add(blue_ball_rand);
	
	
}

function crea_sprite_green() {
	var green_ball_rand = game.add.sprite(205, -6000, 'green_ball');
	green_ball_rand.scale.setTo(1.5,1.5);
	game.physics.enable( [green_ball_rand], Phaser.Physics.ARCADE);
	green_ball_rand.body.gravity.y=6;
	green_ball_group.add(green_ball_rand);
	
}

function crea_sprite_red() {
	var red_ball_rand = game.add.sprite(328, -6000, 'red_ball');
	red_ball_rand.scale.setTo(1.5,1.5);
	game.physics.enable( [red_ball_rand], Phaser.Physics.ARCADE);
	red_ball_rand.body.gravity.y=6;
	red_ball_group.add(red_ball_rand);
}

function crea_sprite_yellow() {
	var yellow_ball_rand = game.add.sprite(450, -6000, 'yellow_ball');
	yellow_ball_rand.scale.setTo(1.5,1.5);
	game.physics.enable( [yellow_ball_rand], Phaser.Physics.ARCADE);
	yellow_ball_rand.body.gravity.y=6;
	yellow_ball_group.add(yellow_ball_rand);
}


function render() {

    // debug info pour les boules
   game.debug.spriteInfo(blue_ball_group.getChildAt(0), 32, 32);
	
	console.log(var_pop_time); 

}
