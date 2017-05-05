var game = new Phaser.Game(600, 800, Phaser.AUTO, 'GuitarHeroJSGame', { preload: preload, create: create, update: update, render:render   });

function preload() {
	game.load.image('bg' , 'img/background.png');
	game.load.image('boule_bleu' , 'img/boule_bleu3.png');
	game.load.image('boule_verte' , 'img/boule_vert3.png');
	game.load.image('boule_rouge' , 'img/boule_rouge3.png');
	game.load.image('boule_jaune' , 'img/boule_jaune3.png');
	game.load.image('point_test' , 'img/sprite_test.png');
}



var point_test
var score
var bouleBleuKey

var text
var Blue_button

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE); //ajout de la physique
	game.physics.arcade.gravity.y = 100;   

	game.add.sprite(0,0, 'bg');
	
	game.add.sprite(115,644, 'point_test'); //--> ajout d'un nouveau sprite pour mesurer la distance entre ce sprite et la boule bleu
	
	text = game.add.text(game.world.centerX, game.world.centerY, 'test :');
	
	master_group = game.add.group();
	
	blue_boule_group = game.add.group();
	green_boule_group = game.add.group();
	red_boule_group = game.add.group();
	yellow_boule_group = game.add.group();
	
	
	
	crea_sprite_bleu();
	
	game.time.events.loop(1000, crea_nombre_rand, this);
	
	score = 1;
	scoreText = game.add.text(game.world.centerX, game.world.centerY-50, 'score :'+	score);
	
	Blue_button= game.input.keyboard.addKey(Phaser.Keyboard.A);
	Blue_button.onDown.add(addScoreBlue, this);
	
	
}

function addScoreBlue () {
	if (blue_boule_group.getChildAt(0).y>500&&blue_boule_group.getChildAt(0).y<600)
	{
			score+=1;
			blue_boule_group.getChildAt(0).destroy();
			scoreText.setText('score :' + score);
	}
	if (blue_boule_group.getChildAt(0).y>=600&&blue_boule_group.getChildAt(0).y<700)
	{
		score+=5; 
		blue_boule_group.getChildAt(0).destroy();	
		scoreText.setText('score :' + score);
	}	
}

function update() {
	if (blue_boule_group.getChildAt(0).y>800)
	{
		blue_boule_group.getChildAt(0).destroy();
		score-=1; 
		scoreText.setText('score :' + score);
	
	}
}
var random_number
function crea_nombre_rand() {
	random_number = game.rnd.integerInRange(1, 2) ;
	text.setText('test :' + random_number);
	if (random_number == 1)
	{
		crea_sprite_bleu();
	}
	if (random_number == 2)
	{
		crea_sprite_verte();
	}
	if (random_number == 3)
	{
		crea_sprite_rouge();
	}
	if (random_number == 4)
	{
		crea_sprite_jaune();
	}
}

function crea_sprite_bleu() {
	var boule_bleu_rand = game.add.sprite(82, -75, 'boule_bleu');
	boule_bleu_rand.scale.setTo(1.5,1.5);
	game.physics.enable( [boule_bleu_rand], Phaser.Physics.ARCADE);
	boule_bleu_rand.body.gravity.y=40;
	blue_boule_group.add(boule_bleu_rand);
	master_group.add(blue_boule_group);
	
}

function crea_sprite_verte() {
	var boule_verte_rand = game.add.sprite(205, -75, 'boule_verte');
	boule_verte_rand.scale.setTo(1.5,1.5);
	game.physics.enable( [boule_verte_rand], Phaser.Physics.ARCADE);
	boule_verte_rand.body.gravity.y=40;
	green_boule_group.add(boule_verte_rand);
	master_group.add(green_boule_group);
}

function crea_sprite_rouge() {
	var boule_rouge_rand = game.add.sprite(328, -75, 'boule_rouge');
	boule_rouge_rand.scale.setTo(1.5,1.5);
	game.physics.enable( [boule_rouge_rand], Phaser.Physics.ARCADE);
	boule_rouge_rand.body.gravity.y=40;
	
}

function crea_sprite_jaune() {
	var boule_jaune_rand = game.add.sprite(450, -75, 'boule_jaune');
	boule_jaune_rand.scale.setTo(1.5,1.5);
	game.physics.enable( [boule_jaune_rand], Phaser.Physics.ARCADE);
	boule_jaune_rand.body.gravity.y=40;
	
}


function render() {

    // debug info pour les boules
   game.debug.spriteInfo(blue_boule_group.getChildAt(0), 32, 32);
	


}
