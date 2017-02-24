var GAME_START = false;
var GAME_OVER = false;

var game = new Phaser.Game(600, 800, Phaser.AUTO, 'GuitarHero');


var GuitarHero = {
	preload: function (){ //Chargement des ressources 
		game.load.image('background', 'img/background.png');
	},
	
	create: function () { //Affichage des ressources 
		game.add.sprite(0, 0, 'background');
	},
	
	update : function (){
		
	}
};

game.state.add('GuitarHero', GuitarHero);
game.state.start('GuitarHero'); 