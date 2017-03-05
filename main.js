var game = new Phaser.Game(600, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update, render:render   });

function preload() {
	game.load.image('bg' , 'img/background.png');
	game.load.image('boule_bleu' , 'img/boule_bleu3.png');
	game.load.image('boule_verte' , 'img/boule_vert3.png');
	game.load.image('boule_rouge' , 'img/boule_rouge3.png');
	game.load.image('boule_jaune' , 'img/boule_jaune3.png');
	
}

var boule_bleu
var boule_rouge	
var boule_verte
var boule_jaune

var text

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE); //ajout de la physique
	game.physics.arcade.gravity.y = 100;   

	game.add.sprite(0,0, 'bg');
	
	boule_bleu = game.add.sprite(82, 10, 'boule_bleu');
	//on upscale car trop petit
	boule_bleu.scale.setTo(1.5,1.5);
	
	
	boule_verte = game.add.sprite(205, 10, 'boule_verte');
	boule_verte.scale.setTo(1.5,1.5);
	
	
	boule_rouge = game.add.sprite(328, 10, 'boule_rouge');
	boule_rouge.scale.setTo(1.5,1.5);

	
	boule_jaune = game.add.sprite(450, 10, 'boule_jaune');
	boule_jaune.scale.setTo(1.5,1.5);	
	

	

	
	
	boule_bleu.checkWorldBounds = true; //--> check si la boule est dans les bornes du jeu 
	boule_bleu.outOfBoundsKill = true; //--> si en dehors des bornes du jeu alors on kill la boule
	
	boule_verte.checkWorldBounds = true;
	boule_verte.outOfBoundsKill = true;
	
	boule_rouge.checkWorldBounds = true;
	boule_rouge.outOfBoundsKill = true;
	
	boule_jaune.checkWorldBounds = true;
	boule_jaune.outOfBoundsKill = true;
	
	game.physics.enable( [boule_bleu, boule_verte, boule_rouge, boule_jaune], Phaser.Physics.ARCADE);

	text = game.add.text(game.world.centerX, game.world.centerY, 'test :');
	

	//game.time.events.loop(100, crea_nombre_rand, this);
	

	game.time.events.loop(game.rnd.integerInRange(400, 3000), crea_sprite_bleu, this);
	
	game.time.events.loop(game.rnd.integerInRange(500, 2000), crea_sprite_verte, this);
	
	game.time.events.loop(game.rnd.integerInRange(500, 2000), crea_sprite_rouge, this);
	
	game.time.events.loop(game.rnd.integerInRange(500, 2000), crea_sprite_jaune, this);
	
	
	

	
}


function update() {
	
}

function score(s){
	return s + 10;
}



//var random_number_bleu

//function crea_nombre_rand() {
//	random_number_bleu = game.rnd.integerInRange(50, 200)/100 ; //generation de 
//	text.setText('test :' + random_number_bleu);
//}

function crea_sprite_bleu() {
	var boule_bleu_rand = game.add.sprite(82, -200, 'boule_bleu');
	boule_bleu_rand.scale.setTo(1.5,1.5);
	game.physics.enable( [boule_bleu_rand], Phaser.Physics.ARCADE);
	boule_bleu_rand.body.gravity.y=40;
	
}

function crea_sprite_verte() {
	var boule_verte_rand = game.add.sprite(205, -200, 'boule_verte');
	boule_verte_rand.scale.setTo(1.5,1.5);
	game.physics.enable( [boule_verte_rand], Phaser.Physics.ARCADE);
	boule_verte_rand.body.gravity.y=40;
	
}

function crea_sprite_rouge() {
	var boule_rouge_rand = game.add.sprite(328, -200, 'boule_rouge');
	boule_rouge_rand.scale.setTo(1.5,1.5);
	game.physics.enable( [boule_rouge_rand], Phaser.Physics.ARCADE);
	boule_rouge_rand.body.gravity.y=40;
	
}

function crea_sprite_jaune() {
	var boule_jaune_rand = game.add.sprite(450, -200, 'boule_jaune');
	boule_jaune_rand.scale.setTo(1.5,1.5);
	game.physics.enable( [boule_jaune_rand], Phaser.Physics.ARCADE);
	boule_jaune_rand.body.gravity.y=40;
	
}


function render() {

    // debug info pour les boules
    game.debug.spriteInfo(boule_jaune, 32, 32);
	


}

