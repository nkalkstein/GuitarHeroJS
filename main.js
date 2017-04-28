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
var blue_boule_group




var text

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE); //ajout de la physique
	game.physics.arcade.gravity.y = 100;   

	game.add.sprite(0,0, 'bg');
	
	game.add.sprite(115,644, 'point_test'); //--> ajout d'un nouveau sprite pour mesurer la distance entre ce sprite et la boule bleu
	

	text = game.add.text(game.world.centerX, game.world.centerY, 'test :');
	
	game.time.events.loop(1000, crea_nombre_rand, this);
	var score = 0;
	
	blue_boule_group = game.add.group();
	
	
}


function update() {
	if (game.input.keyboard.isDown(Phaser.Keyboard.A))
	{

		if (blue_boule_group.getChildAt(-1).y>500&&<blue_boule_group.getChildAt(-1).y<600)
		{
			score+=1;
		}
		if (blue_boule_group.getChildAt(-1).y>=600&&<blue_boule_group.getChildAt(-1).y<700)
		{
			score+=5; 
		}
	}
}

var random_number

function crea_nombre_rand() {
	random_number = game.rnd.integerInRange(1, 4) ;
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
	
}



function render() {

}
