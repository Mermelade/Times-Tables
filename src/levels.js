var padlock_levels=["button_0stars","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock","padlock"];


var levels = function(game){};

levels.prototype = {
  	create: function(){
  		//añadimos el fondo. El escalado es manual.
  		var background = this.game.add.image(0,0,"background");
  		background.scale.set(0.18);
  		//tween to alpha para oscurecer gradualmente el fondo;
		this.game.add.tween(background).to( { alpha: 0.55 }, 1000, Phaser.Easing.Linear.None, true);

		button = new Array();
		var k=0;
		for (i = 0; i < 5; i++) {
			for (j = 0; j < 3; j++) {
				button[k] = this.game.add.button(j*70+95,i*70+70, padlock_levels[k], this.actionOnClick, this, 1, 0, 2);
				button[k].scale.set(0.75);
				button[k].anchor.set(0.50);
				button[k].valor = k+1;
				if (padlock_levels[k] !== "padlock") {
					var buttonText = this.game.add.text(j*70+95,i*70+80, k+1, { font: "bold 18px Arial", fill: "#a9a9a9", align: "center" });
					buttonText.anchor.set(0.5);
				}
				k++;
			}
		}
		
		var homeButton = this.game.add.button(this.game.world.centerX*0.25,this.game.world.centerY*1.83,"home",this.gameTitle,this,1,0,2);
		homeButton.anchor.setTo(0.5,0.5);
		homeButton.scale.set(0.75);
		var gearButton = this.game.add.button(this.game.world.centerX*1.75,this.game.world.centerY*1.83,"settings",this.optionsGame,this,1,0,2);
		gearButton.anchor.setTo(0.5,0.5);
		gearButton.scale.set(0.75);

	},
	
	actionOnClick: function (button) {
		if (button.key !== "padlock") {
			level = button.valor;
			this.game.state.start("NewLevel");
		}
	},
	
	gameTitle: function(){
		this.game.state.start("GameTitle");
	},
	
	optionsGame: function(){
		this.game.state.start("GameOptions");
	}
	
};