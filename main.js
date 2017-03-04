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
	

	game.physics.enable( [boule_bleu, boule_verte, boule_rouge, boule_jaune], Phaser.Physics.ARCADE);

	
	
	boule_bleu.checkWorldBounds = true; //--> check si la boule est dans les bornes du jeu 
	boule_bleu.outOfBoundsKill = true; //--> si en dehors des bornes du jeu alors on kill la boule
	
	boule_verte.checkWorldBounds = true;
	boule_verte.outOfBoundsKill = true;
	
	boule_rouge.checkWorldBounds = true;
	boule_rouge.outOfBoundsKill = true;
	
	boule_jaune.checkWorldBounds = true;
	boule_jaune.outOfBoundsKill = true;
	

	
	
}


function update() {
	
}

function render() {

    // debug info pour les boules
    game.debug.spriteInfo(boule_bleu, 32, 32);


}



function checkSpriteOffScreen(boule_bleu) {

    try {
        if (boule_bleu.y > 800)
        {
            boule_bleu.remove(boule_bleu, true);
        }
    }
	catch (e)
	    {
		console.log(boule_bleu);
	    }
}
