var game = new Phaser.Game(600, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update, render:render   });

function preload() {
	game.load.image('bg' , 'img/background.png');
	game.load.image('boule_bleu' , 'img/boule_bleu3.png');
	game.load.image('boule_verte' , 'img/boule_verte3.png');
	game.load.image('boule_rouge' , 'img/boule_rouge3.png');
	game.load.image('boule_jaune' , 'img/boule_jaune3.png');
	
}

var boule_bleu	

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE); //ajout de la physique
	game.physics.arcade.gravity.y = 100;   

	game.add.sprite(0,0, 'bg');
	
	boule_bleu = game.add.sprite(10, 10, 'boule_bleu');
	//on upscale car trop petit
	boule_bleu.scale.setTo(1.5,1.5);
	
	
	

	game.physics.enable( [boule_bleu], Phaser.Physics.ARCADE);


	game.debug.text("boule_bleu.y :", 10,10)
	

	

	
}

function update() {


}

function render() {

    // Sprite debug info
    game.debug.spriteInfo(boule_bleu, 32, 32);

}
